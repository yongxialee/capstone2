import React from 'react';
import {Button} from 'reactstrap';
import "./Footer.css"
import {
  MDBFooter,
  MDBContainer,
 
  MDBIcon,
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='bg-light text-center text-white'>
      <MDBContainer >
        <section className='mb-4'>
        <Button >
          <MDBIcon fab icon='facebook-f' />
        </Button>

          <Button>
            <MDBIcon fab icon='twitter' />
          </Button>

          <Button>
            <MDBIcon fab icon='google' />
          </Button>
          <Button>
            <MDBIcon fab icon='instagram' />
          </Button>

          <Button>
            <MDBIcon fab icon='linkedin-in' />
          </Button>

          <Button>
            <MDBIcon fab icon='github' />
          </Button>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgb(8, 67,29)' }}>
        © 2023: All rights reserved : 
        <a className='text-white' href='/'>
          BLOOM IN SPRING
        </a>
      </div>
    </MDBFooter>
  );
}