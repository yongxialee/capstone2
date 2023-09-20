
import React,{useState,useContext} from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import CurrentUserContext from '../context/CurrentUserContext';
import {Button} from 'react-bootstrap'

export default function ProfileForm() {
  const {currentUser} = useContext(CurrentUserContext)
  return (
  
      
    <div className="vh-100" style={{ backgroundColor: 'lightgray' }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          {/* <MDBCol md="9" lg="7" xl="5" className="mt-5"> */}
            <MDBCard style={{ width:'400px' ,borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{currentUser}</MDBCardTitle>
                    <MDBCardText>Senior Journalist</MDBCardText>

                    <div className=""
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">First Name</p>
                       
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Last Name</p>
                        <p className="mb-0">Last Name</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Email</p>
                        <p className="mb-0">Email</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Username</p>
                        <p className="mb-0">Username</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Password</p>
                        <p className="mb-0">Password</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <Button outline className="me-1 flex-grow-1">Edit</Button>
                      {/* <MDBBtn className="flex-grow-1">Follow</MDBBtn> */}
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          {/* </MDBCol> */}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

