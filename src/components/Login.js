import React, { useState } from "react";
import {
  Button,
  Container,
  Jumbotron,
  Form
} from 'react-bootstrap'
import { Redirect } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

export default function Login(props) {
  const [username, setUsername] = useState("admin");
  const [credential, setCredential] = useState("1111");
  const [autherror, setAuthError] = useState(false );
  const [authdata, setAuthData] = useState("");

  function validateForm() {
    return username.length > 0 && credential.length > 0;
  }

  function handleSubmit(event) {

    const url = 'http://3.122.7.162:5000/v60/admin/session';

    axios.post(
      url,
      {
        username: username,
        credential: credential,
      },
      {
        withCredentials: true,
        xsrfCookieName: 'JSESSIONID'
      })
    .then((response) => {
      if(response.status === 200) {
        console.log("Login successfull");
        console.log(response);
        setAuthData(response);
      }
      else {
        setAuthError(true);
      }

    })
    .catch((error) => {
    console.log(error);
    setAuthError(true);

  });

    event.preventDefault();
  }

  if (authdata) {
    // redirect to home if signed up
    return (<Redirect to = {{ pathname: "/search" }} />);
  }

  return (

  <Container className="p-3">
      <Jumbotron className="login">
        <h1 className="header h3 text-center">Login</h1>
        {/* <p>{JSON.stringify(authdata)}</p> */}
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label className="sr-only">Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="sr-only">Password</Form.Label>
            <Form.Control
              value={credential}
              onChange={e => setCredential(e.target.value)}
              type="password"
            />
          </Form.Group>

          <div className="text-right">
            <Button variant="dark" className="text-right" disabled={!validateForm()} type="submit">
              Login
            </Button>
          </div>

          <hr className="bg-white" />
          { autherror ? (
            <span className="text-dark">Please contact the System Administrator at extension 1001 to create a new Login or reset your password.</span>
          ) : '' }
        </form>
      </Jumbotron>
    </Container>

);

}