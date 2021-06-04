import {useState, useEffect, useContext} from "react"
import CannotFind from "../components/CannotFind/CannotFind";
import Loader from "../components/Loader/Loader";
import MyOrders from "../components/MyOrders/MyOrders";
import { UserContext } from "../contexts/UserContext"
import { db } from "../firebase/init";

const myOrders = () => {
    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState(null);
    useEffect(()=>{
        db.ref(`users/${user.uid}/orders`).on("value", sn=>{
            setOrders(Object.values(sn.val()));
        })

        return ()=>{
            db.ref(`users/${user.uid}/orders`).off("value")
        }
    },[])
    if(!orders) return <CannotFind/>
    else return (
       <div>
           <MyOrders orders={orders}/>
       </div>
     )
}

export default myOrders