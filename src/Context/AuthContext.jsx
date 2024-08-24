import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let auth = createContext(null)

export default function AuthContextProvider({children}){
    let [islogin , setlogin] = useState(null)

    //handle refresh
    useEffect(() => {
        if(localStorage.getItem('userToken'))
            setlogin(jwtDecode(localStorage.getItem('userToken')))
    },[])

    return <auth.Provider value={{islogin,setlogin}}>
        {children}
    </auth.Provider>
}
