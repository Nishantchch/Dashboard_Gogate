import React, { useEffect, useState } from 'react'
import IndexHeader from 'components/Headers/IndexHeader'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, Media, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip } from 'reactstrap'
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
import { GetCompanylist } from 'apis/CompanyApi/getCompanyList';
import { Edit } from '@mui/icons-material';
import { FormControlLabel, Stack, Switch } from '@mui/material';
import { GetAllAdmin } from 'apis/CompanyApi/GetAllAdmin';
import { AddCompanyAdminApi } from 'apis/CompanyApi/AddCompanyAdminApi';
import { toast } from 'react-toastify';
import DvrIcon from '@mui/icons-material/Dvr';
import { GetAllCompanyApi } from 'apis/CompanyApi/GetAllComany';
import { GetCompanyApi } from 'apis/CompanyApi/GetAllComany';
import { GetAllDrivers } from 'apis/Order/getAllDrivers';
import { GetGateListID } from 'apis/Order/getGateID';
import { } from 'apis/Order/AddOrder';
import { AddFavouriteApi } from 'apis/CompanyApi/addFavourite';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GetCountriesApi } from 'apis/CountrieApi/getCountrie';
import { setUserid } from 'redux/slice/categorySlice';
import { UpdateCompanyAdmin } from 'apis/CompanyApi/UpdateCompanyAdminApi';
import { GetCompanyType } from 'apis/CompanyApi/ComapnyType';

const UserDetails = () => {

  const params = useParams()
  const RoleId = params.id
  // const MyID = window.location.href
  // let position = MyID.search("id");
  // const citrus = MyID.slice(position.length, MyID.length);
  console.log(17, RoleId)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const companyid = useSelector((state) => state.categoryState?.companyid);
  const planId = useSelector((state) => state.categoryState?.planId);
  const userid = useSelector((state) => state.categoryState?.userid);

  console.log(42, companyid)

  const fun_StaffCompany = (e) => {
    navigate(`/admin/companies/staff/${e}`)
  }
  const [getOrderename, setOrderename] = useState()

  const [getOrder, setGetOrder] = useState()
  const [getIDename, setIDename] = useState()

  const [gateID, setGAteID] = useState()
  const [allCompanyData, setAllCompanyData] = useState()
  const [userID, setUserID] = useState()
  const [adminDataa, setAdminDataa] = useState()
  const [adminStatus, setAdminStatus] = useState()
  const [adminName, setAdminName] = useState()
  const [adminLast, setAdminLast] = useState()

  const [showAddUser, setShowAddUser] = useState(false);
  const [modalTypeAddUser, setModalTypeAddUser] = useState("Add");
  const handleModalClosedADD = () => {
    setModalTypeAddUser('Add')
  }
  const onResetAdd = () => {
    setShowAddUser(!showAddUser);

  };

  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [modalTypeUpdateUser, setModalTypeUpdateUser] = useState("Update");
  const handleModalClosedUpdate = () => {
    setModalTypeUpdateUser('Update')
  }
  const onResetUpdate = () => {
    setShowUpdateUser(!showUpdateUser);

  };

  const [showAddFvourite, setShowAddFvourite] = useState(false);
  const [modalTypeAddFvourite, setModalTypeAddFvourite] = useState("Add");
  const handleModalClosedFvourite = () => {
    setModalTypeAddFvourite('Add')
  }


  const [companyData, setCompanyData] = useState()
  console.log(72, companyData)
  const [data, setData] = useState(true);

  const Clicked = () => {
    setData(!data);
  };

  const AdminData = {
    company_id: sessionStorage.getItem('CompanyID')
  }




  const GetcComany = {
    filter: {
      id: "",
      email: "",
      company_type: "",
      created_at: ""
    },
    limit: 50,
    offset: 0
  }
  const [adminDATA, setAdminDATA] = useState()
  const [companyType, setCompanyType] = useState()

  useEffect(() => {

    GetCompanylist(GetcComany).then((res) => {
      console.log(131, res.data.data.data.filter((resp) => resp.company_id == sessionStorage.getItem('CompanyID')))
      setCompanyData(res.data.data.data.filter((resp) => resp.company_id == sessionStorage.getItem('CompanyID')))
    })

    // GetCompanyApi().then((res) => {
    //   console.log(105, res.data.data.rows)
    //   setAllCompanyData(res.data.data.rows)
    // })
    GetAllAdmin(AdminData).then((res) => {
      console.log(122, res.data.data)
      setAdminDATA(res.data.data)
      setUserID(res.data.data[0]?.user_id)
      setAdminDataa(res.data.data[0]?.email_id)
      setAdminStatus(res.data.data[0]?.isEmailVerified)
      setAdminName(res.data.data[0]?.FirstName)
      setAdminLast(res.data.data[0]?.LastName)

    })
    // GetAllDrivers().then((res) => {
    //   console.log(127, res.data.data)
    //   setGetOrder(res.data.data[0]?.driver_id)
    //   setOrderename(res.data.data[0]?.first_name)

    // })

    GetGateListID().then((res) => {
      console.log(133, res.data.data)
      setGAteID(res.data.data[0]?.id)
      setIDename(res.data.data[0]?.ename)

    })

    GetCompanyType().then((res) => {
      console.log(58, res.data.data.rows
        .filter((resp) => resp.companyType == planId)
      )
      setCompanyType(res.data.data.rows)
      console.log(588, companyid)
    })

  }, [])
  console.log(108, companyid)

  const refraceCompany = () => {
    GetCompanylist(GetcComany).then((res) => {
      console.log(131, res.data.data.data.filter((resp) => resp.company_id == sessionStorage.getItem('CompanyID')))
      setCompanyData(res.data.data.data.filter((resp) => resp.company_id == sessionStorage.getItem('CompanyID')))
    })
  }
  const refarce = () => {
    GetAllAdmin(AdminData).then((res) => {
      console.log(122, res.data.data)
      setUserID(res.data.data[0]?.user_id)
      setAdminDataa(res.data.data[0]?.email_id)
      setAdminStatus(res.data.data[0]?.isEmailVerified)
      setAdminName(res.data.data[0]?.FirstName)
      setAdminLast(res.data.data[0]?.LastName)

    })


  }


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

    id: companyid ? companyid.company_id : "",
    short_name: shortNameUpdate == undefined ? (companyData || [])[0]?.short_name : shortNameUpdate,
    aname: anameUpdate == undefined ? (companyData || [])[0]?.aname : anameUpdate,
    ename: enameUpdate == undefined ? (companyData || [])[0]?.ename : enameUpdate,
    phone: phoneUpdate == undefined ? (companyData || [])[0]?.phone : phoneUpdate,
    email: emailUpdate == undefined ? (companyData || [])[0]?.email : emailUpdate,
    countries_id: countryOptionUpdate,
    logo: logoUpdate,
    long: localStorage.getItem('longitudeGC'),
    lat: localStorage.getItem('latitudeGC'),
    company_type_id: companyTypeId,
    cr: crUpdate == undefined ? (companyData || [])[0]?.cr : crUpdate,
    work_phone: workPhoneUpdate == undefined ? (companyData || [])[0]?.work_phone : workPhoneUpdate,

  }
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

  console.log(167, addForm)

  const fun_formHandler = (e) => {
    fun_formHandlerController({ e, setErrorAddForm })
  }
  const fun_formLogoHandler = (e) => {
    fun_formLogoHandlerController({ e })
  }
  const Fun_isValid = () => {


    return Fun_isValidController({ addForm, erroraddForm, setErrorAddForm, errorMessages })
  };

  const fun_submitFormHandler = (e) => {
    e.preventDefault()
    fun_submitFormHandlerController({ Fun_isValid })
    remove();


    UpdateCompanyApi(addForm).then((res) => {
      console.log(80, res)
      // navigate('/admin/companies')
      refraceCompany()
      Clicked()
    })


  }

  // =============================Add Admin=================//
  const [name, setName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [adPhone, setAdPhone] = useState()
  const [adWorkPhone, setAdWorkPhone] = useState()

  const addAdmin = {
    first_name: name,
    last_name: lastName,
    email: email,
    password: password,
    company_id: sessionStorage.getItem('CompanyID'),
    user_type: '2',
    phone_id: adPhone,
    comm_phone: adWorkPhone,

  }
  console.log(205, addAdmin)


  const SubmitApi = () => {
    AddCompanyAdminApi(addAdmin).then((res) => {
      console.log(54, res)
      setShowAddUser(!showAddUser)
      refarce()
      if (res.status == 200) {
        toast.success('Company Admin added,Email sent');


      } else {
        toast.error('Something Want Wrong ');

      }


    })
  }

  // ==================Update Admin==========================//
  const [nameUpdate, setNameUpdate] = useState()
  const [lastNameUpdate, setLastNameUpdate] = useState()
  // const [email, setEmail] = useState()
  const [passwordUpdate, setPasswordUpdate] = useState()
  const [adPhoneUpdate, setAdPhoneUpdate] = useState()
  const [adWorkPhoneUpdate, setAdWorkPhoneUpdate] = useState()

  const updateData = {
    id: userid ? userid : "",
    first_name: nameUpdate == undefined ? (adminDATA || [])[0]?.FirstName : nameUpdate,
    last_name: lastNameUpdate == undefined ? (adminDATA || [])[0]?.LastName : lastNameUpdate,
    phone_id: adPhoneUpdate == undefined ? (adminDATA || [])[0]?.phone : adPhoneUpdate,
    comm_phone: adWorkPhoneUpdate == undefined ? (adminDATA || [])[0]?.work_phone : adWorkPhoneUpdate,
    password: passwordUpdate
  }
  console.log(282, updateData)
  const UpdateApi = () => {
    UpdateCompanyAdmin(updateData).then((res) => {
      console.log(res)
      refarce();
      setShowUpdateUser(!showUpdateUser)
    })
  }

  const [favourite, setFavourite] = useState(companyid.favourite == 1 ? true : false)
  // const [toggleshow, setToggleshow] = useState(false);


  const favouriteData = {
    id: companyid ? companyid.id : "",
    favourite: favourite
  }

  const handleSwitchChange = () => {
    setFavourite(!favourite);
  }
  console.log(131, favouriteData)
  const AddFavourite = () => {
    AddFavouriteApi(favouriteData).then((res) => {
      console.log(132, res)
      // setToggleshow(true)
      if (res.status == 200) {
        toast.success(' Company Favourite List Updated');
      }
    })
  }

  const [country, setCountry] = useState()
  useEffect(() => {
    GetCountriesApi().then((res) => {
      console.log(95, res.data.data.rows)
      setCountry(res.data.data.rows)
    })
  }, [])

  // ==========================map======================//


  const [showMap, setShowMap] = useState(false);
  const [modalTypeMap, setModalTypeMap] = useState('');
  const handleModalClosed = () => {
    setModalTypeMap();
  };

  const [leti, setLeti] = useState(25.276987)
  const [lon, setLon] = useState(55.296249)
  const zoom = 16; // 15 is ideal

  const mapLet = () => {

    setLeti(25.276987)
    setLon(55.296249)
    localStorage.setItem('latitudeGC', 25.276987)
    localStorage.setItem('longitudeGC', 55.296249)


  }

  const remove = () => {

    localStorage.removeItem('latitudeGC');
    localStorage.removeItem('longitudeGC');

  }



  return (
    <div>
      <HelmetProvider >
        <Helmet>
          <title>Companie User-Details</title>
        </Helmet>
      </HelmetProvider>

      <IndexHeader />
      <Container className="mt-5" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="6">
                  <h3 className="mb-0"
                  >Company Detalis </h3>
                </Col>
                {data ?
                  (<Col className="text-right" xs="5" >

                    <Button
                      style={{ width: "4vw", marginLeft: "-15%" }}
                      color="primary"
                      onClick={() => Clicked()}
                      size="sm"
                    >
                      {" "}
                      <Edit style={{ fontSize: "1.1vw" }} />
                      <span style={{ fontSize: ".7vw" }}>Edit</span>
                    </Button>
                  </Col>) : (<Col className="text-right" xs="5">

                    <Button

                      color="primary"
                      onClick={() => setData(true)}
                      size="sm"
                    >
                      {" "}

                      <span style={{ fontSize: ".7vw" }}>Cancel</span>
                    </Button>
                  </Col>)}

                <Col className="text-right" xs="1">
                  <Button
                    color="primary"
                    style={{ width: "6.2vw", fontSize: ".7vw " }}

                    onClick={() => {
                      navigate('/admin/companies/staff/:cid', companyid ? companyid.company_id : "")


                    }}
                    size="sm"
                  >
                    Company Staff
                  </Button>

                </Col>
                {/* <Col className="text-right" xs="1">
                  <Button
                    style={{ width: "5vw", fontSize: ".7vw " }}
                    color="primary"
                    onClick={() => {
                      // dispatch(setCompanyid(res.user_id))

                      setShowOrder(!showOrder)

                    }}
                    size="sm"
                  >

                    <span>Add Order</span>

                  </Button>
                </Col> */}

              </Row>
            </CardHeader>
            <CardBody>
              {data ?
                (<div>
                  <h6 className="heading-small text-muted mb-4">
                    Company information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">

                        <label
                          className="form-control-label"
                          htmlFor="input-shortname"
                        >
                          Short name
                        </label>

                        <h3>
                          {(companyData || [])[0]?.short_name}
                        </h3>


                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-arabicname"
                          >
                            Arabic name
                          </label>
                          <h3>
                            {(companyData || [])[0]?.aname}
                            {/* {companyid ? companyid.aname : ""} */}
                          </h3>
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
                          <h3>
                            {(companyData || [])[0]?.ename}

                            {/* {companyid ? companyid.ename : ""} */}
                          </h3>
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
                          <h3>
                            {(companyData || [])[0]?.phone}

                            {/* {companyid ? companyid.phone : ""} */}
                          </h3>
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
                          <h3>
                            {(companyData || [])[0]?.email}

                            {/* {companyid ? companyid.email : ""} */}
                          </h3>
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
                          <h3>
                            {(companyData || [])[0]?.country_name}

                            {/* {companyid ? companyid.countries_id : ""} */}
                          </h3>
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
                          <h3>
                            true
                          </h3>

                        </FormGroup>
                      </Col> */}
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-companytype"
                          >
                            Company Type
                          </label>
                          <h3>
                            {(companyData || [])[0]?.companyType.ename}

                            {/* {companyid ? companyid.companyType.ename : ""} */}
                          </h3>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-logo"
                          >
                            Work Phone
                          </label>
                          <h3>
                            {(companyData || [])[0]?.work_phone}

                          </h3>

                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup >
                          <label

                            className="form-control-label"
                            htmlFor="input-Lat"
                          >
                            Latitude
                          </label>
                          <h3>
                            {(companyData || [])[0]?.lat}

                            {/* {companyid ? companyid.lat : ""} */}
                          </h3>
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
                          <h3>
                            {(companyData || [])[0]?.long}

                            {/* {companyid ? companyid.long : ""} */}
                          </h3>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-long"
                          >
                            Company Registration
                          </label>
                          <h3>
                            {(companyData || [])[0]?.cr}

                            {/* {companyid ? companyid.long : ""} */}
                          </h3>
                        </FormGroup>
                      </Col>

                    </Row>

                  </div>
                </div>)
                :
                (<Form>
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
                            // value={addForm.short_name}
                            id="input-shortname"
                            //placeholder="Short name"
                            type="text"
                            defaultValue={companyid ? companyid.short_name : ""}
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
                            placeholder="Arabic name"
                            type="text"
                            defaultValue={companyid ? companyid.aname : ""}
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
                            // value={addForm.ename}
                            defaultValue={companyid ? companyid.ename : ""}
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
                            // value={addForm.phone}
                            defaultValue={companyid ? companyid.phone : ""}
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
                            // value={addForm.email}
                            defaultValue={companyid ? companyid.email : ""}

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
                            // value={addForm.countries_id}
                            defaultValue={companyid ? companyid.countries_id : ""}

                            onChange={(e) => {
                              setCountryOptionUpdate(e.target.value);
                            }}
                            className="form-control">
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
                            defaultValue={companyid ? companyid.company_type_id : ""}

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
                            // onChange={(event) => {
                            //   fun_formLogoHandler(event.target.files[0]);
                            // }}
                            // defaultValue={companyid ? companyid.company_type_id : ""}

                            onChange={(e) => setLogoUpdate(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup
                          onClick={() => { setShowMap(!showMap); }}    >
                          <label
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
                            // value={addForm.lat}
                            defaultValue={companyid ? companyid.lat : ""}

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
                            // value={addForm.long}
                            defaultValue={companyid ? companyid.long : ""}

                            onChange={(e) => setLong(e.target.value)}

                          />
                          {Fun_NestedTernaryOprator(erroraddForm.long, errorHTML(erroraddForm.long), "")}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup >
                          <label
                            className="form-control-label"
                            htmlFor="input-Lat"
                          >
                            work phone
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-lat"
                            placeholder="work phone"
                            type="text"
                            name='work_phone'
                            // value={addForm.work_phone}
                            defaultValue={companyid ? companyid.work_phone : ""}

                            onChange={(e) => setWorkPhoneUpdate(e.target.value)}

                          />
                          {Fun_NestedTernaryOprator(erroraddForm.work_phone, errorHTML(erroraddForm.work_phone), "")}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-long"
                          >
                            Company Registration
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-long"
                            placeholder="Company Registration"
                            type="text"
                            name='cr'
                            // value={addForm.cr}
                            defaultValue={companyid ? companyid.cr : ""}
                            onChange={(e) => {
                              setCrUpdate(e.target.value);
                            }}
                          />
                          {Fun_NestedTernaryOprator(erroraddForm.cr, errorHTML(erroraddForm.cr), "")}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>

                    </Row>
                    <Button
                      style={{ float: "right" }}
                      onClick={fun_submitFormHandler}
                      color="primary" type="submit">
                      Submit
                    </Button>
                  </div>

                </Form>)}

            </CardBody>
          </Card>
        </Col>
      </Container>



      <Container className="mt-5" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="10">
                  <h3 className="mb-0"
                  >Company Admin Detalis </h3>
                </Col>


                <Col className="text-right" xs="2">
                  <Button
                    color="primary"
                    style={{ width: "8vw" }}
                    onClick={() => setShowAddUser(!showAddUser)}
                    size="sm"
                  >
                    Add Company Admin
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>

              <Table className="align-items-center table-flush" responsive >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Update  </th>


                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>{adminName}</td>
                    <td>{adminLast}</td>

                    <th scope="row">
                      <Media className="align-items-center">

                        <Media>
                          <span className="mb-0 text-sm">
                            {adminDataa}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    {adminStatus == 1 ? <td>True</td> : <td>Pending</td> || adminStatus == 0 ? <td>Pending</td> : ""}

                    <td className="table-actions">
                      <>
                        <a href={() => false} id="tooltip611234743" className="table-action"
                          style={{ cursor: "pointer" }}

                        ><i className="fas fa-user-edit"
                          onClick={() => {
                            dispatch(setUserid(userID))
                            // dispatch(setPlanId(res))
                            // navigate(`/admin/updatecompany/${res.company_id}`)
                            setShowUpdateUser(!showUpdateUser)


                          }}

                          /></a>
                        <UncontrolledTooltip
                          delay={0}
                          placement="top"
                          target="tooltip611234743"
                        >
                          Edit Company
                        </UncontrolledTooltip>
                      </>
                    </td>
                  </tr>


                </tbody >

              </Table>

            </CardBody>
          </Card>
        </Col>
      </Container>



      {/* ======================================Add Admin===================== */}
      <Modal
        isOpen={showAddUser}
        onClosed={handleModalClosedADD}
        toggle={() => setShowAddUser(!showAddUser)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowAddUser(!showAddUser)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4">
            <h4> {modalTypeAddUser} User</h4>

          </div>
          <Row tag="form">
            <Col xs={12}>

              <InputGroup className="input-group-alternative">
                <Input
                  type="text" placeholder="Name"
                  onChange={(e) => setName(e.target.value)}

                />
              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Last Name" type="text"
                  onChange={(e) => setLastName(e.target.value)}

                />
              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Email" type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Password" type="text"
                  onChange={(e) => setPassword(e.target.value)}

                />
              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Phone" type="text"
                  onChange={(e) => setAdPhone(e.target.value)}

                />
              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Work Phone" type="text"
                  onChange={(e) => setAdWorkPhone(e.target.value)}

                />
              </InputGroup>


            </Col>


            <Col className="text-center mt-5" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  SubmitApi()
                }}
              >
                Submit
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset"
                onClick={() => {
                  onResetAdd()
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      {/* =======================Update Admin============================= */}

      <Modal
        isOpen={showUpdateUser}
        onClosed={handleModalClosedUpdate}
        toggle={() => setShowUpdateUser(!showUpdateUser)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowUpdateUser(!showUpdateUser)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4">
            <h4> {modalTypeUpdateUser} Company Admin</h4>

          </div>
          <Row tag="form">
            <Col xs={12}>

              <InputGroup className="input-group-alternative">
                <Input
                  type="text" placeholder="Name"
                  defaultValue={(adminDATA || [])[0]?.FirstName}
                  onChange={(e) => setNameUpdate(e.target.value)}

                />
              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Last Name" type="text"
                  defaultValue={(adminDATA || [])[0]?.LastName}
                  onChange={(e) => setLastNameUpdate(e.target.value)}

                />
              </InputGroup>
              {/* <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Email" type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup> */}
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Password" type="password"
                  onChange={(e) => setPasswordUpdate(e.target.value)}

                />
              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Phone" type="text"
                  defaultValue={(adminDATA || [])[0]?.phone}
                  onChange={(e) => setAdPhoneUpdate(e.target.value)}

                />
              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Work Phone" type="text"
                  defaultValue={(adminDATA || [])[0]?.work_phone}
                  onChange={(e) => setAdWorkPhoneUpdate(e.target.value)}

                />
              </InputGroup>


            </Col>


            <Col className="text-center mt-5" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  UpdateApi()
                }}
              >
                Submit
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset"
                onClick={() => {
                  onResetUpdate()
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      {/* =====================Map========================== */}


      <Modal
        isOpen={showMap}
        onClosed={handleModalClosed}
        toggle={() => setShowMap(!showMap)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"

        >
          <Button className="mt-3 mb-3"
            id='tooltip969372949'
            color="neutral"
            href={() => false}
            onClick={() => {
              setShowMap(!showMap);
              mapLet();
            }}

            size="sm"

          >
            <span className='mr-2'>
              <i className="fas fa-user" />
            </span>
            <span className='btn-inner--text'

            >Select</span>
          </Button>
        </ModalHeader>
        <ModalBody >

          <Row>

            <div className="col">
              <Card className="shadow border-0" style={{ marginTop: "-5%" }}>
                <Row >



                  {/* <div className="col-1" >
                    <Button className="mt-3 mb-3"
                      id='tooltip969372949'
                      color="neutral"
                      href={() => false}
                      onClick={() => navigate('/admin/companies/addcompany')}
                      size="sm"

                    >
                      <span className='mr-2'>
                        <i className="fas fa-user" />
                      </span>
                      <span className='btn-inner--text'

                      >Select</span>
                    </Button>
                  </div> */}



                </Row>

                {/* <MapWrapper /> */}
                <iframe
                  src={` https://maps.google.com/maps?q=${leti},${lon}&z=${zoom}&output=embed`}
                  id="map"
                  animation='google.maps.Animation.DROP'
                  title='data.title'
                  height='500px'></iframe>

              </Card>
            </div>
          </Row>
        </ModalBody>
      </Modal>

    </div >
  )
}

export default UserDetails