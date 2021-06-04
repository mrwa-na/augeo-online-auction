import s from "./product.module.css"
import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/init";
import Rating from 'react-simple-star-rating'
import { AppToaster } from "./Toaster";

const ReviewsList = ({user, product, openModal}) => {
    const [rating, setRating] = useState(0);
    // Catch Rating value
    const handleRating = (rate) => {
      setRating(rate)
      // Some logic
    }

    const sendReview = () =>{
        if(!rating) return;
        db.ref(`products/${product.id}/reviews/${user.uid}`).set({userId:user.uid, userEmail: user.email, review: rating})
    }

    const addToCart = () =>{
        AppToaster.show({ message: "Added to cart", intent:'success', icon:'small-tick' });
        db.ref(`users/${user.uid}/cart/${product.id}`).set({
            productId:product.id,
            productName:product.name,
            productPrice:product.price,
            productDescribtion:product.describtion,
            productImage:product.image,
            ownerId:product.ownerId,
            ownerEmail:product.ownerEmail,
        })
    }

     return (
      <div className={s.people_list_container}>
          <div className={s.people_list} style={{height:'19%'}}>
              <h2 style={{textAlign:'center'}}>Get This Product Now For ${product.price}</h2>
            <div style={{display:'flex', justifyContent:'center', height:'100%', alignItems:'center'}}>
                <button className={`bp3-button bp3-intent-warning bp3-icon-dollar ${s.getBtn}`}  onClick={openModal}>Buy Now</button>
                <button className={`bp3-button bp3-intent-default bp3-icon-shopping-cart ${s.getBtn}`} onClick={addToCart}>To Cart</button>
            </div>
          </div>
        <div className={s.people_list} style={{height:'50%'}}>
            <div className={`bp3-card bp3-elevation-2 ${s.section_title}`}>
                <h3>Reviews</h3>
            </div>
            {
                product.reviews?
                [...Object.entries(product.reviews)].map(([key,val],i)=>{
                    return <div className={`bp3-card bp3-elevation-2 ${s.disabled_rating}`}>
                        <p>User <b>{product.reviews[key].userEmail}</b> Rated: {product.reviews[key].review}</p>
                        <Rating
                            onClick={()=>{}}
                            ratingValue={product.reviews[key].review}
                            size={20}
                            className={s.rating}
                            transition
                            fillColor='orange'
                            emptyColor='gray'
                            // className='foo' // Will remove the inline style if applied
                        />
                    </div>
                }):null
            }
            </div>
            <div className={s.people_list} style={{height:'30%'}}>
                <div className={`bp3-card bp3-elevation-2 ${s.section_title}`}>
                    <h3>Post A Review</h3>
                </div>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', margin:'0 auto'}}>
                    <Rating
                        onClick={handleRating}
                        ratingValue={rating}
                        size={20}
                        transition
                        fillColor='orange'
                        emptyColor='gray'
                        className={s.rating}
                    />
                </div>
                <br/>
                <button className="bp3-button bp3-intent-warning" style={{width:180, backgroundColor:'orange', margin:'0 auto'}} onClick={sendReview}>Submit</button>
            </div>
       </div>
     )
}

export default ReviewsList