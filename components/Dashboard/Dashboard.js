import s from "./Dashboard.module.css"
import {useState, useEffect} from "react"
import SideNav from "./SideNav/SideNav"
import Link from "next/link"
import CountUp from 'react-countup';


const Dashboard = ({products, notifications, participants}) => {
    const [auctions, setAuctions] = useState(false);
    const [purchases, setPurchases] = useState([]);
    const [bids, setBids] = useState([]);
    const [revenue, setRevenue] = useState(0);

    useEffect(()=>{
        let temprev = 0;
        let tempbids = [];
        let tempPchs = [];
        products.map(p=>{
            if(p.purchased){
                temprev += p.lastAt.value;
                tempbids.push(p);
            }
            else if(p.orders){
                let os = Object.values(p.orders);
                os.map(o=>{
                    temprev += +p.price
                })
                tempPchs.push(p);
            }
        })
        setRevenue(temprev)
        setBids(tempbids);
        setPurchases(tempPchs);
        products.map(p=>{
            let now = new Date().getTime() + 10800000;
            if(now > p.totalStartTime && now < p.totalEndTime){
                setAuctions(true);
            }
        })
    },[])
     return (
       <div className={s.main}>
           <SideNav/>
           <div className={s.content_wrapper}>
            <div className={s.content}>
                <div className={`${s.listcard} ${s.listcard_products} bp3-elevation-3`}>
                    <div className={s.listhead}>
                            <h2>My Products</h2>
                    </div>
                    <div className={s.list}>
                    {
                    products.length? products.map(p=>{
                            return(
                                <Link href={`/products/${p.id}`}>
                                    <a>
                                        <div className={`bp3-card ${s.product_item}`}>
                                            <img loading="lazy" src={p.image} height="100%"/>
                                            <div>
                                                <h4>{p.name}</h4>
                                                <div className="desc_container desc_container_product_item">
                                                    <p className="desc">{p.describtion}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            )
                        }): <div className="bp3-card" style={{height:'100%'}}>
                                <div>
                                    <p>You Haven't Posted Any Products</p>
                                </div>
                            </div>
                    }
                    </div>
                </div>

                <div>
                    <div className={`${s.listcard} ${s.listcard_notifications} bp3-elevation-3`}>
                        <div className={s.listhead}>
                                <h2>Events</h2>
                        </div>
                        <div className={s.list}>
                        {
                        notifications.length? notifications.map(n=>{
                                return(
                                    <div className={`bp3-card`}>
                                        <div>
                                            <h4 style={{margin:0}}>{n.date}</h4>
                                            <div>
                                                <p>{n.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }): <div className="bp3-card">
                                    <div>
                                        <p>No Events At The Moment</p>
                                    </div>
                                </div>
                        }
                        </div>
                    </div>
                    <div className={`${s.listcard} ${s.listcard_participants} bp3-elevation-3`}>
                        <div className={s.listhead}>
                                <h2>Latest Purchases</h2>
                        </div>
                        <div className={s.list}>
                            <h3 style={{margin:'1em'}}> People Won Your Auctions </h3>
                        {
                        bids.length? bids.reverse().map(bid=>{
                            if(bid) return(
                                        <div className={`bp3-card`}>
                                            <div>
                                                <h4>
                                                    Bid won by <b>{bid.lastAt?.bidder.email}</b> at value of <b>${bid.lastAt?.value}</b> on <b>{bid.endDate}</b> for
                                                    your product named: <b style={{color:'orange',textDecoration:"underline"}}><a href={`/products/${bid.id}`}>{bid.name}</a></b>
                                                </h4>
                                            </div>
                                        </div>
                                    )
                            }): <div className="bp3-card">
                                <div>
                                    <p>Couldn't Find Bidders</p>
                                </div>
                            </div>
                        }
                        </div>
                        <div className={s.list}>
                            <h3 style={{margin:'1em'}}> People Bought Your Products </h3>
                        {
                        purchases.length? purchases.reverse().map(purchase=>{
                            console.log(purchase, purchase.orders)
                            if(purchase && purchase.orders) return Object.values(purchase.orders).map((order)=>{
                                    return(
                                        <div className={`bp3-card`}>
                                            <div>
                                             <h4>Your product: <b>{purchase.name}</b> has been ordered by customer <b>{order.customerEmail}</b> on <b>{order.date}</b></h4>
                                            </div>
                                        </div>
                                    )
                                })
                            }): <div className="bp3-card">
                                <div>
                                    <p>Couldn't Find Buyers</p>
                                </div>
                            </div>
                        }
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bp3-card bp3-elevation-3" style={{textAlign:'center'}}>
                        <h3>Total Revenue:</h3>
                        <h2 style={{color:'green', fontSize:48, margin:0}}>$<CountUp end={revenue} duration={3}/></h2>
                    </div>
                    <div className={`${s.listcard} ${s.live_products} bp3-elevation-3`}>
                        <div className={s.listhead}>
                                <h2>Live Auctions</h2>
                        </div>
                        <div className={s.list}>
                        {
                        products.length && auctions? products.map((p,i)=>{
                            let now = new Date().getTime() + 10800000;
                            if(now > p.totalStartTime && now < p.totalEndTime){
                                return(
                                    <Link href={`/products/${p.id}`}>
                                        <a>
                                            <div className={`bp3-card ${s.product_item}`}>
                                                <img loading="lazy" src={p.image} height="100%"/>
                                                <div>
                                                    <h4>{p.name}</h4>
                                                    <div className="desc_container desc_container_product_item">
                                                        <p className="desc">{p.describtion}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                )
                            }
                            }): <div className="bp3-card">
                                    <div>
                                        <p>No Live Auctions Going On At The Moment</p>
                                    </div>
                                </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
           </div>
       </div>
     )
}

export default Dashboard