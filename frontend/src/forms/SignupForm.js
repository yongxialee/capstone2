import React,{useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CurrentUserContext from '../context/CurrentUserContext';

/**
 * 
 *User sign up form
 show form and manages, update to state on changes

 on submission:
 invoke signup function prop
 redirect to homepage after signup

 */
export default function SignupForm({signup}) {
  const navigate = useNavigate();
  const INITIAL_STATE ={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:''
  };
  const [formData,setFormData]=useState(INITIAL_STATE);
  const [duplicateUser,setDuplicateUser]=useState(false)
  const {signUp} =useContext(CurrentUserContext)
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
        await signUp(formData);
        navigate("/product");
    }catch(e){
      if(e[0].includes("Duplicate username")){
                
        setDuplicateUser(true)
        debugger;
      }
    }
    alert(`created user ${formData.username}`)
    
  }

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setFormData(data=>({...data,[name]:value}));
    console.log(formData)

  }




  return (
    <div>
      <section className="vh-100 bg-image">
  {/* <div className="mask d-flex align-items-center h-100 gradient-custom-3"> */}
    <div className="container h-80">
      {/* <div className="row d-flex justify-content-center align-items-center h-100"> */}
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius: '15px', marginBottom:'20px'}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
              {/* <label className="form-label" for="form3Example1cg">First Name</label> */}
                  <input type="text" 
                  id="firstName" 
                  name="firstName"
                  value={formData.firstName}
                  className="form-control form-control-lg"  
                  placeholder='First Name'
                  onChange={handleChange}
                  /> 
                </div>
                <div className="form-outline mb-4">
                {/* <label className="form-label" for="form3Example1cg">Last Name</label> */}
                  <input type="text" 
                  id="lastName" 
                  name="lastName"
                  value={formData.lastName}
                  className="form-control form-control-lg"  
                  placeholder='Last Name'
                  onChange={handleChange}
                  />
                 
                </div>

                <div className="form-outline mb-4">
                {/* <label className="form-label" for="form3Example3cg">Email Address</label> */}
                  <input type="email" 
                  id="email"  
                  name="email"
                  value={formData.email}
                  placeholder="Email Address" 
                  className="form-control form-control-lg" 
                  onChange={handleChange}
                  />
                  
                </div>

                <div className="form-outline mb-4">
                {/* <label className="form-label" for="form3Example4cg">Password</label> */}
                  <input type="text" 
                  id="username" 
                  name="username"
                  value={formData.username}
                  placeholder="Username" 
                  className="form-control form-control-lg" 
                  onChange={handleChange}
                  />
                  
                </div>

                <div className="form-outline mb-4">
                  <input type="password"
                   id="password" 
                   name="password" 
                   value={formData.password}
                   placeholder="Password" 
                   className="form-control form-control-lg" 
                   onChange={handleChange}
                   />
                  {/* <label className="form-label" for="form3Example4cdg">Repeat your password</label> */}
                </div>
                <div className="d-flex justify-content-center">
                  <button onSubmit={handleSubmit}
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Sign Up</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login"
                    className="fw-bold text-body"><u>Login here</u></a></p>

              </form>

            {/* </div> */}
          {/* </div>  */}
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
