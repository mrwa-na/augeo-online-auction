import s from "./product.module.css"

const SideMenu = () => {
     return (
       <div className={s.side_menu_container}>
          <ul>
              <li className="bp3-button bp3-interactive bp3-icon-user"></li>
              <li className="bp3-button bp3-interactive bp3-icon-calendar"></li>
              <li className="bp3-button bp3-interactive bp3-icon-stopwatch"></li>
              <li className="bp3-button bp3-interactive bp3-icon-eye-open"></li>
              <li className="bp3-button bp3-interactive bp3-icon-disable"></li>
          </ul>
       </div>
     )
}

export default SideMenu