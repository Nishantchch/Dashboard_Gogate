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



const ForgetPassword = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState();


  const data = {
    email: email
  }

  const submitLogin = async (e) => {
    e.preventDefault()
    ForgetAPI(data).then((res) => {
      console.log(51, res)
      if (res.status == 200) {
        // navigate('/auth/setPassword')
        toast.success('Check Your Mail')

      }
      else {
        toast.error('Mail Not Send')
      }
    })

  }

  return (
    <>

      <Col lg="5" md="7">

        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 ">
              <h1>Enter Your Mail</h1>
            </div>

          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
          <small>Or sign in with credentials</small>
        </div> */}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup

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
                    onChange={(e) => setEmail(e.target.value)}

                  />
                </InputGroup>

              </FormGroup>




              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" onClick={submitLogin}>
                  sent
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>



      </Col></>
  )
}

export default ForgetPassword