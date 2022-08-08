import React, {useEffect} from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../config/firebase';
import { UserInterfaceProps} from '../../interfaces/pages.interface';
import logo from '../../logo.svg';

const NavBar = (props: UserInterfaceProps) => {
    const navigate = useNavigate();

    return (
        <Navbar collapseOnSelect expand="md">
      <div className='container-fluid align-item-center'>
        <Navbar.Brand onClick={() => navigate('/home')} className='p-0'>
            <img src={logo} height={100} width={150}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='border border-0 m-0'>
        <img src={props.photoURL} alt='user' height={50} width={50} style={{borderRadius: '50%'}}/>
        </Navbar.Toggle>
        {
            props.displayName &&
            <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end align-items-center'>
          
          <Nav className='align-items-center'>
            <Button variant='primary' className='mx-2 fw-semibold' onClick={() => logOut()}>Sign out</Button>
            <div className='d-flex align-items-center'>
                {props.photoURL && <img src={props.photoURL} alt='user' height={50} width={50} className='mx-2 d-none d-md-block' style={{borderRadius: '50%'}}/>}
                <span className='mx-2 fw-bold'>{props.displayName}</span>
            </div>
          </Nav>
        </Navbar.Collapse>
        }
      </div>
    </Navbar>
    )
}

export default NavBar;
