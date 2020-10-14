import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { CLIENT_ID } from '../../utilities/googlemaps';
import { useHistory } from 'react-router-dom';


const Styles = styled.div`
    .navbar { background-color: #222; }
    a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
    }
    .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
    }
    .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
    }
`

class NavigationBar extends Component {
    login = (response) => {
        let path = '/about';
        let history = useHistory();
        history.push(path);
        if(response.accessToken) {
            this.props.setIsLoggedIn(true)
            this.props.setAccessToken(response.accessToken)
        }
    }

    logout = (response) => {
        this.props.setIsLoggedIn(false)
        this.props.setAccessToken('')
    }

    handleLoginFailure (response) {
        alert('Failed to log in')
    }
    
    handleLogoutFailure (response) {
        alert('Failed to log out')
    }

    render() {
        return(
            <Styles>
                <Navbar>
                    <Navbar.Brand href="/">Anusha's Art Shop</Navbar.Brand> 
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
                        <Nav.Item><Nav.Link href="/about">Art</Nav.Link></Nav.Item>
                        <Nav.Item>
                            {this.props.isLoggedIn ?
                                <GoogleLogout
                                    clientId={ CLIENT_ID }
                                    buttonText='Logout'
                                    onLogoutSuccess={ this.logout }
                                    onFailure={ this.handleLogoutFailure }
                                >
                                </GoogleLogout> :
                                <GoogleLogin
                                    clientId={CLIENT_ID}
                                    buttonText='Login'
                                    onSuccess={this.login}
                                    onFailure={this.handleLoginFailure}
                                    cookiePolicy={'single_host_origin'}
                                    responseType="code, token"
                                >
                                </GoogleLogin> 
                            }
                        </Nav.Item>    
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>
        )
    }
}

export default NavigationBar