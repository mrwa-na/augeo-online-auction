import s from "./product.module.css"
import {useState, useEffect} from "react"
import ReviewsList from "./ReviewsList"
import BuyingSection from "./BuyingSection"
import ProductContent from "./ProductContent"
import { Dialog } from "@blueprintjs/core"

const BuyableProduct = ({user, product}) => {
    const [open, setOpen] = useState(false);
     return (
        <>
        {/* <div className={`${s.buy_btn_trigger} ${s.deadline_counter}`} onClick={()=>setOpen(true)} style={{borderRadius:2, height:35, paddingTop:6}}>
            Buy This Product
        </div> */}

        {
        open &&        
        <div className={s.modal_container}>
            <Dialog isOpen={open} usePortal={false} style={{marginTop:'25px', maxHeight:'90vh', overflow:'hidden'}} isCloseButtonShown={true} >
                <button className="bp3-button bp3-minimal bp3-intent-danger bp3-icon-cross" onClick={()=>setOpen(false)}> Close</button>
                <div style={{overflow:'auto', maxHeight:'100%'}}>
                    <BuyingSection isArr={false} closeOpen={()=>setOpen(false)} user={user} product={product} name={product.name}/>
                </div>
            </Dialog>
        </div>
        }


       <div className={s.buyable_container}>
            <ProductContent product={product}/>
            <ReviewsList user={user} product={product} openModal={()=>setOpen(true)}/>
       </div>
       </>
     )
}

export default BuyableProduct