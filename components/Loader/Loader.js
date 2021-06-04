import s from "./Loader.module.css"

const Loader = () => {
     return (
       <div className={s.main}>
          <div className={s.loader}></div>
       </div>
     )
}

export default Loader