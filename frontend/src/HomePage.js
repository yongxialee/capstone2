import React from 'react';
import { Container,Row,Button, Col, } from 'react-bootstrap';

export default function HomePage() {
  
  return (
    <div className='myPage'>
    <h1>Welocme to Bloom in Spring</h1>
    
    <Container>
    <Row style={{ backgroundImage: require('./birthday.jpeg')}}>
            <Col>
                <img alt="birthday" src={require('./birthday.jpeg')}/>
            </Col>
         </Row>
    <Row>
    <Col>
       
        <h2>Birthday, Sympathy, Flowers, Gifts, All occation </h2>
        <p>Give or Send the gift of freshness</p>
        <a href="/product"><Button  style={{width:"150px", backgroundColor:`rgb(8, 67, 29)` }}>VIEW PRODUCT </Button></a>
       
        </Col>
        </Row>
        
        
    </Container>
    <div className='box'>
      <h3>BIRTHDAY</h3>
      <i class='fa fa-birthday-cake' style={{fontSize:'100px',color:'magenta'}}></i>
    </div>
    <div className='box'>
      <h3>GET WELL</h3>
      <i class='fa fa-heart' style={{fontSize:'100px',color:'red'}}></i>
       
    </div>
    <div className='box'>
    <h3>SYMPATHY</h3>
      <i class='fa fa-sad-tear' style={{fontSize:'100px',color:'black'}}></i>
    </div>
  
    </div>
  )
}
