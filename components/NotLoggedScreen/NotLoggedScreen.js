import { Button, Card, Elevation } from '@blueprintjs/core'
import Link from 'next/link'
import { useState } from 'react';
import Login from '../Entry/Login';
import Register from '../Entry/Register';
import styles from './NotLoggedScreen.module.css'

const NotLoggedScreen = () => {
  const [action, setAction] = useState(null);

  if(action === "register"){
    return (
    <div className="container">
      <Register action={(v)=>setAction(v)}/>
    </div>
    )
  }
  else if(action === "login"){
    return(
    <div className="container">
      <Login action={(v)=>setAction(v)}/>
    </div>
    )
  }
  else return (
    <div className="container">
      <Card elevation={Elevation.THREE} style={{maxWidth:300}}>
        <div style={{display:'grid', placeItems:'center'}}>
          <img className="bp3-card" src="/logo.svg" width="100"/>
        </div>
        <h4 style={{textAlign:'center'}}>
          <a href="#">Welcome to Augeō<br/> The online auction system Augeō</a> 
          <br/>
          <sub>By Marwah Nabulsi</sub>
        </h4>
        <p>Register and choose your user type or login here before starting</p>
        <Button onClick={()=>setAction("register")}>Register</Button>
        <Button onClick={()=>setAction("login")}>Login</Button>
      </Card>
    </div>
  )
}

export default NotLoggedScreen;