import React, { useEffect, useState } from 'react'
import IndexHeader from 'components/Headers/IndexHeader'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, Row } from 'reactstrap'
import Select2 from "react-select2-wrapper";
import { Fun_NestedTernaryOprator } from 'utils/ternary_function';
import { errorHTML } from 'utils/common_function';
import { fun_formStaffHandlerController, fun_submitFormStaffHandlerController, Fun_isValidStaffController } from 'views/api_controller/addcompanystaff_controller';
import { errorMessages } from 'utils/common_messages';
import { AddCompanyStaffApi } from 'apis/CompanyApi/CompanyStaff/AddCompanyStaff';
import { useNavigate } from 'react-router-dom';
import { GetAllRole } from 'apis/RolesApi/getAllRole';
import { toast } from 'react-toastify';
import { GetAllGateList } from 'apis/Gates/getAllGateList';
import { MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';


const AddCompanyStaff = () => {
  const companyid = useSelector((state) => state.categoryState?.companyid);

  const navigate = useNavigate()
  const [allData, setAllData] = useState('');
  const [allGateCA, setAllGataCA] = useState()

  const [firstName, setFristName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [workPhoneStaf, setWorkPhoneStaf] = useState()

  const [password, setPassword] = useState()
  const [selectedCompanyStaff, setSelectedCompanyStaff] = useState([]);
  const [roleNameDrop, setRoleNameDrop] = useState('');
  console.log(43, companyid)


  const handleCheckboxChange = (value) => {
    if (selectedCompanyStaff.includes(value)) {
      setSelectedCompanyStaff(selectedCompanyStaff.filter((company) => company !== value));
    } else {
      setSelectedCompanyStaff([...selectedCompanyStaff, value]);
    }
  };
  console.log(41, selectedCompanyStaff)


  const addForm = {
    company_id: companyid ? companyid.company_id : "",
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    phone_id: phone,
    gate_id: selectedCompanyStaff,
    role_id: roleNameDrop,
    comm_phone: workPhoneStaf,
  }
  const [erroraddForm, setErrorAddForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    gate_id: "",
  })

  console.log(61, addForm)
  /** ## onChange form handel */
  // const fun_formHandler = (e) => {
  //   fun_formStaffHandlerController({ e, setAddForm, setErrorAddForm })
  // }

  const Fun_isValid = () => {
    return Fun_isValidStaffController({ addForm, erroraddForm, setErrorAddForm, errorMessages })
  };

  /** ### Form submit handeler */
  const fun_submitFormHandler = (e) => {
    e.preventDefault()
    console.log(35, addForm)
    fun_submitFormStaffHandlerController({ Fun_isValid })

    AddCompanyStaffApi(addForm).then((res) => {
      console.log(77, res)
      // navigate('/admin/companies/staff/:cid')
      if (res.status == 200) {
        navigate('/admin/companies/staff/:cid')
        toast.success('Company Staff Created');
      }
      else {
        navigate('/admin/companies/staff/addstaff')
        toast.error('kindly fill all the field');


      }
      //  console.log(48, res.data.error.message)
      // toast.success(res.data.error.message);

    })
  }

  useEffect(() => {
    GetAllRole().then((res) => {
      console.log(102, res.data.data)
      console.log(30, res.data.data.filter((resp) => resp.status == !true ? false : true))

      setAllData(res.data.data.filter((resp) => resp.status == !true ? false : true))
    })

    GetAllGateList().then((res) => {
      console.log(266, res.data.data)
      setAllGataCA(res.data.data)
    })
  }, [])


  return (
    <>
      <IndexHeader />
      <Container className="mt-5" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Add Company Staff</h3>
                </Col>
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
                          htmlFor="input-first-name"
                        >
                          First Name
                        </label>
                        <Input
                          className="form-control-alternative"
                          name='first_name'

                          placeholder="First name"
                          type="text"
                          onChange={(e) => setFristName(e.target.value)}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.first_name, errorHTML(erroraddForm.first_name), "")}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Last name
                        </label>
                        <Input
                          className="form-control-alternative"
                          name='last_name'

                          id="input-lastname"
                          placeholder="Last name"
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.last_name, errorHTML(erroraddForm.last_name), "")}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Email
                        </label>
                        <Input
                          className="form-control-alternative"
                          name='email'

                          id="input-email"
                          placeholder="Email"
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.email, errorHTML(erroraddForm.email), "")}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-password"
                        >
                          Password
                        </label>
                        <Input
                          className="form-control-alternative"
                          name='password'
                          // value={addForm.password}
                          id="input-password"
                          placeholder="Password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.password, errorHTML(erroraddForm.password), "")}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-phone"
                        >
                          Phone
                        </label>
                        <Input
                          className="form-control-alternative"
                          name='phone'
                          // value={addForm.phone}
                          id="input-phone"
                          placeholder="Phone"
                          type="text"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.phone, errorHTML(erroraddForm.phone), "")}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-gate"
                        >
                          Gate
                        </label>
                        <Select
                          name='gate_id'
                          // value={addForm.gate_id}
                          // onChange={(event) => {
                          //   fun_formHandler(event);
                          // }}
                          multiple
                          value={selectedCompanyStaff}
                          onChange={(e) => setSelectedCompanyStaff(e.target.value)}

                          className="form-control"
                        // onChange={(e) => setCountryOption(e.target.value)}

                        >
                          {allGateCA &&
                            allGateCA.map((res) => (
                              <MenuItem
                                key={res.gate_id}
                                id={res.ename}
                                value={res.gate_id}
                                checked={selectedCompanyStaff.includes(res.gate_id)}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedCompanyStaff.includes(res.gate_id)}
                                  onChange={() => handleCheckboxChange(res.gate_id)}
                                />
                                {res.ename}
                              </MenuItem>
                            ))}




                        </Select>

                        {/* <Select2
                          name='gate_id'

                          onChange={(e) => setGateID(e.target.value)}
                          className="form-control"
                          options={{
                            placeholder: "Select"
                          }}
                          data={[
                            { id: "6fb16c7e-dafa-4fc4-966c-bb53fccccd88", text: "Alerts" },

                          ]}
                        /> */}
                        {Fun_NestedTernaryOprator(erroraddForm.gate_id, errorHTML(erroraddForm.gate_id), "")}
                      </FormGroup>
                    </Col>

                    {/* <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-status"
                        >
                          Status
                        </label>
                        <select
                          name='status'
                          //value={addForm.status}

                          className='form-control input-group-alternative'
                        >
                          <option value="1">Active</option>
                          <option value="2">InActive</option>
                        </select>
                        {Fun_NestedTernaryOprator(erroraddForm.status, errorHTML(erroraddForm.status), "")}
                      </FormGroup>


                    </Col> */}
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-status"
                        >
                          Roles
                        </label>
                        <InputGroup className="input-group-alternative  "
                        >
                          <select className='form-control'

                            onChange={(e) => setRoleNameDrop(e.target.value)}
                          >
                            {allData && allData.map((res) => {

                              console.log(723, res)
                              return (<>
                                <option

                                  value={res.id}
                                >{res.name}</option>
                              </>)
                            })}

                          </select>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-phone"
                        >
                          Work Phone
                        </label>
                        <Input
                          className="form-control-alternative"
                          name='WorkPhone'
                          // value={addForm.phone}
                          id="input-phone"
                          placeholder="WorkPhone"
                          type="text"
                          onChange={(e) => setWorkPhoneStaf(e.target.value)}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.WorkPhone, errorHTML(erroraddForm.WorkPhone), "")}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button onClick={fun_submitFormHandler} color="primary" type="submit">
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

export default AddCompanyStaff