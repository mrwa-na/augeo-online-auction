import {useState, useEffect, useContext} from "react"
import { Button, Card, Elevation } from '@blueprintjs/core'
import { useForm } from 'react-hook-form';
import { auth } from "../../firebase/init";
import { UserContext } from "../../contexts/UserContext";


const Login = ({action}) => {
    const {user, setUser} = useContext(UserContext);
    const [alert, setAlert] = useState({show:false, msg:''});
    const { register, handleSubmit, watch, formState: { errors }} = useForm({mode:'all'});

    // RETURN USER IF HE IS ALREADY LOGGED IN
    useEffect(()=>{
        if(user){
            window.location.href = "/";
        }
    },[])


    const handleLogin = async (data) =>{
        await auth.signInWithEmailAndPassword(data.email,data.password)
                .then(UserCredential=>{
                    if(!UserCredential.user.emailVerified){
                        setAlert({show:true, msg:"You have been registered, but you haven't verify your email. Please check your inbox for verification link"})
                        setTimeout(()=>{
                            setAlert({show:false, msg:""})
                        }, 6000);
                        auth.signOut();
                    }
                    else{
                        setUser(UserCredential.user);
                    }
                })
                .catch(e=>{
                    setAlert({show:true, msg:e.message})
                    setTimeout(()=>{
                        setAlert({show:false, msg:""})
                    }, 6000);
                });
    }

     return (
       <Card elevation={Elevation.THREE} style={{minWidth:300}}>
           {
               alert.show?
               <div className="fancyalert">
                   {alert.msg}
               </div>:null
           }
           <button className="bp3-button bp3-icon-arrow-left" onClick={()=>action(null)}></button>
           <h3>Login</h3>
           <form onSubmit={handleSubmit(handleLogin)}>
                <div className="input-father">
                    <label className="bp3-label" htmlFor="email">Enter your email</label>
                    <div className="bp3-input-group">
                        <input name="email" className="bp3-input" type="text" placeholder="Email Address" id="email" {...register("email", {required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} />
                        <button tabIndex="-1" type="button" className="bp3-button bp3-minimal bp3-icon-user"></button>
                    </div>
                    {errors.email?<div className="err">Enter a valid email address</div>:null}
               </div>
                <br/>

                <div className="input-father">
                    <label className="bp3-label" htmlFor="password">Enter your passwrd</label>
                    <div className="bp3-input-group">
                        <input {...register("password", {required:true})} type="password" id="password" className="bp3-input" placeholder="Password..." />
                        <button tabIndex="-1" type="button" className="bp3-button bp3-minimal bp3-icon-lock"></button>
                    </div>
                    {errors.password?<div className="err">This field is required</div>:null}
                </div>

                <br/>
                <button type="submit" className="bp3-button bp3-icon-log-in">Login</button>
           </form>
       </Card>
     )
}

export default Login