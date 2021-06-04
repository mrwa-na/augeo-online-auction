import '../styles/globals.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import 'react-credit-cards/es/styles-compiled.css';


import Layout from '../layout/Layout';
import {useRouter} from 'next/router'

import {auth} from '../firebase/init'
import { useState, useMemo, createContext } from 'react';
import NotLoggedScreen from '../components/NotLoggedScreen/NotLoggedScreen';
import Loader from '../components/Loader/Loader';
import {UserContext} from '../contexts/UserContext';


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const excludePaths = ['/login','/register'];
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user)=>{
    if(user && !user.emailVerified){
      auth.signOut();
    }
    else{
      setUser(user);
    }
    setLoading(false);
  })

  if(loading) return <Loader/>
  else{
        return(
        <UserContext.Provider value={{user, setUser}}>
          {
            user && user.emailVerified?
            <Layout>
              <Component {...pageProps} />
            </Layout>
            :
            <NotLoggedScreen/>
          }
        </UserContext.Provider>
        )
  }
}

export default MyApp
