import { Visibility, VisibilityOff } from "@mui/icons-material";
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
} from "reactstrap";
import { errorHTML } from "utils/common_function";
import { errorMessages } from "utils/common_messages";
import { Fun_NestedTernaryOprator } from "utils/ternary_function";
import { isValidEmail } from "utils/validation";
import { Fun_subInputHandler, Fun_submitHandlerController, Fun_subValid } from "views/api_controller/signin_controller";
const Login = () => {
  const params = useParams()
  console.log(28, params.token)
  const jwt = ('bearer ' + params.token)
  // const myBest = JWT.slice(37, JWT.length);;
  console.log(30, jwt)

  const navigate = useNavigate();
  const [formstate, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [email, setEmail] = useState();

  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



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
    const timer = setTimeout(() => {

      if (localStorage.getItem('_token') == null && params.token != undefined || null) {
        VarifyTokenAPI(jwt).then((res) => {
          console.log(68, res)
          toast.success('Your Mail is verified ')
          navigate("/admin/index")
        })
      }
      else if (localStorage.getItem('_token') == null && params.token == undefined || null) {
        Fun_submitHandlerController({ Fun_isValid, formstate, navigate, toast });
        const MyTimeout = setTimeout(() => {

          if (!Fun_isValid) {
            toast.error('Please enter all field');
          }
          else if (!localStorage.getItem('_token')) {
            toast.error('Invalid credentials');

            // } else
            //   if (!localStorage.getItem('_token')) {
            //     toast.error('Your Mail is not verified. Please Verify It');
            //   } 

          }
        }, 1500)


        return () => clearTimeout(MyTimeout)
      }
    }, 2000);
    return () => clearTimeout(timer);
  }




  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 ">
              <h1>Sign In</h1>
            </div>
            {/* <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
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
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div> */}
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div> */}
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
                    type={showPassword ? 'text' : 'password'}

                    autoComplete="new-password"
                    name="password"
                    // onChange={(e) => setPassword(e.target.value)}
                    onChange={(event) => {
                      Fun_inputHandler(event);
                    }}

                  />
                  <i
                    className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer', marginTop: "4%" }}
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
              onClick={(e) =>
                navigate('/auth/ForgetPassword')
              }
              style={{ cursor: "pointer" }}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            {/* <a
              className="text-light"
              // href="#pablo"
              onClick={() =>
                navigate('/auth/register')
              }
            >
              <small>Create new account</small>
            </a> */}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
