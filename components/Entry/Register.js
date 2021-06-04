import {useState, useEffect} from "react"
import { Button, Card, Elevation } from '@blueprintjs/core'
import { useForm } from 'react-hook-form';
import {registerUser, sendVerificationEmail, deleteUser} from './modules';
import Loader from "../Loader/Loader";
import Link from "next/link";


const Register = ({action}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [alert, setAlert] = useState({show:false, msg:''});
    const { register, handleSubmit, watch, formState: { errors }} = useForm({mode:'all'});

    const [currentUser, setCurrentUser] = useState(null);
    
    const [loading, setLoading] = useState(false);

    let watchall = watch();

    const handleRegister = async(data) => {
        setLoading(true);
        let user = await registerUser(data);
        if(user){
            let sent = await sendVerificationEmail(user);
            if(!sent){
                setAlert({show:true, msg:"Couldn't reach your email"});
                deleteUser(user);
                setTimeout(() => {
                    setAlert({show:false, msg:""});
                }, 6000);
                setCurrentUser(null);
            }
            else{
                setCurrentUser(user);
                setShowConfirm(true);
            }
        }
        else{
            setAlert({show:true, msg:"Email is already in use"});
            setTimeout(() => {
                setAlert({show:false, msg:""});
            }, 6000);
        }
        setLoading(false);
    }


    if(showConfirm) return (
        <Card elevation={Elevation.THREE} style={{width:300}}>
            <h4>
                <button tabIndex="-1" className="bp3-button bp3-minimal bp3-icon-error"></button>
                Verification Required
            </h4>
            <p>
                We've send you an confirmation email which contains verification link. Please verify and login again.
            </p>
            <br/>
            <button className="bp3-button" onClick={()=>action("login")}>login</button>
        </Card>
    )
    
     return (
       <Card elevation={Elevation.THREE} style={{minWidth:300}}>
           <button className="bp3-button bp3-icon-arrow-left" onClick={()=>action(null)}></button>
           {
               alert.show?
               <div className="fancyalert">
                   {alert.msg}
               </div>:null
           }
           {
               loading?
               <Loader/>:null
           }
           <h3>Register</h3>
           <form onSubmit={handleSubmit(handleRegister)} className="register_form">
               <div className="input-father">
                    <label className="bp3-label" htmlFor="email">Enter your email</label>
                    <div className="bp3-input-group">
                        <input name="email" className="bp3-input" type="text" placeholder="Email Address" id="email" {...register("email", {required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} />
                        <button tabIndex="-1" type="button" className="bp3-button bp3-minimal bp3-icon-user"></button>
                    </div>
                    {errors.email?<div className="err">Enter a valid email address</div>:null}
               </div>


                <br/>

                <div className="input-father">
                    <label className="bp3-label" htmlFor="password">Enter your passwrd</label>
                    <div className="bp3-input-group">
                        <input {...register("password", {required:true})} type="password" id="password" className="bp3-input" placeholder="Password..." />
                        <button tabIndex="-1" type="button" className="bp3-button bp3-minimal bp3-icon-lock"></button>
                    </div>
                    {errors.password?<div className="err">This field is required</div>:null}
                </div>


                <br/>
                
                <div className="input-father">
                    <label className="bp3-label" htmlFor="confirm-password">Confirm Your Password</label>
                    <div className="bp3-input-group">
                        <input {...register("confirmedPassword", {required:true})} type="password" id="confirm-password" className="bp3-input"/>
                    </div>
                    {
                        errors.confirmedPassword?
                                <div className="err">This field is required</div>
                            :watchall.confirmedPassword !== watchall.password?
                                <div className="err">Passwords don't match</div>
                            :null
                    }
                </div>


                <br/>
{/* 
                <h4>What describes you?</h4>
                <div className="flex-spaced">
                    <div>
                        <input {...register("userType", {required:true})} type="radio" name="userType" value="buyer" id="buyer"/>
                        <label htmlFor="buyer">Buyer</label>
                    </div>
                    <div>
                        <input {...register("userType", {required:true})} type="radio" name="userType" value="seller" id="seller"/>
                        <label htmlFor="seller">Seller</label>
                    </div>                
                    {errors.userType?<div className="err">This field is required</div>:null}
                </div> */}

                <br/>
                <br/>
                <button type="submit" className="bp3-button bp3-icon-new-person">Register</button>
           </form>
       </Card>
     )
}

export default Register