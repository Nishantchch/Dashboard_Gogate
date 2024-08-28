import React, { useEffect, useState } from 'react'
import IndexHeader from 'components/Headers/IndexHeader'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, InputGroup, Media, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap'
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
import { AddOrderApi } from 'apis/Order/AddOrder';
import { AddFavouriteApi } from 'apis/CompanyApi/addFavourite';
import { GetFavouriteApi } from 'apis/CompanyApi/GetAllFavorite';
import { Helmet, HelmetProvider } from 'react-helmet-async';
const FavouriteUserDetails = () => {

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
  console.log(39, planId)


  const fun_StaffCompany = (e) => {
    navigate(`/admin/companies/staff/${e}`)
  }
  const [getOrderename, setOrderename] = useState()

  const [getOrder, setGetOrder] = useState()
  const [getIDename, setIDename] = useState()

  const [gateID, setGAteID] = useState()
  const [allCompanyData, setAllCompanyData] = useState()
  const [adminDataa, setAdminDataa] = useState()
  const [adminStatus, setAdminStatus] = useState()
  const [adminName, setAdminName] = useState()
  const [adminLast, setAdminLast] = useState()

  const [showAddUser, setShowAddUser] = useState(false);
  const [modalTypeAddUser, setModalTypeAddUser] = useState("Add");
  const handleModalClosedADD = () => {
    setModalTypeAddUser('Add')
  }

  const [showAddFvourite, setShowAddFvourite] = useState(false);
  const [modalTypeAddFvourite, setModalTypeAddFvourite] = useState("Add");
  const handleModalClosedFvourite = () => {
    setModalTypeAddFvourite('Add')
  }


  const [companyData, setCompanyData] = useState()
  const [data, setData] = useState(true);

  const Clicked = () => {
    setData(!data);
  };

  const AdminData = {
    company_id: sessionStorage.getItem('FavCompanyID')
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

  useEffect(() => {

    GetFavouriteApi(GetcComany).then((res) => {
      console.log(131, res.data.data.filter((resp) => resp.id == sessionStorage.getItem('FavCompanyID')))
      setCompanyData(res.data.data.filter((resp) => resp.id == sessionStorage.getItem('FavCompanyID')))
    })

    // GetCompanyApi().then((res) => {
    //   console.log(105, res.data.data.rows)
    //   setAllCompanyData(res.data.data.rows)
    // })

    // GetAllAdmin(AdminData).then((res) => {
    //   console.log(122, res.data.data)
    //   setAdminDataa(res.data.data[0]?.email_id)
    //   setAdminStatus(res.data.data[0]?.isEmailVerified)
    //   setAdminName(res.data.data[0]?.FirstName)
    //   setAdminLast(res.data.data[0]?.LastName)

    // })
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

  }, [])
  console.log(108, companyid)



  const [addForm, setAddForm] = useState({

    id: companyid ? companyid : "",
    short_name: companyid ? companyid.short_name : "",
    aname: companyid ? companyid.aname : "",
    ename: companyid ? companyid.ename : "",
    phone: companyid ? companyid.phone : "",
    email: companyid ? companyid.email : "",
    countries_id: companyid ? companyid.countries_id : "",
    logo: "",
    long: companyid ? companyid.long : "",
    lat: companyid ? companyid.lat : "",
    company_type_id: companyid ? companyid.company_type_id : "",

  })
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



  const fun_formHandler = (e) => {
    fun_formHandlerController({ e, setAddForm, setErrorAddForm })
  }
  const fun_formLogoHandler = (e) => {
    fun_formLogoHandlerController({ e, setAddForm })
  }
  const Fun_isValid = () => {


    return Fun_isValidController({ addForm, erroraddForm, setErrorAddForm, errorMessages })
  };

  const fun_submitFormHandler = (e) => {
    e.preventDefault()
    fun_submitFormHandlerController({ Fun_isValid })


    UpdateCompanyApi(addForm).then((res) => {
      console.log(80, res)
      navigate('/admin/companies')
    })


  }


  const [name, setName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const addAdmin = {
    first_name: name,
    last_name: lastName,
    email: email,
    password: password,
    company_id: companyid ? companyid : "",
    user_type: '2'
  }

  const SubmitApi = () => {
    AddCompanyAdminApi(addAdmin).then((res) => {
      console.log(54, res)
      setShowAddUser(!showAddUser)

      if (res.status == 200) {
        toast.success('Company Admin added,Email sent');

      } else {
        toast.error('Something Want Wrong ');

      }


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
  return (
    <div>
      <IndexHeader />

      <HelmetProvider >
        <Helmet>
          <title>Favorite-User Detalis</title>
        </Helmet>
      </HelmetProvider>

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
                  </Col>) : (<Col className="text-right" xs="3">

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
                      navigate('/admin/companies/staff/:cid', companyid ? companyid : "")


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
                            {(companyData || [])[0]?.countries_id}

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
                      {/* <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-logo"
                        >
                          Logo
                        </label>


                      </FormGroup>
                    </Col> */}
                    </Row>
                    {/* <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-Lat"
                          >
                            Latitude
                          </label>
                          <h3>
                            {(companyData || [])[0]?.lat}

                          
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

                           
                          </h3>
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <Row>

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
                            value={addForm.short_name}
                            id="input-shortname"
                            //placeholder="Short name"
                            type="text"
                            //defaultValue={planId ? planId.short_name : ""}
                            onChange={(event) => {
                              fun_formHandler(event);
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
                            value={addForm.aname}
                            id="input-arabicname"
                            placeholder="Arabic name"
                            type="text"
                            // defaultValue={planId ? planId.short_name : ""}
                            onChange={(event) => {
                              fun_formHandler(event);
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
                            value={addForm.ename}
                            onChange={(event) => {
                              fun_formHandler(event);
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
                            value={addForm.phone}
                            onChange={(event) => {
                              fun_formHandler(event);
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
                            value={addForm.email}
                            onChange={(event) => {
                              fun_formHandler(event);
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
                          <Select2
                            name='countries_id'
                            value={addForm.countries_id}
                            onChange={(event) => {
                              fun_formHandler(event);
                            }}
                            className="form-control"
                            options={{
                              placeholder: "Select"
                            }}
                            data={[
                              { id: "1", text: " india" },
                              { id: "2", text: "Badges" },
                              { id: "3", text: "Buttons" },
                              { id: "4", text: "Cards" },
                              { id: "5", text: "Forms" },
                              { id: "6", text: "Modals" }
                            ]}
                          />
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
                          <Select2
                            className="form-control"
                            name='company_type_id'
                            value={addForm.company_type_id}
                            onChange={(event) => {
                              fun_formHandler(event);
                            }}
                            options={{
                              placeholder: "Select"
                            }}
                            data={[
                              { id: "17ef78ad-ebc6-4a9a-a73d-9c5fae87272c", text: "App" },
                              { id: "1f9518e4-4472-478f-b8f0-c193473c6af4", text: "Factory" },
                              { id: "f431d0dc-9610-4b57-ad88-578c4f8aea8b", text: "Industry" },

                            ]}
                          />
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
                            onChange={(event) => {
                              fun_formLogoHandler(event.target.files[0]);
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
                            value={addForm.lat}
                            onChange={(event) => {
                              fun_formHandler(event);
                            }}
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
                            value={addForm.long}
                            onChange={(event) => {
                              fun_formHandler(event);
                            }}
                          />
                          {Fun_NestedTernaryOprator(erroraddForm.long, errorHTML(erroraddForm.long), "")}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>

                    </Row>
                    <Button
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


      {/* 
      <Container className="mt-5" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="10">
                  <h3 className="mb-0"
                  >Company  Admin Detalis </h3>
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
                  </tr>


                </tbody >

              </Table>

            </CardBody>
          </Card>
        </Col>
      </Container> */}


      {/* 
      <Container className="mt-5" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0"
                  >Favourite Company </h3>
                </Col>

                <Col className="text-right" xs="2">

                  {companyData && companyData.map((res) => {
                    return (<>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={favourite}
                              onChange={handleSwitchChange}
                            // defaultChecked={res.favourite == 1 ? true : false}
                            />
                          }
                        // label={toggleshow ? 'Favorite' : 'Not Favorite'}
                        />
                      </FormGroup>
                    </>)
                  })}



                </Col>
                <Col className="text-right" xs="2">
                  <Button
                    color="primary"
                    style={{ width: "8vw" }}
                    onClick={() => AddFavourite()}
                    size="sm"
                  >
                    Add to Favourite
                  </Button>
                </Col>
              </Row>
            </CardHeader>

          </Card>
        </Col>
      </Container> */}

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
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      {/* =======================Add Order============================= */}




    </div >
  )
}

export default FavouriteUserDetails