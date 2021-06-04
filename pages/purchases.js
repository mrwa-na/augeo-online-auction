import {useState, useEffect, useContext} from "react"
import CannotFind from "../components/CannotFind/CannotFind";
import Loader from "../components/Loader/Loader";
import Purchases from "../components/Purchases/Purchases";
import { UserContext } from "../contexts/UserContext";
import { db } from "../firebase/init";

const purchases = () => {
    const {user} = useContext(UserContext);
    const [dbPurchases, setDbPurchases] = useState([]);
    const [dbBids, setDbBids] = useState([]);

  const addToBids = (p)=>{
    let tempBids = dbBids;
    tempBids.push(p);
    setDbBids(tempBids);
  }

  const addToPurchases = (p) =>{
    let tempPchs = dbPurchases;
    tempPchs.push(p);
    setDbPurchases(tempPchs);
  }

    useEffect(()=>{
        db.ref(`products`).once("value", sn=>{
          sn.forEach(product=>{
            if(product.val().ownerId === user.uid){
              if(product.val().type==="forBidding"){
                if(product.val().purchased){
                  setDbBids(prev=>prev.concat([product.val()]))
                }
              }
              else{
                if(product.val().orders){
                  setDbPurchases([...dbPurchases, product.val()])
                }
              }
            }
          })
        })
    },[])

    if(!dbPurchases.length && !dbBids.length) return <CannotFind/>
     return (
       <div>
          <Purchases bids={dbBids} purchases={dbPurchases}/>
       </div>
     )
}

export default purchases