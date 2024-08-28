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
import { setPlanId } from 'redux/slice/categorySlice';
import { setCompanyid } from 'redux/slice/categorySlice';
import { GetCountriesApi } from 'apis/CountrieApi/getCountrie';
import { toast } from 'react-toastify';
import { MenuItem, OutlinedInput, Select } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GetCompanyType } from 'apis/CompanyApi/ComapnyType';
import { GetAllGateList } from 'apis/Gates/getAllGateList';
import { SuperAdminGateListApi } from 'apis/Gates/SuperAdminGateList';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';

const AddCompany = () => {
  const params = useParams()
  // const RoleId = parseInt(params.id)

  const [value, setValue] = useState('1');
  const handleChange1 = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  console.log(17, params)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const companyid = useSelector((state) => state.categoryState?.companyid);
  const planId = useSelector((state) => state.categoryState?.planId);
  console.log(23, companyid)



  const [image, setImage] = useState()

  const [showMap, setShowMap] = useState(false);
  const [modalTypeMap, setModalTypeMap] = useState('');
  const handleModalClosed = () => {
    setModalTypeMap();
  };

  // const onReset = () => {
  //   setShowEdit(!showEdit);

  // };

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
  // const remove = () => {

  //   localStorage.removeItem('latitude');
  //   localStorage.removeItem('latitude');

  // }
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((location) => {
  //     setLeti(location.coords.latitude)
  //     setLon(location.coords.longitude)
  //     localStorage.setItem('latitude', location.coords.latitude)
  //     localStorage.setItem('longitude', location.coords.longitude)

  //   })

  // }, [])



  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const handleCheckboxChange = (value) => {
    if (selectedCompanies.includes(value)) {
      setSelectedCompanies(selectedCompanies.filter((company) => company !== value));
    } else {
      setSelectedCompanies([...selectedCompanies, value]);
    }
  };
  console.log(41, selectedCompanies)
  const getdata = {
    gate_id: selectedCompanies,

  }

  const [shortName, setShortName] = useState();
  const [aname, setAname] = useState();
  const [ename, setEname] = useState();
  const [phone, setPhone] = useState();
  const [workPhone, setWorkPhone] = useState();

  const [email, setEmail] = useState();
  const [countryOption, setCountryOption] = useState()
  const [logo, setLogo] = useState();
  const [cr, setCr] = useState();

  // const [gateId, setGateId] = useState();
  const [long, setLong] = useState();
  const [lat, setLet] = useState();
  const [companyTypeId, setCompanyTypeId] = useState();

  const addForm = {

    short_name: shortName,
    aname: aname,
    ename: ename,
    phone: phone,
    email: email,
    countries_id: countryOption,
    logo: logo,
    long: localStorage.getItem('long'),
    lat: localStorage.getItem('latitude'),
    company_type_id: companyTypeId,
    gate_id: selectedCompanies,
    cr: cr,
    work_phone: workPhone,

  }
  // console.log(44, logoData)
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
    gate_id: '',

  })

  console.log(58, addForm)

  // const fun_formHandler = (e) => {
  //   fun_formHandlerController({ e, addForm, setErrorAddForm })
  // }
  // const fun_formLogoHandler = (e) => {
  //   fun_formLogoHandlerController({ e, addForm })
  // }
  const Fun_isValid = () => {


    return Fun_isValidController({ addForm, erroraddForm, setErrorAddForm, errorMessages })
  };

  const fun_submitFormHandler = (e) => {
    e.preventDefault()
    fun_submitFormHandlerController({ Fun_isValid })
    // resp.status == !true ? false : true

    dispatch(setCompanyid(addForm.email))

    AddCompanyApi(addForm, getdata).then((res) => {
      console.log(54, res)
      remove()
      // navigate('/admin/companies/addadmin')

      if (res.status == 200) {
        navigate('/admin/companies/addadmin')
        toast.success('Company Created');
      }
      else {
        navigate('/admin/companies/addcompany')
        toast.error('kindly fill all the field');
        remove()

      }
    })
  }

  const fun_submit = (e) => {
    e.preventDefault()
    fun_submitFormHandlerController({ Fun_isValid })
    // resp.status == !true ? false : true

    AddCompanyApi(addForm).then((res) => {
      console.log(128, res)
      remove()

      if (res.status == 200) {
        navigate('/admin/companies')
        toast.success('Company Created');
      }
      else {
        navigate('/admin/companies/addcompany')
        toast.error('kindly fill all the field');
        remove()

      }
    })
  }

  const [country, setCountry] = useState()
  const [companyType, setCompanyType] = useState()
  const [gateData, setGateData] = useState()
  const [superGateData, setSuperGateData] = useState()

  useEffect(() => {
    GetCountriesApi().then((res) => {

      console.log(95, res.data.data.rows)
      setCountry(res.data.data.rows)
    })


    GetCompanyType().then((res) => {
      console.log(58, res.data.data.rows)
      setCompanyType(res.data.data.rows)
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




  return (
    <>
      <HelmetProvider >
        <Helmet>
          <title>Create Company</title>
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
                  >Add Company</h3>
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
                          Short name<span style={{ color: "red" }}>*</span>
                        </label>

                        <Input
                          className="form-control-alternative"
                          name='short_name'


                          id="input-shortname"
                          placeholder="Short name"
                          type="text"
                          //defaultValue={planId ? planId.short_name : ""}
                          onChange={(e) => {
                            setShortName(e.target.value);
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
                          Arabic name<span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          name='aname'
                          // value={addForm.aname}
                          id="input-arabicname"
                          placeholder="Arabic name"
                          type="arabic"
                          // defaultValue={planId ? planId.short_name : ""}
                          onChange={(e) => {
                            setAname(e.target.value);
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
                          Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-name"
                          placeholder="Name"
                          type="text"
                          name='ename'

                          onChange={(e) => {
                            setEname(e.target.value);
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

                          onChange={(e) => {
                            setPhone(e.target.value);
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
                          Email<span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Email"
                          type="email"
                          name='email'

                          onChange={(e) => {
                            setEmail(e.target.value);
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
                          Country<span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          name='countries_id'

                          onChange={(e) => {
                            setCountryOption(e.target.value);
                          }}
                          className="form-control"
                        // onChange={(e) => setCountryOption(e.target.value)}

                        >
                          {country && country.map((res) => {
                            // console.log(441, res)
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

                    <Col lg="6" style={{ marginTop: "2%" }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-logo"
                        >
                          Logo<span style={{ color: "red" }}>*</span>
                        </label>
                        <Input style={{ height: "8vh" }}
                          className="form-control"
                          id="input-name"
                          placeholder="Name"
                          type="file"
                          name="logo"
                          onChange={(e) => {
                            setLogo(e.target.value);
                          }}
                        // onChange={(event) => {
                        //   // Update state with the selected file
                        //   fun_formLogoHandler(event.target.files[0]);
                        // }}
                        />
                        {/* Display file name or other relevant information */}
                        {/* {addForm.logo && <p> {addForm.logo.name}</p>} */}
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
                        <TabContext value={value}>
                          <Col lg="6" >
                            <FormGroup>
                              {/* <Button></Button> */}


                              <TabList onChange={handleChange1} aria-label="lab API tabs example">

                                <Tab label=" Company Gate" value="1" />

                                <Tab label=" Admin Gate" value="2" />


                              </TabList>


                              {/* <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Company Gate <span style={{ color: "red" }}>*</span>
                            </label> */}
                              <TabPanel value="1" style={{ marginTop: '-1.5%' }}>
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

                              </TabPanel>



                            </FormGroup>

                            <FormGroup>
                              <TabPanel value="2" style={{ marginTop: '-5%' }}>
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

                              </TabPanel>
                              {/* <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Admin Gate
                              <span style={{ color: "red" }}>*</span>
                            </label> */}

                            </FormGroup>
                          </Col>


                          {/* <Col lg="6">
                           


                          </Col> */}
                        </TabContext>
                      </>
                    )}


                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup
                        // onClick={() => navigate('/admin/maps') 

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
                          Company Type<span style={{ color: "red" }}>*</span>
                        </label>

                        <select
                          className="form-control"
                          name='company_type_id'
                          value={addForm.company_type_id}
                          onChange={(e) => setCompanyTypeId(e.target.value)}
                        // options={{
                        //   placeholder: "Select"
                        // }}
                        // data={[
                        //   { id: "17ef78ad-ebc6-4a9a-a73d-9c5fae87272c", text: "App" },
                        //   { id: "1f9518e4-4472-478f-b8f0-c193473c6af4", text: "Factory" },
                        //   { id: "f431d0dc-9610-4b57-ad88-578c4f8aea8b", text: "Industry" },

                        // ]}
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
                          onChange={(e) => {
                            setCr(e.target.value);
                          }} />
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
                          Work Phone
                        </label>

                        <Input
                          className="form-control"
                          id="input-name"
                          placeholder="Work Phone"
                          type="text"
                          name="workPhone"
                          onChange={(e) => {
                            setWorkPhone(e.target.value);
                          }} />
                        {Fun_NestedTernaryOprator(erroraddForm.WorkPhone, errorHTML(erroraddForm.WorkPhone), "")}
                      </FormGroup>
                    </Col>
                  </Row>

                  {localStorage.getItem('_role') == 'SuperAdmin' ? (
                    <Button
                      style={{ float: "inline-end" }}
                      onClick={fun_submitFormHandler}
                      color="primary"
                      type="submit"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      style={{ float: "inline-end" }}
                      onClick={fun_submit}

                      color="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  )}





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
        <ModalHeader
          onClick={() => map()}
          className="bg-transparent"
          toggle={() => setShowMap(!showMap)}
        ></ModalHeader>
        <ModalBody >

          <Row>

            <div className="col">
              <Card className="shadow border-0" style={{ marginTop: "-5%" }}>
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
      </Modal>
    </>
  )
}

export default AddCompany