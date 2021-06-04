import s from "./product.module.css"
import {useState, useEffect} from "react"
import BidButton from './BidButton'
import { withinPeriod } from "../../modules/single-product";
import Countdown from 'react-countdown';
import NotAvailable from "./NotAvailable";
import ProductContent from "./ProductContent";
import PeopleList from "./PeopleList";

const BiddableProduct = ({user, product}) => {
    const [ended, setEnded] = useState(false);
    let {endDate, endTime} = product;
    let edS = endDate.split("-"), etS = endTime.split(":");
    let productEndUTC = new Date(+edS[0], +edS[1]-1, +edS[2], +etS[0], +etS[1]).getTime();

    let timeKeeper;

    const checkDateAndTime = () =>{
        // We gonna take the UTC of current time and check the UTC of the produc time. 
        let currentUTC = Date.now();
        if(currentUTC > productEndUTC){
            return true;
        }
        else false;
    }

    useEffect(()=>{
        return(()=>{
            clearInterval(timeKeeper);
        })
    },[])

    if(!withinPeriod(product) || ended){
        return(
            <NotAvailable sd={product.startDate} st={product.startTime} ed={product.endDate} et={product.endTime}/>
        )
    }
    else{
        timeKeeper = setInterval(()=>{
            setEnded(checkDateAndTime());
        }, 1000)
        return (
            <div className={s.biddable_container}>
                <BidButton user={user} product={product}/>
                <div className={s.deadline_counter}>
                    Ends in - <Countdown date={productEndUTC} />             
                </div>
                <PeopleList product={product}/>
                <ProductContent product={product}/>
            </div>
          )
    }
}

export default BiddableProduct