
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"; import {
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

import { Fun_subInputHandler, Fun_submitHandlerController, Fun_subValid } from "views/api_controller/signin_controller";
import { errorHTML } from "utils/common_function";
import { errorMessages } from "utils/common_messages";
import { Fun_NestedTernaryOprator } from "utils/ternary_function";
import { isValidEmail } from "utils/validation";
import { ForgetAPI } from "apis/ForgetPasswordApi";
import { ResatePasswordAPI } from "apis/ResatePassword";

const SetPassword = () => {

  const params = useParams()
  // console.log(222, params.token)
  const jwt = ('bearer ' + params.token)
  console.log(30, jwt)


  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resateData = {
    token: jwt,
    password: password
  }
  console.log(47, resateData)



  const submitLogin = async (e) => {
    e.preventDefault()
    ResatePasswordAPI(resateData).then((res) => {
      console.log(49, res)
      if (res.status == 200) {
        navigate('/auth/login')
        toast.success('Password has been changed successfully')
      } else {

      }
    })

  }
  return (
    <>
      <Col lg="5" md="7">

        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 ">
              <h1>Enter You Password</h1>
            </div>

          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
      <small>Or sign in with credentials</small>
    </div> */}
            <Form role="form">
              <FormGroup>
                <InputGroup

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
                    onChange={(e) => setPassword(e.target.value)}


                  />
                  <i
                    className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer', marginTop: "4%" }}
                  />
                </InputGroup>

              </FormGroup>



              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" onClick={submitLogin}>
                  submit
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>



      </Col>
    </>
  )
}

export default SetPassword