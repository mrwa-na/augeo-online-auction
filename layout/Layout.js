import SideNav from "../components/Dashboard/SideNav/SideNav"
import Header from "./Header"

const Layout = (props) => {
     return (
       <div>
           <Header/>
           <SideNav/>
          {props.children}
       </div>
     )
}

export default Layout