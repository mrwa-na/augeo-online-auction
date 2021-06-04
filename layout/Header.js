import { Button, Menu, MenuDivider, MenuItem, Popover, Position } from '@blueprintjs/core';
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import {UserContext} from '../contexts/UserContext'
import { auth, db } from '../firebase/init';

const UserMenu = ({logout}) =>{
    return(
        <Menu>
            <MenuItem text="Profile" />
            <MenuDivider />
            <MenuItem text="Logout" onClick={logout} />
        </Menu>
    )
}

const Notifications = ({notifs}) =>{
    return(
        Object.values(notifs).map((n,i)=>{
            return <> 
                    <MenuItem text={ <div> <span style={{color:'yellow'}}>Date:{n.date}</span> - {n.message} </div>} />
                    {i===Object.values(notifs).length-1?null:<MenuDivider/>}
                </>
        })
    )
}

const Header = () => {
    const {user, setUser} = useContext(UserContext);
    const [notifs, setNotifs] = useState(null);
    const logout = () =>{
        auth.signOut();
    }

    useEffect(()=>{
        db.ref(`users/${user.uid}/notifications`).on("value", sn=>{
            setNotifs(sn.val());
        })
        return ()=>{
            db.ref(`users/${user.uid}/notifications`).off("value");
        }
    }, [])

     return (
        <nav className="bp3-navbar bp3-dark" style={{position:'fixed',top:0, zIndex:999, left:0}}>
            <div className="bp3-navbar-group bp3-align-left">
                <div className="bp3-navbar-heading">Augeō</div>
                <input className="bp3-input hide-for-mobile" placeholder="Search Products..." type="text" />
            </div>
            <div className="bp3-navbar-group bp3-align-right">
                <a href="/"><button className="bp3-button bp3-minimal bp3-icon-home">Home</button></a>
                <a href="/products"><button className="bp3-button bp3-minimal bp3-icon-shop">Market</button></a>

                <span className="bp3-navbar-divider"></span>
                    <Popover content={<UserMenu logout={()=>logout()} />} position={Position.BOTTOM}>
                        <Button minimal icon="user" />
                    </Popover>

                <div className="notifs_container">
                    {notifs?<div className="notifs_indicator">{Object.values(notifs).length}</div> : null}
                    <Popover 
                    popoverClassName="notif_popover"
                    content={notifs? <Notifications notifs={notifs}/>: <Menu><MenuItem text="There are no notifications"/></Menu> }
                    position={Position.BOTTOM}
                    >
                        <Button minimal icon="notifications" />
                    </Popover>
                </div>
                <button className="bp3-button bp3-minimal bp3-icon-cog hide-for-mobile"></button>
            </div>
        </nav>
     )
}

export default Header