import { Edit } from '@mui/icons-material';
import './OrderUser.css'
import { Menu, MenuItem, OutlinedInput, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { GetFavouriteApi } from 'apis/CompanyApi/GetAllFavorite';
import { GetAllDrivers } from 'apis/Order/getAllDrivers';
import { GetAllOrder } from 'apis/Order/getAllOrder';
import { GetGateListID } from 'apis/Order/getGateID';
import { UpdateOrderApi } from 'apis/Order/updateOrder';
import IndexHeader from 'components/Headers/IndexHeader';
import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux'
import { Form, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Row } from 'reactstrap';

import dayjs from 'dayjs';
import { OrderStatusUpdateApi } from 'apis/Order/OrderStatus';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const OrderUserDetails = () => {

  const navigate = useNavigate()


  const orderid = useSelector((state) => state.categoryState?.orderid);

  const [data, setData] = useState(true);

  const Clicked = () => {
    setData(!data);
  };

  const [allCompanyData, setAllCompanyData] = useState()

  const [selectedCompanies4, setSelectedCompanies4] = useState([]);
  const handleCheckboxChange4 = (value) => {
    if (selectedCompanies4.includes(value)) {
      setSelectedCompanies4(selectedCompanies4.filter((company) => company !== value));
    } else {
      setSelectedCompanies4([...selectedCompanies4, value]);
    }
  };

  const [selectedCompaniesGate, setSelectedCompaniesGate] = useState([]);
  const handleCheckboxChangeGate = (value) => {
    if (selectedCompaniesGate.includes(value)) {
      setSelectedCompaniesGate(selectedCompaniesGate.filter((company) => company !== value));
    } else {
      setSelectedCompaniesGate([...selectedCompaniesGate, value]);
    }
  };


  const [selectedCompaniesDriver, setSelectedCompaniesDriver] = useState([]);
  const handleCheckboxChangeDriver = (value) => {
    if (selectedCompaniesDriver.includes(value)) {
      setSelectedCompaniesDriver(selectedCompaniesDriver.filter((company) => company !== value));
    } else {
      setSelectedCompaniesDriver([...selectedCompaniesDriver, value]);
    }
  };
  // const [name, setName] = useState()
  const [invoice, setInvoice] = useState()
  const [date, setDate] = useState(dayjs())
  // const [value2, setValue2] = React.useState(dayjs());

  const [truck, setTruck] = useState()
  const [image, setImage] = useState()



  const [orderallData, setOrderallData] = useState()
  const [gateID, setGAteID] = useState()
  const [getOrder, setGetOrder] = useState()

  useEffect(() => {
    GetAllOrder().then((res) => {
      console.log(79, res.data.data.data.filter((resp) => resp.order_id == orderid))
      // console.log(44, res.data.data.data.filter((resp) => resp.status == !1 ? 0 : 1))
      setOrderallData(res.data.data.data)

    })

    GetGateListID().then((res) => {
      console.log(133, res.data.data)
      setGAteID(res.data.data)
      // setIDename(res.data.data[0]?.ename)

    })

    GetAllDrivers().then((res) => {
      console.log(127, res.data.data)
      setGetOrder(res.data.data)
      // setOrderename(res.data.data[0]?.first_name)

    })
  }, [])
  const refraceData = () => {
    GetAllOrder().then((res) => {
      console.log(79, res.data.data.data.filter((resp) => resp.order_id == orderid))
      // console.log(44, res.data.data.data.filter((resp) => resp.status == !1 ? 0 : 1))
      setOrderallData(res.data.data.data)

    })
  }

  const AddFavApiFunc = async () => {
    await GetFavouriteApi().then((res) => {
      console.log(105, res)
      setAllCompanyData(res.data.data)
    })
  }

  const updateData = {
    id: orderid ? orderid : "",
    invoice: invoice,
    number_of_trucks: truck,
    gate_type_id: selectedCompaniesGate,
    status: true,
    image: image,
    // from_company: selectedCompanies3,
    to_company: selectedCompanies4,
    driver: selectedCompaniesDriver,
    dispatch_date: date

  }

  console.log(113, updateData)
  const OredrUpdate = () => {
    UpdateOrderApi(updateData).then((res) => {
      // console.log(106, res)
      refraceData();
      // setShowUserEdit(!showUserEdit)
    })
  }
  console.log(7, orderid)


  // ====================Status Update===========================//
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [oredrStatus, setOredrStatus] = useState()
  const statusData = {
    id: orderid ? orderid : "",
    order_status: oredrStatus,
  }
  console.log(331, statusData)

  const statusAPI = () => {
    OrderStatusUpdateApi(statusData).then((res) => {
      console.log(346, res)
      refraceData();

    })
  }


  return (
    <>
      <HelmetProvider >
        <Helmet>
          <title>Order-Details</title>
        </Helmet>
      </HelmetProvider>

      <IndexHeader />

      <Container className="mt-5" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="7">
                  <h3 className="mb-0"
                  >Order Detalis </h3>
                </Col>
                <Col xs='4'>
                  <Button
                    style={{ width: "8vw", float: "right" }}
                    color="primary"


                    size="sm"
                  >
                    <KeyboardArrowDownIcon
                      id="demo-positioned-button"
                      aria-controls={open ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}

                    />
                    {" "}

                    <span style={{ fontSize: ".7vw" }}>Update Status</span>
                  </Button>
                </Col>

                {data ?
                  (
                    <Col className="text-right" xs="1" >

                      <Button
                        style={{ width: "4vw", marginLeft: "-15%" }}
                        color="primary"
                        onClick={() => { Clicked(); AddFavApiFunc() }}

                        size="sm"
                      >
                        {" "}
                        <Edit style={{ fontSize: "1.1vw" }} />
                        <span style={{ fontSize: ".7vw" }}>Edit</span>
                      </Button>
                    </Col>) :
                  (<Col className="text-right" xs="1">

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


                </Col>

              </Row>
            </CardHeader>
            <CardBody>
              {data ?
                (
                  <div>
                    <h6 className="heading-small text-muted mb-4">
                      Order information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">

                          <label
                            className="form-control-label"
                            htmlFor="input-shortname"
                          >
                            Drop Company Name
                          </label>

                          <h3>
                            {(orderallData || [])[0]?.drop_points.map((resp) => resp.ename)}
                          </h3>


                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-arabicname"
                            >
                              Invoice
                            </label>
                            <h3>
                              {(orderallData || [])[0]?.invoice_id}
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
                              Gate
                            </label>
                            <h3>
                              {(orderallData || [])[0]?.gate_names}
                            </h3>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Number Of Trucks
                            </label>
                            <h3>
                              <td>{(orderallData || [])[0]?.number_of_trucks}</td>

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
                              Date
                            </label>
                            <h3>
                              <td>{(orderallData || [])[0]?.dispatch_date.slice(-24, -14)}</td>

                              {/* {companyid ? companyid.email : ""} */}
                            </h3>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Driver
                            </label>
                            <h3>
                              {(orderallData || [])[0]?.drivers.map((resp) => resp.driver_fullName)}

                            </h3>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Status
                            </label>
                            <h3>
                              {(orderallData || [])[0]?.order_status}

                            </h3>
                          </FormGroup>
                        </Col>

                      </Row>






                    </div>
                  </div>)
                :
                (

                  <div>

                    <h6 className="heading-small text-muted mb-4">
                      Order information
                    </h6>
                    <div className="pl-lg-4">


                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Drop
                            </label>
                            <Select
                              sx={{ width: '100%' }}
                              multiple
                              value={selectedCompanies4}
                              onChange={(e) => setSelectedCompanies4(e.target.value)}
                              input={<OutlinedInput />}
                            >{console.log(804, allCompanyData)}
                              {allCompanyData &&
                                allCompanyData.map((res) => (

                                  <MenuItem
                                    key={res.id}
                                    id={res.ename}
                                    value={res.fav_company_id}
                                    // checked={selectedCompanies.includes(res.id)} // Remove this line
                                    onClick={(e) => e.stopPropagation()} // To prevent closing dropdown on checkbox click
                                    defaultChecked={res.id}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedCompanies4.includes(res.fav_company_id)}
                                      onChange={() => handleCheckboxChange4(res.fav_company_id)}

                                    />
                                    {res.ename}
                                  </MenuItem>
                                ))}
                            </Select>

                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Invoice
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-phone"
                              placeholder="Invoice"
                              type="text"
                              name='Invoice'
                              defaultValue={(orderallData || [])[0]?.invoice_id}
                              onChange={(e) => {
                                setInvoice(e.target.value);
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
                              htmlFor="input-name"
                            >
                              Gate
                            </label>

                            <Select
                              sx={{ width: '100%' }}
                              multiple
                              value={selectedCompaniesGate}
                              onChange={(e) => setSelectedCompaniesGate(e.target.value)}
                              input={<OutlinedInput />}
                            >

                              {gateID &&
                                gateID.map((res) => (

                                  <MenuItem
                                    key={res.gate_id}
                                    id={res.ename}
                                    value={res.gate_id}
                                    // checked={selectedCompanies.includes(res.id)} // Remove this line
                                    onClick={(e) => e.stopPropagation()} // To prevent closing dropdown on checkbox click
                                    defaultChecked={res.gate_id}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedCompaniesGate.includes(res.gate_id)}
                                      onChange={() => handleCheckboxChangeGate(res.gate_id)}

                                    />
                                    {res.ename}
                                  </MenuItem>
                                ))}
                            </Select>
                            {/* <select
                              name='status'
                              //value={addForm.status}
                              onChange={(e) => setGate(e.target.value)}
                              // defaultValue={planId ? planId.gate_name : ""}

                              className='form-control input-group-alternative'
                            >

                              {gateID && gateID.map((res) => {

                                // console.log(723, res)
                                return (<>
                                  <option

                                    value={res.id}
                                  >{res.ename}</option>
                                </>)
                              })}


                            </select> */}

                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Driver
                            </label>
                            <Select
                              sx={{ width: '100%' }}
                              multiple
                              value={selectedCompaniesDriver}
                              onChange={(e) => setSelectedCompaniesDriver(e.target.value)}
                              input={<OutlinedInput />}
                            >

                              {getOrder &&
                                getOrder.map((res) => (

                                  <MenuItem
                                    key={res.driver_id}
                                    id={res.first_name}
                                    value={res.driver_id}
                                    // checked={selectedCompanies.includes(res.id)} // Remove this line
                                    onClick={(e) => e.stopPropagation()} // To prevent closing dropdown on checkbox click
                                    defaultChecked={res.driver_id}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedCompaniesDriver.includes(res.driver_id)}
                                      onChange={() => handleCheckboxChangeDriver(res.driver_id)}

                                    />
                                    {res.first_name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {/* <select
                              name='status'
                              //value={addForm.status}
                              onChange={(e) => setDriver(e.target.value)}
                              className='form-control input-group-alternative'
                            >

                              {getOrder && getOrder.map((res) => {

                                console.log(723, res)
                                return (<>
                                  <option value={res.driver_id}>{res.first_name}</option>
                                </>)
                              })}

                            </select> */}
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
                              Date
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                              <DemoContainer components={['DatePicker', 'DatePicker']} >

                                <DatePicker
                                  sx={{ width: '100%' }}
                                  label="Controlled picker"
                                  value={date}
                                  format="YYYY-MM-DD"
                                  minDate={dayjs()}  // Set minDate to the start of the current day
                                  onChange={(newValue) => setDate(newValue)}
                                />
                              </DemoContainer>
                            </LocalizationProvider>


                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Truck
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-phone"
                              placeholder="Number Of Trucks"
                              type="text"
                              name='phone'
                              defaultValue={(orderallData || [])[0]?.number_of_trucks}
                              onChange={(e) => {
                                setTruck(e.target.value);
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Button
                        style={{ float: "right" }}
                        onClick={OredrUpdate}
                        color="primary" type="submit">
                        Update
                      </Button>
                    </div>
                  </div>




                )}

            </CardBody>
          </Card>
        </Col>
      </Container>

      <Container className="mt-5" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="6">
                  <h3 className="mb-0"
                  >Created By Company Detalis </h3>
                </Col>
                {/* {data ?
                  (
                    <Col className="text-right" xs="6" >

                      <Button
                        style={{ width: "4vw", marginLeft: "-15%" }}
                        color="primary"
                        onClick={() => { Clicked(); AddFavApiFunc() }}

                        size="sm"
                      >
                        {" "}
                        <Edit style={{ fontSize: "1.1vw" }} />
                        <span style={{ fontSize: ".7vw" }}>Edit</span>
                      </Button>
                    </Col>) :
                  (<Col className="text-right" xs="6">

                    <Button

                      color="primary"
                      onClick={() => setData(true)}
                      size="sm"
                    >
                      {" "}

                      <span style={{ fontSize: ".7vw" }}>Cancel</span>
                    </Button>
                  </Col>)} */}

                <Col className="text-right" xs="1">


                </Col>

              </Row>
            </CardHeader>
            <CardBody>
              <div>
                <h6 className="heading-small text-muted mb-4">
                  Order information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">

                      <label
                        className="form-control-label"
                        htmlFor="input-shortname"
                      >
                        Company Name
                      </label>

                      <h3>
                        {(orderallData || [])[0]?.pickup_point.ename}
                      </h3>


                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-arabicname"
                        >
                          Latitude
                        </label>
                        <h3>
                          {(orderallData || [])[0]?.pickup_point.lat}
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
                          Longitude
                        </label>
                        <h3>
                          {(orderallData || [])[0]?.pickup_point.long}
                        </h3>
                      </FormGroup>
                    </Col>


                  </Row>






                </div>
              </div>

            </CardBody>
          </Card>
        </Col>
      </Container>

      <Container className="mt-5" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="6">
                  <h3 className="mb-0"
                  >Driver Detalis </h3>
                </Col>
                {/* {data ?
                  (
                    <Col className="text-right" xs="6" >

                      <Button
                        style={{ width: "4vw", marginLeft: "-15%" }}
                        color="primary"
                        onClick={() => { Clicked(); AddFavApiFunc() }}

                        size="sm"
                      >
                        {" "}
                        <Edit style={{ fontSize: "1.1vw" }} />
                        <span style={{ fontSize: ".7vw" }}>Edit</span>
                      </Button>
                    </Col>) :
                  (<Col className="text-right" xs="6">

                    <Button

                      color="primary"
                      onClick={() => setData(true)}
                      size="sm"
                    >
                      {" "}

                      <span style={{ fontSize: ".7vw" }}>Cancel</span>
                    </Button>
                  </Col>)} */}

                <Col className="text-right" xs="1">


                </Col>

              </Row>
            </CardHeader>
            <CardBody>
              <div>
                <h6 className="heading-small text-muted mb-4">
                  Order information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">

                      <label
                        className="form-control-label"
                        htmlFor="input-shortname"
                      >
                        Full Name
                      </label>

                      <h3>
                        {(orderallData || [])[0]?.drivers.map((resp) => resp.driver_fullName)}
                      </h3>


                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-arabicname"
                        >
                          Address
                        </label>
                        <h3>
                          {(orderallData || [])[0]?.drivers.map((resp) => resp.address)}
                        </h3>
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-name"
                        >
                          Longitude
                        </label>
                        <h3>
                          {(orderallData || [])[0]?.pickup_point.long}
                        </h3>
                      </FormGroup>
                    </Col>


                  </Row> */}






                </div>
              </div>

            </CardBody>
          </Card>
        </Col>
      </Container>


      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() => {
            setOredrStatus("Panding");
            statusAPI();
            handleClose()
          }}
        >Panding</MenuItem>
        <MenuItem
          onClick={() => {
            setOredrStatus("On the way");
            statusAPI();
            handleClose()
          }}
        >On the way</MenuItem>
        <MenuItem
          onClick={() => {
            setOredrStatus("Delivered");
            statusAPI();
            handleClose()

          }}
        >Delivered</MenuItem>
      </Menu>
    </>
  )
}

export default OrderUserDetails