import s from "../../styles/product.module.css"
import {useState, useEffect, useContext} from "react"
import { useRouter } from "next/router"
import { db } from "../../firebase/init"
import Loader from "../../components/Loader/Loader"
import { UserContext } from "../../contexts/UserContext"
import BiddableProduct from "../../components/Product/BiddableProduct"
import BuyableProduct from "../../components/Product/BuyableProduct"
import { useBeforeunload } from 'react-beforeunload';
import NotAvailable from "../../components/Product/NotAvailable"

const Product = () => {
    const {user} = useContext(UserContext);
    const {query} = useRouter();
    const [product, setProduct] = useState(null);
    const [watching, setWatching] = useState(false);

    useBeforeunload((event) => {
        if (watching) {
            db.ref(`products/${query.id}`).off("value");
            db.ref(`products/${query.id}/watchers/${user.uid}`).remove().then(res=>{
                setWatching(false);
            });
            
        }
      });

    useEffect(()=>{
        db.ref(`products/${query.id}`).on("value", sn=>{ 
            setProduct(sn.val());
            if(sn.val().type==="forBidding"){
                db.ref(`products/${query.id}/watchers/${user.uid}`).set({participantId: user.uid, participantEmail:user.email})
                    .then(v=>{setWatching(true)});
            }
        })
    },[])
    

    if(!product) return <Loader/>
    else if(product.type==="forBuying") return <BuyableProduct product={product} user={user}/>
    else if(product.type==="forBidding") return <BiddableProduct user={user} product={product}/>
    else return <div className="container"><NotAvailable sd={product.startDate} st={product.startTime} ed={product.endDate} et={product.endTime} /></div>
}


export default Product