import axios from 'axios';
import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Logout=()=>{
    const navigate=useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/logout",
            {
                headers:{'Accept':"application/json","Content-Type":"application/json"},
                withCredentials:true
            })
            .then((res)=>{
                navigate("/");
                if(res.status!=200){
                    throw new Error(res.error);
                }
            }).catch((err)=>{
                console.log("front end error : "+err);
            });
    },[]);
    return(
        <React.Fragment>
            <h1>Logout page Called </h1>
        </React.Fragment>
    )
}

export default Logout;
