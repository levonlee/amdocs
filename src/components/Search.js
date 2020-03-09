import React, { useState } from "react";
import {
  Button,
  Container,
  Jumbotron,
  Form,
  Col,
  Table
} from 'react-bootstrap'
import "./Search.css";
import axios from 'axios'
import UserSingle from './UserSingle'

export default function Search(props) {
  const [searchuser, setSearchUser] = useState("test");
  const [searchuserE, setSearchUserE] = useState(false);
  const [searchuserR, setSearchUserR] = useState(false);
  const [autherror, setAuthError] = useState(false );
  const [authdata, setAuthData] = useState("");

  function validateForm() {
    return searchuser.length > 0;
  }

  function handleSubmit(event) {
    const url = 'http://3.122.7.162:5000/v60/admin/session';

    const urlSearch = 'http://3.122.7.162:5000/v60/admin/search/user?keyword=test&alias=false';

    axios.post(
      url,
      {
        username: 'admin',
        credential: '1111',
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
    .then(() => {
      return axios.get(
        urlSearch,
        {
          withCredentials: true,
          xsrfCookieName: 'JSESSIONID',
        })
      .then((response) => {
        if(response.status === 200) {
          setSearchUserR(response.data);
        }
        else {
          setSearchUserE(true);
        }

      })
    })
    .catch((error) => {
      console.log(error);
      setSearchUserE(true);
    });

    event.preventDefault();
  }

  return (
    <Container className="p-3">
      <Jumbotron className="searchHeader">
        <h1 className="header h4">Search User</h1>
        <form onSubmit={handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Label className="sr-only">Search Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={searchuser}
                onChange={e => setSearchUser(e.target.value)}
              />
            </Col>
            <Col>
              <Button variant="light" className="text-right" disabled={!validateForm()} type="submit">
                Search
              </Button>
            </Col>
          </Form.Row>
        </form>
      </Jumbotron>

      { <p>{JSON.stringify(searchuserR)}</p> }

      { (searchuserR) ? (
        <Jumbotron className="searchResult">
          <h2 className="h5"><span className="text-uppercase">Search Result For</span>: <span className="p">{searchuser}</span></h2>
          <h3 className="h5 text-uppercase">Users</h3>

          <Table striped bordered hover size="sm">
            <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            { searchuserR.map( (u, i) =>
                <UserSingle key={u.id} u={u} />
              )}
            </tbody>
          </Table>
        </Jumbotron>
      ) : ''}
    </Container>

);
}