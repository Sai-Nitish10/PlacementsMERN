import React,{useState} from 'react'
import { Link,Navigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [auth,setAuth] = useState(false)
    const [data,seData] = useState({
        email : '',
        password : '',
    })
    const {email,password} = data
    const changeHandler = e =>{
        seData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        if(email && password && email==="vjit@gmail.com" && password==="12"){
            localStorage.setItem('token',"12vjit");
            setAuth(true)
        }
        else{
            alert("Enter valid Inputs")
        }
    }

    if(auth){
        return <Navigate to='/dashboard' />
    }

    return (
        <div>
            
        <nav className="navbar bg-dark justify-content-left">
            <h1 style={{"marginLeft":"5px"}}>
                <Link to='/'>Placement portal</Link>
            </h1>
            <div className="justify-content-left" >
                <h5 >
                   
                    <Link to="/login" className="btn btn-secondary" >Login</Link>&nbsp;&nbsp;
                </h5>
            </div>
            
        </nav>
            
            <section className="container">
                <h1 className="large " style={{"color":"orange","marginTop":"100px"}} >Admin Sign In</h1>
                <p className="lead"><b>Sign into Your Admin Account</b></p>
                <form onSubmit={submitHandler}>
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="email"    placeholder="Enter email"    name="email" value={email}   onChange={changeHandler} /><br /><br />
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="password" placeholder="Enter password" name="password" value={password} onChange={changeHandler} /><br /><br />
                    <input type="submit" className="btn btn-primary" value="login" />
                </form>
                
            </section>
        </div>
    )
}

export default Login
