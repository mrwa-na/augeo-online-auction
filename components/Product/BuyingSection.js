import s from "./product.module.css"
import {useState, useEffect} from "react"
import PaymentForm from "./PaymentForm"

const BuyingSection = ({isArr= false, closeOpen = null, user=null,product=null,name}) => {

     return (
        <div className="bp3-card bp3-elevation-2">
            <h4>Get {name} Now</h4>
            <PaymentForm isArr={isArr} closeOpen={closeOpen} product={product} user={user}/>
        </div>
     )
}

export default BuyingSection