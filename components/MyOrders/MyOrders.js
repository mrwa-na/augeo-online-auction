import s from "./MyOrders.module.css"
import {useState, useEffect} from "react"

const MyOrders = ({orders}) => {
     return (
       <div className={s.main}>
          <div className={s.box}>
            <h1>&nbsp;My Past Orders</h1>
            {
              orders.map(o=>{
                return(
                  <div className={s.order}>
                      <div className={s.name}>
                          <h2>Name: {o.productName} </h2>
                          <h4>Price: ${o.productPrice}</h4>
                      </div>
                      <div className={s.desc}>
                          {o.productDescribtion}
                          <br/>
                          <small>by {o.ownerEmail}</small>
                      </div>
                      <div className={s.image}>
                          <img src={o.productImage}/>
                      </div>
                  </div>
                )
              })
            }
          </div>
       </div>
     )
}

export default MyOrders