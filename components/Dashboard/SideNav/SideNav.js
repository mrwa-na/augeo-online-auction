import Link from "next/link"
import s from "./SideNav.module.css"

const SideNav = () => {
     return (
       <div className={s.main}>
            <div className={s.side_nav}>
                <div className={s.item}>
                    <a href="/">
                        <button className="bp3-button bp3-icon-home"></button>
                        <h4 className={s.title}>HOME</h4>
                    </a>
                </div>
                <div className={s.item}>
                    <a href="/products">
                        <button className="bp3-button bp3-icon-shop"></button>
                        <h4 className={s.title}>Products</h4>
                    </a>
                </div>
                <div className={s.item}>
                    <a href="/add-product">
                        <button className="bp3-button bp3-icon-add"></button>
                        <h4 className={s.title}>Add<br/> Product</h4>
                    </a>
                </div>
                <div className={s.item}>
                    <a href="/my-orders">
                        <button className="bp3-button bp3-icon-box"></button>
                        <h4 className={s.title}>My Orders</h4>
                    </a>
                </div>
                <div className={s.item}>
                    <a href="/cart">
                        <button className="bp3-button bp3-icon-shopping-cart"></button>
                        <h4 className={s.title}>Cart</h4>
                    </a>
                </div>
                <div className={s.item}>
                    <a href="/purchases">
                        <button className="bp3-button bp3-icon-dollar"></button>
                        <h4 className={s.title}>Purchases</h4>
                    </a>
                </div>
            </div>
       </div>
     )
}

export default SideNav