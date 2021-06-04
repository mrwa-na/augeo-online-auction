import s from "./product.module.css"
import {useState, useEffect} from "react"
import { NumericInput } from "@blueprintjs/core";
import { db } from "../../firebase/init";
import firebase from 'firebase'

const BidButton = ({user, product}) => {
    const [popupNote, setpopupNote] = useState(false);
    const [bid, setBid] = useState(+product.minBid);
    const [cooldownBidBtn, setCooldownBidBtn] = useState(false);
    const [ownProduct, setOwnProduct] = useState(false);

    useEffect(()=>{
        if(user.uid === product.ownerId){
            setCooldownBidBtn(true);
            setOwnProduct(true);
        }
    },[])

    const placeBid = () =>{
        setCooldownBidBtn(true);
        db.ref(`products/${product.id}/bidders/${user.uid}`).set({bidderId:user.uid, bidderEmail:user.email, biddedAmount: firebase.database.ServerValue.increment(bid)}).then(res=>{
            db.ref(`products/${product.id}/lastAt`).set({bidder: {id:user.uid, email:user.email}, value:firebase.database.ServerValue.increment(bid)});
        });
        setTimeout(() => {
            setCooldownBidBtn(false);
        }, 5000);
    }

    const disableInput = (e) =>{
        e.preventDefault();
        setpopupNote(true);
    }
    const handleBid = (nValue, sValue) =>{
        setBid(nValue);
        setpopupNote(false);
    }

     return (
        <div className={s.bid_input_container}>
            <div className={`bp3-card bp3-elevation-2 ${s.current_status}`}>
                <h2>Current Value: {product.lastAt?.value}</h2>
                <h4>Last Bidder: {product.lastAt?.bidder.email}</h4>
            </div>
            <div className="bp3-card bp3-elevation-2">
                <h4>Add your bid here</h4>
                <p>Your bid should be equal or more than the minimum bid which is: {product.minBid}</p>
                {
                    ownProduct?
                    <p className="bp3-intent-warning bp3-icon-issue" style={{color:'crimson'}}>&nbsp; Cannot Bid on Your Own Product</p>
                    :
                    <div className={s.bid_input_button}>
                        <NumericInput style={{width:100}} onKeyDown={disableInput} value={bid} onValueChange={handleBid} allowNumericCharactersOnly={true} min={product.minBid} majorStepSize={product.minBid} stepSize={product.minBid} leftIcon="dollar"/>
                        <button onClick={placeBid} disabled={cooldownBidBtn} className="bp3-button bp3-intent-warning" style={{width:100, backgroundColor:'orange'}}>{ownProduct?"Disabled":cooldownBidBtn?"Wait...":"Bid Now"}</button>
                        {popupNote?<div className={s.popup}>Use Arrows Only</div>:null}
                    </div>
                }

            </div>
            <div className={`bp3-card bp3-elevation-2 ${s.stats}`}>
                <h4>About This Auction</h4>
                <ul>
                    <li className="bp3-card bp3-icon-timeline-events">&nbsp;<b>Date Started:</b> {product.startDate} <b>|</b> Time: {product.startTime}</li>
                    <li className="bp3-card bp3-icon-outdated">&nbsp;<b>Date Ends:</b> {product.endDate} <b>|</b> Time: {product.endTime}</li>
                    <li className="bp3-card bp3-icon-people">&nbsp;<b>Participants:</b> Watching: {product.watchers && Object.keys(product.watchers).length} | Bidded: {product.bidders && Object.keys(product.bidders).length}</li>
                </ul>
            </div>
          </div>
     )
}

export default BidButton