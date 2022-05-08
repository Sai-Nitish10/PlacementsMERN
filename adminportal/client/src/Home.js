import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <center>

                {/* <Logo /> */}
                
               
                <section  style={{"marginTop":"170px"}}>
                    
                        <h1 >VJIT Placement Portal</h1>
                        <p >
                            create a student profile and find your students positions in company
                        </p>
                        
                        
                        <Link to='/login' className="btn btn-success">Admin SignIn</Link>
                    
                </section>
                
                
            </center>
        </div>
        
    )
}

export default Home


