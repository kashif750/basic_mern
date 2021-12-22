import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [data,setData]=useState({email:"",password:""});
    const navigate=useNavigate();

    const loginUser=async(e)=>{
        e.preventDefault();

        const res=await axios.post("http://localhost:8000/students/signin",{email:data.email,password:data.password},{headers:{"Content-Type":"application/json"}});
        // const data1=await res.json();
        const data1=true;

        if(res.status===400){
            window.alert("invalid credentials");
        }else{
            window.alert("login successfull");
            navigate("/main");
        }

    }//---> loginUser()

    const inputChange=(e)=>{

        const {name,value} =e.target;

        setData({...data,[name]:value});
    }
    return (
        <React.Fragment>
            <h1>Login page Called </h1>
            <form method="POST" onSubmit={loginUser}>
                {/* <label for="fname">email :</label><br/> */}
                <input type="text" id="fname" name="email" value={data.email} onChange={inputChange}/><br/>
                {/* <label for="lname">password:</label><br/> */}
                <input type="text" id="lname" name="password" value={data.password} onChange={inputChange}/><br/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </React.Fragment>
    )
}

export default Login;
