import React, { useEffect, useState } from 'react'
import IndexHeader from 'components/Headers/IndexHeader'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
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
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GetCountriesApi } from 'apis/CountrieApi/getCountrie';
import { GetCompanylist } from 'apis/CompanyApi/getCompanyList';
import { GetCompanyType } from 'apis/CompanyApi/ComapnyType';
import { MenuItem, Select } from '@mui/material';
import { GetAllGateList } from 'apis/Gates/getAllGateList';
import { SuperAdminGateListApi } from 'apis/Gates/SuperAdminGateList';

const UpdateCompany = () => {
  const params = useParams()
  // const RoleId = parseInt(params.id)
  console.log(17, params)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const companyid = useSelector((state) => state.categoryState?.companyid);
  
  const planId = useSelector((state) => state.categoryState?.planId);
  console.log(23, planId)

  const [addStatus, setAddStatus] = useState()
  const [country, setCountry] = useState()
  const [companyType, setCompanyType] = useState()

  const [getData, setGetData] = useState()
  const [showMap, setShowMap] = useState(false);
  const [modalTypeMap, setModalTypeMap] = useState('');
  const handleModalClosed = () => {
    setModalTypeMap();
  };
  const [leti, setLeti] = useState(25.276987)
  const [lon, setLon] = useState(55.296249)
  const zoom = 16; // 15 is ideal

  console.log(112, leti)
  const map = () => {

    setLeti(25.276987)
    setLon(55.296249)
    localStorage.setItem('latitude', 25.276987)
    localStorage.setItem('long', 55.296249)

    // navigator.geolocation.getCurrentPosition((location) => {
    //   setLeti(location.coords.latitude)
    //   setLon(location.coords.longitude)
    //   localStorage.setItem('latitude', location.coords.latitude)
    //   localStorage.setItem('longitude', location.coords.longitude)

    // })
  };
  const remove = () => {

    localStorage.removeItem('latitude');
    localStorage.removeItem('long');

  }

  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const handleCheckboxChange = (value) => {
    if (selectedCompanies.includes(value)) {
      setSelectedCompanies(selectedCompanies.filter((company) => company !== value));
    } else {
      setSelectedCompanies([...selectedCompanies, value]);
    }
  };
  console.log(112, leti)


  console.log(31, getData)
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

  const [gateData, setGateData] = useState()
  const [superGateData, setSuperGateData] = useState()

  useEffect(() => {
    GetCountriesApi().then((res) => {
      console.log(44, res.data.data.rows)
      setCountry(res.data.data.rows)
    })
    GetCompanylist(GetcComany).then((res) => {
      console.log(62, res.data.data.data.filter((resp) => resp.company_id == companyid))
      setGetData(res.data.data.data.filter((resp) => resp.company_id == companyid))
    })

    GetCompanyType().then((res) => {
      console.log(58, res.data.data.rows
        .filter((resp) => resp.companyType == companyid)
      )
      setCompanyType(res.data.data.rows)
      console.log(588, companyid)
    })

    GetAllGateList().then((res) => {
      console.log(26, res.data.data)
      setGateData(res.data.data)
    })
    SuperAdminGateListApi().then((res) => {
      console.log(254, res.data.data)
      setSuperGateData(res.data.data)
    })

  }, [])



  const [shortNameUpdate, setShortNameUpdate] = useState();
  const [anameUpdate, setAnameUpdate] = useState();
  const [enameUpdate, setEnameUpdate] = useState();
  const [phoneUpdate, setPhoneUpdate] = useState();
  const [emailUpdate, setEmailUpdate] = useState();
  const [countryOptionUpdate, setCountryOptionUpdate] = useState()
  const [logoUpdate, setLogoUpdate] = useState();
  const [crUpdate, setCrUpdate] = useState();
  const [companyTypeId, setCompanyTypeId] = useState();
  const [long, setLong] = useState();
  const [lat, setLet] = useState();
  const [workPhoneUpdate, setWorkPhoneUpdate] = useState();

  const addForm = {

    id: companyid ? companyid : "",
    short_name: shortNameUpdate == undefined ? (getData || [])[0]?.short_name : shortNameUpdate,
    aname: anameUpdate == undefined ? (getData || [])[0]?.aname : anameUpdate,
    ename: enameUpdate == undefined ? (getData || [])[0]?.ename : enameUpdate,
    phone: phoneUpdate == undefined ? (getData || [])[0]?.phone : phoneUpdate,
    email: emailUpdate == undefined ? (getData || [])[0]?.email : emailUpdate,
    countries_id: countryOptionUpdate,
    logo: logoUpdate,
    long: localStorage.getItem('long'),
    lat: localStorage.getItem('latitude'),
    company_type_id: companyTypeId,
    gate_id: selectedCompanies,
    cr: crUpdate == undefined ? (getData || [])[0]?.cr : crUpdate,
    work_phone: workPhoneUpdate == undefined ? (getData || [])[0]?.work_phone : workPhoneUpdate,
  }
  console.log(157, addForm)
  // const [addForm, setAddForm] = useState({

  //   id: companyid ? companyid : "",
  //   short_name: planId ? planId.short_name : "",
  //   aname: planId ? planId.aname : "",
  //   ename: planId ? planId.ename : "",
  //   phone: planId ? planId.phone : "",
  //   email: planId ? planId.email : "",
  //   countries_id: planId ? planId.countries_id : "",
  //   logo: planId ? planId.logo : "",
  //   long: localStorage.getItem('long'),
  //   lat: localStorage.getItem('latitude'),
  //   company_type_id: planId ? planId.companyType.ename : "",
  //   cr: planId ? planId.cr : ""
  // })
  const [erroraddForm, setErrorAddForm] = useState({
    short_name: "",
    aname: "",
    ename: "",
    phone: "",
    email: "",
    countries_id: "",
    logo: "",
    long: "",
    lat: "",
    company_type_id: "",

  })

  console.log(59, addForm)

  const fun_formHandler = (e) => {
    fun_formHandlerController({ e, setErrorAddForm })
  }
  // const fun_formLogoHandler = (e) => {
  //   fun_formLogoHandlerController({ e })
  // }
  const Fun_isValid = () => {


    return Fun_isValidController({ addForm, erroraddForm, setErrorAddForm, errorMessages })
  };

  const fun_submitFormHandler = (e) => {
    e.preventDefault()
    fun_submitFormHandlerController({ Fun_isValid })
    // resp.status == !true ? false : true
    UpdateCompanyApi(addForm).then((res) => {
      console.log(80, res)
      navigate('/admin/companies')
      remove()
    })

  }




  return (
    <>
      <HelmetProvider >
        <Helmet>
          <title>Company-Update</title>
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
                  >Update Company</h3>
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
                          htmlFor="input-shortname"
                        >
                          Short name
                        </label>

                        <Input
                          className="form-control-alternative"
                          name='short_name'
                          //value={addForm.short_name}
                          id="input-shortname"
                          placeholder="Short name"
                          type="text"
                          defaultValue={planId.short_name}
                          onChange={(e) => {
                            setShortNameUpdate(e.target.value);
                          }}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.short_name, errorHTML(erroraddForm.short_name), "")}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-arabicname"
                        >
                          Arabic name
                        </label>
                        <Input
                          className="form-control-alternative"
                          name='aname'
                          // value={addForm.aname}
                          id="input-arabicname"
                          // placeholder="Arabic name"
                          type="text"
                          defaultValue={planId ? planId.aname : ""}
                          onChange={(e) => {
                            setAnameUpdate(e.target.value);
                          }}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.aname, errorHTML(erroraddForm.aname), "")}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-name"
                        >
                          Name
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-name"
                          placeholder="Name"
                          type="text"
                          name='ename'
                          //value={addForm.ename}
                          defaultValue={planId ? planId.ename : ""}
                          onChange={(e) => {
                            setEnameUpdate(e.target.value);
                          }}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.ename, errorHTML(erroraddForm.ename), "")}
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
                          id="input-phone"
                          placeholder="Phone"
                          type="text"
                          name='phone'
                          defaultValue={planId ? planId.phone : ""}
                          onChange={(e) => {
                            setPhoneUpdate(e.target.value);
                          }}
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
                          Email
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Email"
                          type="email"
                          name='email'
                          defaultValue={planId.email}
                          onChange={(e) => {
                            setEmailUpdate(e.target.value);
                          }}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.email, errorHTML(erroraddForm.email), "")}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Country
                        </label>
                        <select
                          name='countries_id'
                          defaultValue={planId ? planId.countries_id : ""}
                          onChange={(e) => {
                            setCountryOptionUpdate(e.target.value);
                          }}
                          // defaultValue={}
                          className="form-control"
                        >

                          {country && country.map((res) => {
                            console.log(441, res)
                            return (<>
                              <option
                                value={res.id}
                              >{res.e_name}</option>
                            </>)
                          })}
                        </select>
                        {Fun_NestedTernaryOprator(erroraddForm.countries_id, errorHTML(erroraddForm.countries_id), "")}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
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
                          value={addForm.status}
                          onChange={(event) => {
                            setAddStatus(event);
                          }}
                          className='form-control input-group-alternative'
                        >
                          <option value="1">true</option>
                          <option value="2">false</option>
                        </select>

                      </FormGroup>
                    </Col> */}
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-logo"
                        >
                          Logo
                        </label>
                        <Input
                          className="form-control"
                          id="input-name"
                          placeholder="Name"
                          type="file"
                          name='logo'
                          // value={addForm.logo}
                          // ref={addForm.logo.fileInput}
                          // onChange={(event) => {
                          //   fun_formLogoHandler(event.target.files[0]);
                          // }}

                          onChange={(e) => {
                            setLogoUpdate(e.target.value);
                          }}

                        />
                      </FormGroup>
                    </Col>

                    {localStorage.getItem('_role') == 'SuperAdmin' ? (
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Admin Gate
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <Select
                            name='gate_id'
                            // value={addForm.gate_id}
                            // onChange={(event) => {
                            //   fun_formHandler(event);
                            // }}
                            multiple
                            value={selectedCompanies}
                            onChange={(e) => setSelectedCompanies(e.target.value)}

                            className="form-control"
                          // onChange={(e) => setCountryOption(e.target.value)}

                          >
                            {superGateData &&
                              superGateData.map((res) => (
                                <MenuItem
                                  key={res.gate_id}
                                  id={res.ename}
                                  value={res.gate_id}
                                  checked={selectedCompanies.includes(res.gate_id)}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedCompanies.includes(res.gate_id)}
                                    onChange={() => handleCheckboxChange(res.gate_id)}
                                  />
                                  {res.ename}
                                </MenuItem>
                              ))}




                          </Select>
                          {Fun_NestedTernaryOprator(erroraddForm.gate_id, errorHTML(erroraddForm.gate_id), "")}
                        </FormGroup>


                      </Col>
                    ) : (
                      <>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Company Gate <span style={{ color: "red" }}>*</span>
                            </label>
                            <Select
                              name='gate_id'
                              // value={addForm.gate_id}
                              // onChange={(event) => {
                              //   fun_formHandler(event);
                              // }}
                              multiple
                              value={selectedCompanies}
                              onChange={(e) => setSelectedCompanies(e.target.value)}

                              className="form-control"
                            // onChange={(e) => setCountryOption(e.target.value)}

                            >
                              {gateData &&
                                gateData.map((res) => (
                                  <MenuItem
                                    key={res.gate_id}
                                    id={res.ename}
                                    value={res.gate_id}
                                    checked={selectedCompanies.includes(res.gate_id)}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedCompanies.includes(res.gate_id)}
                                      onChange={() => handleCheckboxChange(res.gate_id)}
                                    />
                                    {res.ename}
                                  </MenuItem>
                                ))}




                            </Select>
                            {Fun_NestedTernaryOprator(erroraddForm.gate_id, errorHTML(erroraddForm.gate_id), "")}
                          </FormGroup>


                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Admin Gate
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <Select
                              name='gate_id'
                              // value={addForm.gate_id}
                              // onChange={(event) => {
                              //   fun_formHandler(event);
                              // }}
                              multiple
                              value={selectedCompanies}
                              onChange={(e) => setSelectedCompanies(e.target.value)}

                              className="form-control"
                            // onChange={(e) => setCountryOption(e.target.value)}

                            >
                              {superGateData &&
                                superGateData.map((res) => (
                                  <MenuItem
                                    key={res.gate_id}
                                    id={res.ename}
                                    value={res.gate_id}
                                    checked={selectedCompanies.includes(res.gate_id)}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedCompanies.includes(res.gate_id)}
                                      onChange={() => handleCheckboxChange(res.gate_id)}
                                    />
                                    {res.ename}
                                  </MenuItem>
                                ))}




                            </Select>
                            {Fun_NestedTernaryOprator(erroraddForm.gate_id, errorHTML(erroraddForm.gate_id), "")}
                          </FormGroup>


                        </Col>
                      </>
                    )}

                  </Row>
                  <Row>

                    <Col lg="6">
                      <FormGroup
                        onClick={() => {

                          setShowMap(!showMap);
                        }}
                      >
                        <label
                          style={{ cursor: "pointer" }}
                          className="form-control-label"
                          htmlFor="input-Lat"

                        >
                          Latitude
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-lat"
                          placeholder="Lat"
                          type="text"
                          name='lat'
                          defaultValue={localStorage.getItem('latitude')}
                          onChange={(e) => setLet(e.target.value)}
                        />

                        {Fun_NestedTernaryOprator(erroraddForm.lat, errorHTML(erroraddForm.lat), "")}
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-long"
                        >
                          Long
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-long"
                          placeholder="Long"
                          type="text"
                          name='long'
                          defaultValue={localStorage.getItem('long')}
                          onChange={(e) => setLong(e.target.value)}
                        />
                        {Fun_NestedTernaryOprator(erroraddForm.long, errorHTML(erroraddForm.long), "")}
                      </FormGroup>
                    </Col>


                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-companytype"
                        >
                          Company Type
                        </label>
                        <select
                          className="form-control"
                          name='company_type_id'
                          // value={addForm.company_type_id}

                          onChange={(e) => setCompanyTypeId(e.target.value)}
                        >
                          {companyType && companyType.map((res) => {
                            return (<>
                              <option
                                value={res.id}
                              >{res.ename}</option>

                            </>)
                          })}

                        </select>
                        {Fun_NestedTernaryOprator(erroraddForm.company_type_id, errorHTML(erroraddForm.company_type_id), "")}
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-companytype"
                        >
                          Company Registration<span style={{ color: "red" }}>*</span>
                        </label>

                        <Input
                          className="form-control"
                          id="input-name"
                          placeholder="Company Registration"
                          type="text"
                          name="cr"
                          defaultValue={planId ? planId.cr : ""}
                          onChange={(e) => setCrUpdate(e.target.value)} />
                        {Fun_NestedTernaryOprator(erroraddForm.cr, errorHTML(erroraddForm.Cr), "")}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-companytype"
                        >
                          Work Phone<span style={{ color: "red" }}>*</span>
                        </label>

                        <Input
                          className="form-control"
                          id="input-name"
                          placeholder="Work Phone"
                          type="text"
                          name="workPhone"
                          defaultValue={planId ? planId.work_phone : ""}
                          onChange={(e) => {
                            setWorkPhoneUpdate(e.target.value);
                          }} />
                        {Fun_NestedTernaryOprator(erroraddForm.WorkPhone, errorHTML(erroraddForm.WorkPhone), "")}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button
                    onClick={fun_submitFormHandler}
                    color="primary" type="submit">
                    Update
                  </Button>
                </div>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>


      <Modal
        isOpen={showMap}
        onClosed={handleModalClosed}
        toggle={() => setShowMap(!showMap)}
        className="modal-dialog-centered modal-lg"
      >
        {/* <ModalHeader
          className="bg-transparent"
          toggle={() => setShowMap(!showMap)}
        ></ModalHeader> */}
        <ModalBody >

          <Row>

            <div className="col">
              <Card className="shadow border-0" style={{ marginTop: "-2%" }}>
                <Row >

                  <Button className=" mb-3 ml-3"
                    id='tooltip969372949'
                    color="neutral"
                    href={() => false}
                    onClick={() => {
                      map();
                      setShowMap(!showMap)
                    }}

                    size="sm"

                  >
                    <span className='mr-2'>
                      <i className="fas fa-user" />
                    </span>
                    <span className='btn-inner--text'

                    >Select</span>
                  </Button>




                </Row>

                {/* <MapWrapper /> */}
                <iframe
                  src={` https://maps.google.com/maps?q=${leti},${lon}&z=${zoom}&output=embed`}
                  id="map"
                  animation='google.maps.Animation.DROP'
                  title='data.title'
                  height='500px'></iframe>
                {/* <iframe



                height="500px"

                src={`https://maps.google.com/maps?q=${leti},${lon}&z=${zoom}&output=embed`}





                loading="lazy"

                referrerPolicy="no-referrer-when-downgrade"

                title="google map"



              ></iframe> */}
              </Card>
            </div>
          </Row>
        </ModalBody>
      </Modal >
    </>)
}

export default UpdateCompany