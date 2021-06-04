import s from "./CannotFind.module.css"

const CannotFind = () => {
     return (
       <div className={s.main}>
          <div className={s.box}>
            <div className={s.message_container}>
                <h4>Couldn't Find What You Are Looking For! Please Try Again Other Time</h4>
            </div>
          </div>
       </div>
     )
}

export default CannotFind