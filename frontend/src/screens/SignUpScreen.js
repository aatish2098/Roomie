import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  InputGroup,
  PopoverHeader,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { validEmail, validPassword } from "./Regex";
import { signup } from "../actions/userActions";

function SignUpScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState("fa fa-eye-slash");
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;

  useEffect(() => {
    if (userInfo) {
      // navigate("/");
    }
    // setMessage("")
  }, [userInfo, error, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      setMessage("Passwords do not match");
      // navigate("/signup");
    } else {
      dispatch(
        signup(username, fname, lname, email, pass1, pass2, dob, gender, phone)
      );
      navigate("/login");
    }
  };

  const showPassword = () => {
    var originalPass = document.getElementById("pass1");
    var confirmedPass = document.getElementById("pass2");
    if (originalPass.type === "password" && confirmedPass.type === "password") {
      originalPass.type = "text";
      confirmedPass.type = "text";
      setShow("fa fa-eye");
    } else {
      originalPass.type = "password";
      confirmedPass.type = "password";
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
                  Sign Up
                </Card.Header>
                <Card.Body>
                  {message === "Check Email to Verify Account" ? (
                    <Message variant="success">{message}</Message>
                  ) : (
                    <></>
                  )}
                  {message && message !== "Check Email to Verify Account" && (
                    <Message variant="danger">{message}</Message>
                  )}
                  {/* {setMessage("")} */}
                  {loading && <Loader />}
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your First Name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Last Name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dob">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Enter Your DOB"
                        value={dob}
                        onChange={(e) => setDOB(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dob">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                      >
                        <option>Choose...</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Prefer not to say</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lname">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="(###) ### - ####"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                          value={pass1}
                          onChange={(e) => setPass1(e.target.value)}
                          id="pass1"
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        {" "}
                        <span>
                          <i className={show}></i>
                        </span>{" "}
                        Confirm Password
                      </Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox onClick={showPassword} />{" "}
                        <Form.Control
                          placeholder="Confirm Your Password"
                          required
                          type="password"
                          value={pass2}
                          onChange={(e) => setPass2(e.target.value)}
                          id="pass2"
                        />
                      </InputGroup>
                    </Form.Group>
                    <br />
                    <div className="d-grid gap-2">
                      <Button className="btn btn-md btn-success" type="submit">
                        Register
                      </Button>
                    </div>
                  </Form>
                  <Row className="py-3">
                    <Col>
                      Already A User?&nbsp;
                      <Link to="/login">Log In Here</Link>
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

export default SignUpScreen;
