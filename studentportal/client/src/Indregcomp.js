import React,{useState,useEffect} from 'react'
import { Navigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const Indregcomp = () => {
    const {id}=  useParams()
   
    const [iprofile,setIprofile] = useState(null)
    const [puser,setPuser] = useState(null)
    

    useEffect(()=>{
                
        axios.get(`http://localhost:5000/indregcompprofile/${id}`).then(
            res => setIprofile(res.data)
        )

        

    },[])


  

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

   
    const wHandler = id =>{
        axios.put(`http://localhost:5000/updatewrittentest/${id}`).then(
            res => alert(res.data)
        )
    }

    const tHandler = id =>{
        axios.put(`http://localhost:5000/updatetechnicalround/${id}`).then(
            res => alert(res.data)
        )
    }

    const hHandler = id =>{
        axios.put(`http://localhost:5000/updatehrround/${id}`).then(
            res => alert(res.data)
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
                            <h3>{iprofile.studentname}</h3>
                            <h3>{iprofile.clgId}</h3><br /><br />

                            <h3 style={{color:"brown"}}><b>-:  Rounds Data :-</b></h3>
                            {iprofile.writtentest ? <h3>Written Test : Completed</h3> : <div><h3>Written Test : </h3><button className='btn btn-success' onClick={()=> wHandler(iprofile._id)}>Completed</button> </div>}
                            {iprofile.writtentest ? <div>{iprofile.technicalround ? <h3>Techinical Round : Completed</h3> : <div><h3>technical round : </h3><button className='btn btn-success' onClick={()=> tHandler(iprofile._id)}>Completed</button> </div>}</div> : null}
                            {iprofile.technicalround ?<div>{iprofile.hrround ? <h3>Hr round : Completed</h3> : <div><h3>HR round : </h3><button className='btn btn-success' onClick={()=> hHandler(iprofile._id)}>Completed</button> </div>}</div>:null}
                            <br /><br />
                            
                        </div>
                </center>
                
            </div>
            

</div>}
        </div>
    )
}

export default Indregcomp
