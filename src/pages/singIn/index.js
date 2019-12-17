import React from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  //MDBNavbarToggler,
  //MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBAnimation
} from "mdbreact";

import api from "../../services/api";
import { login } from "../../services/auth"

import Logo from '../../images/Investimentos.png'
import "./styles.css";


class Login extends React.Component {
  state = {
    logins: "",
    password: "",
    error: ""
  };

  handleSignIn = async e =>{
    e.preventDefault();
    const { logins, password } = this.state;
    if (!logins || !password){
      this.setState({ error: "Preencha o Login e a Senha para continuar!" });
    } else {
      try {
        const response = await api.post('/session', { logins, password });
        login(response.data.token);
        this.props.history.push('/datatable');
      } catch (err) {
        this.setState({
          error:
            "Houve algum problema com a sua Credencial, verifique seus dados por favor"
        });
      }
    }
  };
  
  render() {
    return (
      <div id="classicformpage">
        <Router>
          <div>
            <MDBNavbar dark expand="md" fixed="top"> 
              <MDBContainer>
                <MDBNavbarBrand>
                  <img src={Logo} width="300"/>                  
                </MDBNavbarBrand>
                  <MDBNavbarNav left>
                  </MDBNavbarNav>
              </MDBContainer>
            </MDBNavbar>
              
          </div>
        </Router>

        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow className="d-flex justify-content-center align-items-center">
                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <form onSubmit={this.handleSignIn}>
                    <MDBCard id="classic-card">
                      <MDBCardBody className="white-text" >
                        <h3 className="text-center" >
                         Campanhas 
                         <h6 color="#FF0000">{this.state.error && <p>{this.state.error}</p>}</h6>
                        </h3>
                        <hr className="hr-light" />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Login do Sugar"
                          icon="user"
                          onChange = {e => this.setState({ logins: e.target.value })}
                        />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Senha"
                          icon="lock"
                          type="password"
                          onChange = {e => this.setState({ password: e.target.value })}
                        />
                        <div className="text-center mt-4 black-text">
                          <MDBBtn type="submit" color="amber">Entrar</MDBBtn>
                          <hr className="hr-light" />
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                    </form>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

export default withRouter(Login);