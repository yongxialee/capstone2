import React,{ useContext,useState } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';
import { useHistory } from 'react-router-dom';
// import  { useNavigate } from "react-router-dom";


/**login form and manage update to state on changes
 * invoke login function and if a user successfully login, redirect to product
 */
export default function LoginForm() {

  const {login} = useContext(CurrentUserContext)
  const INITIAL_STATE={
    username:'',
    password:''
  };
 
  const [formData,setFormData] = useState(INITIAL_STATE);
  const [invalidLogin,setInvalidLogin]=useState(false)
  const history=useHistory()

 



  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
       await login(formData);
   
        
        alert("successfully login!")
        history.push("/product")
        setInvalidLogin(false);
          
      
    }catch(e){
      console.log(e)
      setInvalidLogin(true)
      
     
    }
    
  }

  const handleChange =(e)=>{
    const {name,value}=e.target;
    setFormData(data=>({...data,[name]:value}))

  }

  
  return (
    <div>
<section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    {/* <div className="row d-flex justify-content-center align-items-center h-100"> */}
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
          <div className="card-body  text-center" style={{backgroundColor:'rgb(8,67,29)', borderRadius: '1rem'}}>

            <form className="mb-md-5 mt-md-4 pb-5" onSubmit={handleSubmit}>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login username and password!</p>

              <div className="form-outline form-white mb-4">
                <input type="username" 
                id="username" 
                name="username"
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                className="form-control form-control-lg" />
                
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" 
                id="password"
                name='password'
                value={formData.password}
                placeholder='Password'
                onChange={handleChange}
                 className="form-control form-control-lg" />
                
              </div>

              <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

              <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
              {invalidLogin? <span style={{color:"red"}}>Invalid Username/Password</span>:null}
              <div className="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                <a href="http://google.com" className="text-white"><i className="fab fa-google fa-lg"></i></a>
              </div>

            </form>

            <div>
              <p className="mb-0">Don't have an account? <a href="/signup" className="text-white-50 fw-bold">Sign Up</a>
              </p>
            </div>

          </div>
        {/* </div> */}
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
