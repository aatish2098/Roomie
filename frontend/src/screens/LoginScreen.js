import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";

function LoginScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setpass] = useState("");
  const [show, setShow] = useState("fa fa-eye-slash");

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/listings");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, pass));
  };

  const showPassword = () => {
    var pword = document.getElementById("pass");
    if (pword.type === "password") {
      pword.type = "text";
      setShow("fa fa-eye");
    } else {
      pword.type = "password";
      setShow("fa fa-eye-slash");
    }
  };

  return (
    <div>
      <div>
        <Container className="mb-5 mt-5">
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <Card>
                <Card.Header
                  as="h3"
                  className="text-center bg-black text-light"
                >
                  Log In
                </Card.Header>
                <Card.Body>
                  {error && <Message variant="danger">{error}</Message>}
                  {loading && <Loader />}
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>
                        <span>
                          <i className="fa-solid fa-envelope"></i>
                        </span>
                        &nbsp;Username
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        {" "}
                        <span>
                          <i className={show}></i>
                        </span>{" "}
                        &nbsp;Password
                      </Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox onClick={showPassword} />{" "}
                        <Form.Control
                          placeholder="Enter Your Password"
                          required
                          type="password"
                          value={pass}
                          onChange={(e) => setpass(e.target.value)}
                          id="pass"
                        />
                      </InputGroup>
                    </Form.Group>
                    <br />
                    <div className="d-grid gap-2">
                      <Button className="btn btn-md btn-success" type="submit">
                        Submit
                      </Button>
                    </div>
                  </Form>
                  <Row className="py-3">
                    <Col>
                      Not a User?&nbsp;
                      <Link to="/signup">Register Now</Link>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LoginScreen;
