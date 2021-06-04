import s from "./Room.module.css"
import {useState, useEffect} from "react"
import { NumericInput } from "@blueprintjs/core"

const Room = () => {
    const [popupNote, setpopupNote] = useState(false);
    const [bid, setBid] = useState(25);

    const disableInput = (e) =>{
        e.preventDefault();
        setpopupNote(true);
    }
    const handleBid = (nValue, sValue) =>{
        setBid(nValue);
        setpopupNote(false);
    }
     return (
       <div className={s.main}>
          {/* <div className={s.options}></div> */}
          <div className={s.bid_input_container}>
            <div className="bp3-card" style={{display:'grid', placeItems:'center'}}>
                <h4>Add your bid here</h4>
                <p>Your bid should equal or more than the minimum bid which is: </p>
                <div style={{position:'relative'}}>
                    <NumericInput onKeyDown={disableInput} value={bid} onValueChange={handleBid} allowNumericCharactersOnly={true} min={25} max={2000} stepSize={25} leftIcon="dollar"/>
                    {popupNote?<div className={s.popup}>Use Arrows Only</div>:null}
                </div>
                <div className={s.stats}>
                {/* start date - end date - min bid - current highest bid by who */}
                    <div>Start Date: 26-05-2021</div>
                    <div>End Date: 26-05-2021</div>
                    <div>Current Value: $801</div>
                    <div>Min Bid: $25</div>
                </div>
            </div>
          </div>
          <div className={s.participants_list}>
              {
                [...new Array(20).fill(0)].map(e=>{
                    return(
                        <div className={s.cell}>
                            <button className="bp3-button bp3-minimal bp3-icon-user"/>
                            <div>
                                <div className={s.name}>Jacob Mark</div>
                                <div className={s.total_bidded}>$232</div>
                            </div>
                        </div>
                    )
                })
              }
          </div>
          <div className={s.bidding_log}>
              {
                  new Array(20).fill(0).map(e=>{
                      return(
                        <div className={s.cell}>
                            <div><b>Jacob</b> Just raised the bid to $300</div>
                        </div>
                      )
                  })
              }
          </div>
          <div className={s.product}>
            <div className={s.gallery}>
              <img src="/antique-phone.jpeg"/>
            </div>

            <div className={s.product_describtion}>
              <p>
                Props to spread to Popover. Note that content and minimal cannot be changed and usePortal defaults to false so all submenus will live in the same container.
                Whether an enabled item without a submenu should automatically close its parent popover when clicked.
              </p>
            </div>
          </div>
       </div>
     )
}

export default Room