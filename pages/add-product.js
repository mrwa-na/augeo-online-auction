import { useContext } from "react"
import AddProduct from "../components/AddProduct/AddProduct"
import { UserContext } from '../contexts/UserContext'

const addproduct = () =>{
    const {user} = useContext(UserContext);
    return <AddProduct user={user}/>
}

export default addproduct