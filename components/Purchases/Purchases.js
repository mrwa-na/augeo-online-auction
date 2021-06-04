import s from "./Purchases.module.css"

const Purchases = ({purchases, bids}) => {
     return (
       <div className={s.main}>
          <div className={s.box}>
            <h1>&nbsp;Through Bids</h1>
            {
                bids.length? bids.map(bid=>{
                    return <div className={s.purchase}>
                                <h4>Bid won by <b>{bid.lastAt.bidder.email}</b> at value of <b>${bid.lastAt.value}</b> on <b>{bid.endDate}</b> for
                                your product named: <b style={{color:'orange',textDecoration:"underline"}}><a href={`/products/${bid.id}`}>{bid.name}</a></b></h4>
                            </div>
                }):<div className={s.purchase}>
                    <h4>You don't have any products purchased by bids</h4>
                </div>
            }
          </div>
          <div className={s.box}>
            <h1>&nbsp;Through Buys</h1>
            {
                purchases.map(purchase=>{
                    if(purchase.orders)
                        return purchase.orders.map(order=>{
                            return <div className={s.purchase}>
                                        <h4>Your product: <b>{purchase.name}</b> has been ordered by customer <b>{order.customerEmail}</b> on <b>{order.date}</b></h4>
                                    </div>
                        })
                    else return <div className={s.purchase}>
                                    <h4>You don't have any products purchased by buys</h4>
                                </div>
                })
            }
          </div>
       </div>
     )
}

export default Purchases