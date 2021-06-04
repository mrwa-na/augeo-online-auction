import s from "./Cart.module.css"
import {useState, useEffect} from "react"
import BuyingSection from "../Product/BuyingSection";
import { Dialog } from "@blueprintjs/core";

const Cart = ({user, cart}) => {
    const [prices, setPrices] = useState([]);
    const [total , setTotal] = useState(0);
    const [open, setOpen ] = useState(false);
    useEffect(()=>{
        let pcs = [], sum=0;
        cart.map(item=>{
            pcs.push({product:item.productName, price:+item.productPrice});
            sum+= +item.productPrice;
        })
        setPrices(pcs);
        setTotal(sum);
    },[])
     return (
       <div className={s.main}>
           <div className={s.list}>
                <h1> &nbsp; Cart</h1>
                {
                    cart.map(item=>{
                        return <div className={s.item}>
                            <div className={s.name}>
                               <h2>Name: {item.productName} </h2>
                               <h4>Price: ${item.productPrice}</h4>
                            </div>
                            <div className={s.desc}>
                                {item.productDescribtion}
                                <br/>
                                <small>by {item.ownerEmail}</small>
                            </div>
                            <div className={s.image}>
                                <img src={item.productImage}/>
                            </div>
                        </div>
                    })
                }
           </div>
           <div className={s.summary}>
               <div className={s.analysis}>
                   <h2>Cost Summary</h2>
                   <ul>
                       {
                            prices.map(prc=>{
                                return <h4>{prc.product} - ${prc.price}</h4>
                            })
                        }
                   </ul>

                <div className={s.totalcost}>
                    <h3>Total: ${total}</h3>
                </div>
               </div>
                <div className={s.address}>
                    <h2>Address</h2>
                    <p> Cankurtaran Mah. Yeni Akbiyik Cad. No: 36-38, Istanbul, Turkey <br/> Postal Code: 34122, Country: Turkey <br/> Mobile: +90 212 517 90 31</p>
                </div>
                <div className={s.confirmation}>
                    <h2>Checkout:</h2>
                    <button onClick={()=>setOpen(true)} className={s.checkout}>Proceed To Checkout</button>
                    <img src="/accepted_cards.png"/>
                </div>
           </div>

        {           
            open &&        
            <div className={s.modal_container}>
                <Dialog isOpen={open} usePortal={false} style={{marginTop:'25px', maxHeight:'90vh', overflow:'hidden'}} isCloseButtonShown={true} >
                    <button className="bp3-button bp3-minimal bp3-intent-danger bp3-icon-cross" onClick={()=>setOpen(false)}> Close</button>
                    <div style={{overflow:'auto', maxHeight:'100%'}}>
                        <BuyingSection isArr={true} closeOpen={()=>setOpen(false)} product={cart} user={user} name={"Items"}/>
                    </div>
                </Dialog>
            </div>
        }
       </div>
     )
}

export default Cart