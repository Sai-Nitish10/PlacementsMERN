import React,{useState,useEffect} from 'react'
import { Navigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const Indprofile = () => {
    const {id}=  useParams()
   
    const [iprofile,setIprofile] = useState(null)
    const [students,setStudents] = useState([])
    const [selectedstudents,setselectedstudents] = useState([])

    useEffect(()=>{
                
        axios.get(`http://localhost:5000/indcompprofile/${id}`).then(
            res => setIprofile(res.data)
        )
        console.log(id)

        axios.get(`http://localhost:5000/indregcompprofilestudent/${id}`).then(
            res => setStudents(res.data)
        )

        axios.get(`http://localhost:5000/indregcompprofilestudent/${id}`).then(
            res => setselectedstudents(res.data.filter(profile => profile.hrround))
        )

    },[])


  

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
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
                        </div>
                        <br /><br />

                        
                        {
                            students.length>=1 ?
                             
                            <div>
                                <h2 style={{color:"brown"}}>-: Students :-</h2>
                                {students.map(profile =>
                                <div className='card' style={{"margin":"10px","width": "25.5rem"}}>
                                    <h3 style={{color:"blue"}}>{profile.studentname}</h3>
                                    <h5 >{profile.clgId}</h5>
                                    <h5>Number of rounds finished : {profile.writtentest ? (profile.technicalround ? (profile.hrround ? "3" : "2") : "1") : "0"}</h5>
                                    </div>
                                    )}
                            </div>
                            :
                            <h3 style={{color:"red"}}>No Student Yet Registered for this company</h3>
                        }

                        <br /><br />
                        
                        {
                            selectedstudents.length>=1 ?
                             
                            <div>
                                <h2 style={{color:"brown"}}>-: Selected Students :-</h2>
                                {selectedstudents.map(profile =>
                                <div className='card' style={{"margin":"10px","width": "25.5rem"}}>
                                    <h3 style={{color:"blue"}}>{profile.studentname}</h3>
                                    <h5 >{profile.clgId}</h5>
                                    <h5>Number of rounds finished : {profile.writtentest ? (profile.technicalround ? (profile.hrround ? "3" : "2") : "1") : "0"}</h5>
                                    </div>
                                    )}
                            </div>
                            :
                            <h3 style={{color:"red"}}>No Student Yet Selected for this company</h3>
                        }
                </center>
                
            </div>
            

</div>}
        </div>
    )
}

export default Indprofile
