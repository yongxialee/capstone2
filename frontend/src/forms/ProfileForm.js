
import React,{useState,useContext,Component, useEffect} from 'react'
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import CurrentUserContext from '../context/CurrentUserContext';
import { Form, Label, Input, Button, FormGroup, Card, CardBody } from "reactstrap";

import BloomInSpringAPI from '../api';

export default function ProfileForm() {
  const {currentUser,setCurrentUser} = useContext(CurrentUserContext);
  const [submitStatus,setSubmitStatus]=useState('init')
  console.log(currentUser)
  const INITIAL_STATE={
    username:currentUser.username,
    password:'',
    firstName:currentUser.firstName,
    lastName:currentUser.lastName,
    email:currentUser.email
  };
  const [formData,setFormData]=useState(INITIAL_STATE);
  const [transactions,setTransactions]=useState([]);
  const [message,setMessage]=useState('');
  const [formError,setFormErrors]=useState([]);

  useEffect(()=>{
    const getTransactions= async ()=>{
        try{
            const userTransactions = await BloomInSpringAPI.getTransactions(currentUser.username);
            setTransactions(userTransactions);
        }catch(e){
            console.log(e);

        }

    }
    getTransactions();
  },[currentUser.username])



const handleChange = (e) => {
  const {name, value} = e.target;
  setFormData(data => ({
      ...data,
      [name]: value,
  }));
}

const handleSubmit = async (e) => {
  e.preventDefault();
  let updatedUser;
  try {
       updatedUser = await BloomInSpringAPI.profileUpdate(currentUser.username, formData);
      if (updatedUser) {
          setSubmitStatus("success");
      }
  } catch (error) {
      setSubmitStatus("fail");
      return;
  }
  setFormData(f=>({...f,password:''}));
  setCurrentUser(updatedUser);
  

}

return (
  <div className="pt-5">
      <div className="ProfileEditForm">
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
              
              <Card>
              <h2 className="mb-3">Profile</h2>
                  <CardBody>
                      <Form onSubmit={handleSubmit}>
                          <FormGroup>
                              <Label htmlFor="username">Username</Label>
                              <Input
                                  disabled
                                  id="username"
                                  name="username"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder={currentUser.username} 
                              />
                          </FormGroup>
                          <FormGroup>
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                  id="firstName"
                                  name="firstName"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder={currentUser.firstName} 
                              />
                          </FormGroup>
                          <FormGroup>
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input
                                  id="lastName"
                                  name="lastName"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder={currentUser.lastName} 
                              />
                          </FormGroup>
                          <FormGroup>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  onChange={handleChange}
                                  placeholder={currentUser.email} 
                              />
                          </FormGroup>
                          <FormGroup>
                              <Label htmlFor="password">password</Label>
                              <Input
                                  id="password"
                                  name="password"
                                  type="password"
                                  onChange={handleChange}
                                  placeholder={currentUser.password} 
                              />
                          </FormGroup>
                          <p>
                              <Button>Save Changes</Button>
                              {submitStatus === "success"
                              ? <span style={{color: "green", paddingLeft: 20}} >Updated Successfully</span>
                              : submitStatus === "fail"
                              ? <span style={{color: "red", paddingLeft: 20}} >Something went wrong.</span>
                              : null}
                          </p>
                          <h2 className="text-xl font-bold mb-4">Transactions</h2>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div key={transaction.transactionId}>
                  <p>Transaction ID: {transaction.transactionId}</p>
                  <p>Total Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.totalPrice / 100)}</p>
                  <p>Date: {new Date(transaction.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No transactions yet.</p>
            )}
                          
                      </Form>
                  </CardBody>
              </Card>
          </div>
      </div>
  </div>
);
}