import { useContext, useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import Loader from '../components/Loader/Loader';
import { UserContext } from '../contexts/UserContext';
import { db } from '../firebase/init';

/*
  - Products
  - Notifications
  - participants
  - Revenue
  - Currently On Bid
  - Ended
*/

export default function Home() {
  const {user} = useContext(UserContext);
  const [products, setProducts] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [participants, setParticipants] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    db.ref('products').once("value", sn=>{
      let ps = [];
      sn.forEach(p=>{
        if(p.val().ownerId === user.uid){
          ps.push(p.val());
        }
      })
      setProducts(ps);
    }).then(res=>{
      let parties = [];
      res.forEach(p=>{
        if(p.val().ownerId === user.uid && p.val().type === "forBidding"){
          parties.push(p.val().bidders);
        }
      })
      setParticipants(parties);
    })
    db.ref(`users/${user.uid}/notifications`).once("value", sn=>{
      let notifs = [];
      sn.forEach(n=>{
        notifs.push(n.val());
      })
      setNotifications(notifs);
    })

    setTimeout(()=>{
      setLoading(false);
    },1500)
  },[])


  // if(!products || !notifications || !participants) return <Loader/>
  // else
  if(loading) return <Loader/>
  return (
    <Dashboard products={products} notifications={notifications} participants={participants} />
  )
}
