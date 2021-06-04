import s from "./AddProduct.module.css"
import {useState, useEffect, useContext} from "react"
import {useForm } from 'react-hook-form'
import { db, storage } from "../../firebase/init";
import { UserContext } from "../../contexts/UserContext";
import uniqid from 'uniqid'

import {validator, getTotalTime} from './modules'
import Loader from "../Loader/Loader";
import { ProgressBar } from "@blueprintjs/core";


const AddProduct = ({user}) => {
    const [alert, setAlert] = useState({show:false, msg:''});
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const { register, handleSubmit, watch, unregister, formState: { errors }} = useForm({mode:'all'});

    const handleProduct = async (data) =>{
        if(data.type==="forBidding"){
            data = {
                ...data, 
                id:`${data.name}___${uniqid.time()}`, 
                ownerId: user.uid, 
                ownerEmail: user.email, 
                image: data.image[0], 
                totalStartTime: getTotalTime(data.startDate, data.startTime),
                totalEndTime: getTotalTime(data.endDate, data.endTime),
            };
            let err = validator(data.startDate, data.endDate, data.startTime, data.endTime, data.demo);

            
            if(err){
                setAlert({show:true, msg:err});
                setTimeout(()=>{
                    setAlert({show:false, msg:""});
                }, 6000)
                return;
            }
        }else{
            data = {
                ...data,
                id:`${data.name}___${uniqid.time()}`, 
                ownerId: user.uid, 
                ownerEmail: user.email, 
                image: data.image[0]
            }
        }


        setLoading(true);
        try {
            await sendStorage(data, user);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(watch().type === "forBidding"){
            unregister("price");
        }
        if(watch().type === "forBuying"){
            unregister(["minBid", "startDate", "endDate", "startTime", "endTime"]);
        }
    }, [watch().type])

    const sendDB = async (data, user) =>{
        // Send to user product list
        await db.ref(`users/${user.uid}/products/${data.id}`).set(data);
        // send to general products list also 
        await db.ref(`products/${data.id}`).set(data).then(res=>{
            setLoading(false);
            setTimeout(()=>{
                window.location.reload();
            },500)
        })
    }
    
    const sendStorage = async (data, user) =>{
        let {name, image} = data;
        let sref = storage.ref();
        let productImageRef = sref.child(`${user.uid}/products/${name}.jpg`);
        let uploadImageTask = productImageRef.put(image);
        
        uploadImageTask.on('state_changed', 
        (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
            setProgress(progress);
        }, 
        (error) => {
            console.log(error);
        }, 
        () => {
            uploadImageTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                data.image = downloadURL;
                sendDB(data, user);
            });
        }
        );
    }
    
     return (
        <div className={s.main}>
            {
                loading?
                <div className={s.product_upload_progress}>
                    <div className={s.inner}>
                        <h4>
                        {
                        progress < 100?
                        "Adding the product... wait a moment"
                        :"Success!"
                        }
                        </h4>
                        <ProgressBar value={progress/100} intent="primary"/>
                    </div>
                </div>
                :null
            }
           {
               alert.show?
               <div className="fancyalert">
                   {alert.msg}
               </div>:null
           }
            <form className="bp3-card" onSubmit={handleSubmit(handleProduct)}>
                <div className={s.section}>
                    <div className={s.field}>
                        <h3>Product Name</h3>
                        <input {...register("name", {required:true})} className="bp3-input" type="text" name="name" id="name"/>
                        {errors.name?<div className="err">This field is required</div>:null}
                    </div>
                    <div className={s.field}>
                        <h3>Type</h3>
                        <select className="bp3-button" {...register("type", {required:true})}>
                            <option value="forBidding">For Bidding</option>
                            <option value="forBuying">For Buying</option>
                        </select>
                        {errors.type?<div className="err">This field is required</div>:null}
                    </div>
                </div>
                <div className={s.section}>                        
                    <div className={`${s.field} ${s.bid_or_price}`}>
                        <h3>Product {watch().type==="forBuying"?"Price":"Minimum Bid"}</h3>
                        {
                            watch().type==="forBuying"?
                            <input {...register("price", {required:true})} className="bp3-input" type="number" name="price" id="price"/>
                            :<input {...register("minBid", {required:true})} className="bp3-input" type="number" name="minBid" id="minBid"/>
                        }
                        {errors.price||errors.minBid?<div className="err">This field is required</div>:null}
                    </div>
                </div>
                <div className={s.section}>
                    <div className={s.field}>
                        <h3>Product Describtion</h3>
                        <textarea {...register("describtion", {required:true})} className="bp3-input bp3-fill"/>
                        {errors.describtion?<div className="err">This field is required</div>:null}
                    </div>
                </div>
                <div className={s.section}>
                    <div className={s.field}>
                        <h3>Product Category</h3>
                        <select className="bp3-button" {...register("category", {required:true})}>
                            <option value="antique">Antiques</option>
                            <option value="jewlery">Jewelry</option>
                            <option value="manuscript">Manuscript</option>
                        </select>
                        {errors.category?<div className="err">This field is required</div>:null}
                    </div>
                </div>
                <br/>
                {
                    watch().type==="forBidding"?
                    <>
                    <input className="bp3-input" {...register("demo")} type="checkbox" id="demo"/>
                    <label htmlFor="demo">For Demo?</label>
                    <div className={s.section}>
                        <div className={s.field}>
                            <h3>Bidding Starting Date & Time</h3>
                            <input className="bp3-input" type="date" {...register("startDate", {required:true})}/>
                            <input className="bp3-input" type="time" {...register("startTime", {required:true})}/>
                            {errors.startDate||errors.startTime?<div className="err">These fields are required</div>:null}
                        </div>
                    </div>
                    <div className={s.section}>
                        <div className={s.field}>
                            <h3>Bidding Ending Date & Time</h3>
                            <input className="bp3-input" type="date" {...register("endDate", {required:true})}/>
                            <input className="bp3-input" type="time" {...register("endTime", {required:true})}/>
                            {errors.endDate||errors.endTime?<div className="err">These fields are required</div>:null}
                        </div>
                    </div>
                    <br/>
                    </>
                    :null
                }

                <div className={s.section}>
                    <div className={s.field}>
                        <h3>Product Image</h3>
                        <input {...register("image", {required:true})} type="file" className="bp3-card" accept=".png, .jpeg, .jpg"/>
                        {errors.image?<div className="err">This field is required</div>:null}
                    </div>
                </div>

                <br/><br/>
                <div className={s.section}>
                    <button type="submit" className="bp3-button bp3-large bp3-intent-success">Add Product</button>
                </div>
            </form>
        </div>
     )
}

export default AddProduct