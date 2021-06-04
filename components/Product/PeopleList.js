import s from "./product.module.css"

const PeopleList = ({product}) => {
     return (
      <div className={s.people_list_container}>
        <div className={s.people_list}>
            <div className={`bp3-card bp3-elevation-2 ${s.section_title}`}>
                <h3>Bidders</h3>
            </div>
            {
                product.bidders?
                [...Object.entries(product.bidders)].map(([key,val],i)=>{
                    return <div className="bp3-card bp3-elevation-2">
                        <p>Bidder <b>{product.bidders[key].bidderEmail}</b> Just added a total amount of {product.bidders[key].biddedAmount}</p>
                    </div>
                }):null
            }
            </div>
            <div className={s.people_list}>
            <div className={`bp3-card bp3-elevation-2 ${s.section_title}`}>
                <h3>Watchers</h3>
            </div>
            {
                product.watchers?
                [...Object.entries(product.watchers)].map(([key,val],i)=>{
                    return <div className="bp3-card bp3-elevation-2">
                        <p>Watcher Email: {product.watchers[key].participantEmail}</p>
                        <p>Watcher ID: {product.watchers[key].participantId}</p>
                    </div>
                }):null
            }
        </div>
       </div>
     )
}

export default PeopleList