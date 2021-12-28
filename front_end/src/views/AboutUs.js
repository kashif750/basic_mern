import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


const AboutUs=()=>{
    const [data,setData]=useState();
    const navigate=useNavigate();

    const callAboutPage=async()=>{
        try{
            // setData(Cookies.get('tempcookie'));
            console.log(Cookies.get("jwtoken"));
            console.log(Cookies.get("temptoken"));

            const res=await axios.get("http://localhost:8000/about",{headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },withCredentials:true});

            // // const res= await axios.post("http://localhost:8000/temp");
            // // console.log("about us : dta : ");

            // if(!res.status===200){
            //     const error=new Error(res.error);
            //     throw error;
            // }
            // if(res.status===401){
            //     navigate("/");
            // }

            
        }catch(err){
            console.log("##############3333333######3 front end error  : "+err);
            navigate("/");
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);

    return(
        <React.Fragment>
            <h1>About Us page Called </h1>
        </React.Fragment>
    )
}

export default AboutUs;
