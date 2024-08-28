import { VarifyTokenAPI } from "apis/VarifyToken";
import { LoginAPI } from "apis/loginApi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
} from "reactstrap";
import { errorHTML } from "utils/common_function";
import { errorMessages } from "utils/common_messages";
import { Fun_NestedTernaryOprator } from "utils/ternary_function";
import { isValidEmail } from "utils/validation";
import { Fun_subInputHandler, Fun_submitHandlerController, Fun_subValid } from "views/api_controller/signin_controller";

import AuthFooter from "../components/Footers/AdminFooter";

const LoginPage = () => {


  const params = useParams()
  console.log(29, params)
  const navigate = useNavigate();
  const [formstate, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const DataLogin = {
  //   email: email,
  //   password: password
  // };
  // const submitLogin = () => {
  //   LoginAPI(DataLogin).then((res) => {
  //     console.log(555, res)
  //     localStorage.setItem("token", res.data.data.token);
  //     // Fun_submitHandlerController({ Fun_isValid, formstate, navigate, toast })
  //     navigate("/HHHH")
  //   })
  //     .catch((res) => {
  //       navigate("/NotWorking")
  //       console.log(49, res);
  //     });
  // };


  // ########## to handle user inputs 
  const Fun_inputHandler = (e) => {
    Fun_subInputHandler({ e, setError, setFormState, error })
  };

  //  ######### Validation of sigin
  const Fun_isValid = () => {
    const { email, password } = formstate;
    const errorMsg = {
      email: "", password: "",
    };
    return Fun_subValid({ email, password, isValidEmail, errorMsg, errorMessages, setError })
  };

  const submitLogin = async (e) => {
    e.preventDefault()
    await VarifyTokenAPI({ Fun_isValid, formstate, navigate, toast }).then((res) => {
      console.log(68, res)
    })
    Fun_submitHandlerController({ Fun_isValid, formstate, navigate, toast })
    VarifyTokenAPI().then((res) => {

    })
  }

  return (
    <>
      <div className="main-content" >
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                  <p className="text-lead text-light">
                    Use these awesome forms to login or create new account in
                    your project for free.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-3">
                    <small>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="btn-inner--icon">
                        {/* <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  /> */}
                      </span>
                      <span className="btn-inner--text">Github</span>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="btn-inner--icon">
                        {/* <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  /> */}
                      </span>
                      <span className="btn-inner--text">Google</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup
                        className={Fun_NestedTernaryOprator(error.email, "input-group-alternative-error", "input-group-alternative")}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          autoComplete="new-email"
                          name="email"
                          // onChange={(e) => setEmail(e.target.value)}
                          onChange={(event) => {
                            Fun_inputHandler(event);
                          }}
                        />
                      </InputGroup>
                      {Fun_NestedTernaryOprator(error.email, errorHTML(error.email), "")}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup
                        className={Fun_NestedTernaryOprator(error.password, "input-group-alternative-error", "input-group-alternative")}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                          name="password"
                          // onChange={(e) => setPassword(e.target.value)}
                          onChange={(event) => {
                            Fun_inputHandler(event);
                          }}
                        />
                      </InputGroup>
                      {Fun_NestedTernaryOprator(error.password, errorHTML(error.password), "")}
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <Button className="my-4" color="primary" type="submit" onClick={submitLogin}>
                        Sign in
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    // href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    // href="#pablo"
                    onClick={() =>
                      navigate('/auth/register')
                    }
                  >
                    <small>Create new account</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <AuthFooter /> */}
    </>
  )
}

export default LoginPage