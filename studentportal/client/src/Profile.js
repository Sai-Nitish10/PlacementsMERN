import React,{useState,useEffect} from 'react'
import { Navigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const Indprofile = () => {
    const {id,sid}=  useParams()
   
    const [iprofile,setIprofile] = useState(null)
    const [puser,setPuser] = useState(null)
    
    const [x,setX] = useState([])
    

    useEffect(()=>{
                
        axios.get(`http://localhost:5000/indcompprofile/${id}`).then(
            res => setIprofile(res.data)
        )

        axios.get(`http://localhost:5000/getpresentuser`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(
            res => setPuser(res.data)
        )
        console.log(id)

        axios.get('http://localhost:5000/getregisteredcompanies',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => 
                setX(res.data.filter(profile => profile.compId === id && profile.studentId === sid )))

    },[])


  

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

    const registerHandler = () =>{
        console.log(iprofile.compname,iprofile._id)
        axios.post("http://localhost:5000/registercomp",{compname:iprofile.compname,compId:iprofile._id,studentname:puser.fullname,studentId:puser._id,clgId:puser.collegeId,salary:iprofile.salary}).then(
            res=> alert(res.data)
        )
    }
    

 
    return (
        <div>
             <Header />
             { iprofile && <div>
            
            <div className="profile bg-light card " style={{"margin":"10px"}}>
                <center>
                        <img 
                            className="round-img"
                            src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
                            height="250" width="450"
                            alt="pix"
                        />
                        <div>
                            <h2 style={{"color":"springgreen"}}>{iprofile.compname}</h2>
                            <h3>{iprofile.email}</h3>
                            <h3>{iprofile.description}</h3>
                            <h4><b>eligibility: </b>{iprofile.eligibility}</h4>
                            <h5><b>Salary : </b>{iprofile.salary}</h5>
                            <p><b>Last Date : </b>{iprofile.lastdate}</p>
                            <p><b>Number of rounds : </b>{iprofile.rounds}</p>

                            <br />
                            <p><b>Registeration Link : </b><a href={iprofile.link} target="_blank">{iprofile.link}</a></p>

                            {x.length<1 ? <div><h5 style={{color:"red"}}>Not yet Registered?</h5>&nbsp;&nbsp;<h5 className='btn btn-primary' onClick={registerHandler}>Register Now</h5></div>: <h2 style={{color:"green"}}>Registered Successfully</h2>}<br /><br />
                        </div>
                </center>
                
            </div>
            

</div>}
        </div>
    )
}

export default Indprofile
