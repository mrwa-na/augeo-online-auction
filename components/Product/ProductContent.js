import s from "./product.module.css"

const ProductContent = ({product}) => {
     return (
       <div className={s.product_content_container}>
           <div className={s.image}>
                <img src={product.image} />
           </div>
           <div className={s.text}>
                <h3 className="bp3-card">{product.name} {product.price?<><br/>${product.price}</>:null}</h3>
                <br/>
                <p className="bp3-card">{product.describtion}</p>
           </div>
       </div>
     )
}

export default ProductContent