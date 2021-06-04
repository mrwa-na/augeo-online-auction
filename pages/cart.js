import {useState, useEffect, useContext} from "react"
import CannotFind from "../components/CannotFind/CannotFind";
import Cart from "../components/Cart/Cart";
import Loader from "../components/Loader/Loader";
import { UserContext } from "../contexts/UserContext";
import { db } from "../firebase/init";

const cart = () => {
    const {user} = useContext(UserContext);

    const [dbcart, setDbcart] = useState(null);

    useEffect(() => {
      db.ref(`users/${user.uid}/cart`).on("value", sn=>{
        setDbcart(Object.values(sn.val()))
      })
      return () => {
        db.ref(`users/${user.uid}/cart`).off("value");
      }
    }, [])

    if(!dbcart) return <CannotFind/>
    else return (
       <div>
          <Cart user={user} cart={dbcart}/>
       </div>
     )
}

export default cart