import React, { useEffect, useState } from 'react'
import IndexHeader from 'components/Headers/IndexHeader'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap'
import Select2 from "react-select2-wrapper";
import { fun_formHandlerController, fun_formLogoHandlerController, Fun_isValidController, fun_submitFormHandlerController } from 'views/api_controller/addcompany_controller';
import { errorMessages } from 'utils/common_messages';
import { Fun_NestedTernaryOprator } from 'utils/ternary_function';
import { errorHTML } from 'utils/common_function';
import { AddCompanyApi } from 'apis/CompanyApi/AddCompanyApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setModelT } from 'redux/slice/categorySlice';
import { UpdateCompanyApi } from 'apis/CompanyApi/updateCompanyApi';
import { setPlanId } from 'redux/slice/categorySlice';
import { AddCompanyAdminApi } from 'apis/CompanyApi/AddCompanyAdminApi';
import { GetCompanylist } from 'apis/CompanyApi/getCompanyList';
import { toast } from 'react-toastify';
import { Helmet, HelmetProvider } from 'react-helmet-async';
const AddAdmin = () => {
  const navigate = useNavigate()
  const companyid = useSelector((state) => state.categoryState?.companyid);



  const [filter, setFilter] = useState('')
  const [data, setData] = useState()

  const [name, setName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [adminPhone, setAdminPhone] = useState()
  const [adminWorkPhone, setAdminWorkPhone] = useState()

  const addForm = {
    first_name: name,
    last_name: lastName,
    email: email,
    password: password,
    company_id: filter[0]?.company_id,
    user_type: '2',
    phone_id: adminPhone,
    comm_phone: adminWorkPhone,
  }
  console.log(45, addForm)
  // console.log(39, filter[0]?.company_id)
  const SubmitApi = () => {
    AddCompanyAdminApi(addForm).then((res) => {
      console.log(54, res)
      toast.success('Company Admin Added,Email Sent On Your  Mail');
      navigate('/admin/companies')
    })
  }

  const GetcComany = {
    filter: {
      id: "",
      email: "",
      company_type: "",
      created_at: ""
    },
    limit: 100,
    offset: 0
  }
  useEffect(() => {
    GetCompanylist(GetcComany).then((res) => {
      console.log(59, res)
      console.log(107, res.data.data.data.filter((resp) => resp.email == companyid))
      console.log(60, companyid)
      setFilter(res.data.data.data.filter((resp) => resp.email == companyid))

    })
  }, [])
  // sessionStorage.setItem(67, companyid)

  return (
    <>
      <HelmetProvider >
        <Helmet>
          <title>Admin Companie</title>
        </Helmet>
      </HelmetProvider>
      <IndexHeader />
      <Container className="mt-5" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0"
                  >Add Company Admin</h3>
                </Col>
                {/* <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  Settings
                </Button>
              </Col> */}
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  Company information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-firstname"
                        >
                          First name<span style={{ color: "red" }}>*</span>
                        </label>

                        <Input
                          className="form-control-alternative"
                          name='first_name'

                          id="input-Firstname"
                          placeholder="First name"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        //defaultValue={planId ? planId.short_name : ""}
                        // onChange={(event) => {
                        //   fun_formHandler(event);
                        // }}
                        />
                        {/* {Fun_NestedTernaryOprator(erroraddForm.first_name, errorHTML(erroraddForm.first_name), "")} */}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-lastname"
                        >
                          Last_name <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          name='last_name'
                          //value={setAddForm.last_name}
                          id="input-last_name"
                          placeholder="Last Name"
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}

                        // defaultValue={planId ? planId.short_name : ""}
                        // onChange={(event) => {
                        //   fun_formHandler(event);
                        // }}
                        />
                        {/* {Fun_NestedTernaryOprator(erroraddForm.last_name, errorHTML(erroraddForm.last_name), "")} */}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Phone<span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-Phone"
                          placeholder="Phone"
                          type="Phone"
                          name='Phone'
                          onChange={(e) => setAdminPhone(e.target.value)}

                        // onChange={(event) => {
                        //   fun_formHandler(event);
                        // }}
                        />

                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-password"
                        >
                          Work Phone
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-WorkPhone"
                          placeholder="Work Phone"
                          type="phone"
                          name='WorkPhone'
                          onChange={(e) => setAdminWorkPhone(e.target.value)}

                        />

                      </FormGroup>

                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          email<span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="email"
                          type="email"
                          name='email'
                          onChange={(e) => setEmail(e.target.value)}

                        // onChange={(event) => {
                        //   fun_formHandler(event);
                        // }}
                        />

                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-password"
                        >
                          Password<span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-password"
                          placeholder="password"
                          type="password"
                          name='password'
                          onChange={(e) => setPassword(e.target.value)}

                        />

                      </FormGroup>

                    </Col>
                  </Row>



                  <Button

                    onClick={() => SubmitApi()}
                  >
                    Submit
                  </Button>
                </div>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  )
}

export default AddAdmin