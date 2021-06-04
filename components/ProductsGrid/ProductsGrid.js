import Link from "next/link"
import { useState, useEffect } from "react";
import { db } from "../../firebase/init";
import Loader from "../Loader/Loader";
import s from "./ProductsGrid.module.css"

const ProductsGrid = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
        db.ref("products").on('value', sn=>{
            setProducts([...Object.values(sn.val())]);
            console.log(sn.val());
        })
    },[])

    if(!products.length){
        return <Loader/>
    }
    else return (
       <div className={s.main}>
        <div className={s.list}>
          {
              products.map(p=>{
                  return(
                    <div className={`bp3-card ${s.product} bp3-elevation-2 bp3-interactive`}>
                        <div className={s.image}>
                            <img src={p.image} loading="lazy"/>
                        </div>
                        <h4 className={s.product_title}>{p.name}</h4>
                        <div className={s.content}>
                            <div className="desc_container">
                                <p className="desc">{p.describtion}</p>
                            </div>
                            <div className={s.btns}>
                            {
                                p.type==="forBidding"?
                                <>
                                    <Link href={`/products/${p.id}`}><a><button className="bp3-button">Bid</button></a></Link>
                                    <button className="bp3-button">Watch</button>
                                </>
                                :
                                    <Link href={`/products/${p.id}`}><a><button className="bp3-button">Buy</button></a></Link>
                            }
                            </div>
                        </div>
                    </div>
                  )
              })
          }
        </div>

       </div>
     )
}

export default ProductsGrid