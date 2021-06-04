import s from "./product.module.css"

const NotAvailable = ({sd,st,ed,et}) => {
     return (
        <div className={`container ${s.not_available}`}>
            <div className="bp3-card flex-column-center bp3-elevation-2">
                <h3 className="bp3-icon-issue" style={{color:'crimson'}}> &nbsp;This product is not available! <br/> Please check the dates & times</h3>
            </div>
            <div className={`bp3-card bp3-elevation-2 ${s.stats}`}>
                <h4>About This Product</h4>
                <ul>
                    <li className="bp3-card bp3-icon-timeline-events">&nbsp;<b>Date Starts:</b> {sd} <b>|</b> Time: {st}</li>
                    <li className="bp3-card bp3-icon-outdated">&nbsp;<b>Date Ends:</b> {ed} <b>|</b> Time: {et}</li>
                </ul>
            </div>
        </div>
     )
}

export default NotAvailable