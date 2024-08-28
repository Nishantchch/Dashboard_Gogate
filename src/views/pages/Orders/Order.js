import IndexHeader from 'components/Headers/IndexHeader'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Badge, Button, CardHeader, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, InputGroup, Label, Media, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip, } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderApi } from 'apis/Order/deleteOrder';
import { setOrderid } from 'redux/slice/categorySlice';
import { setPlanId } from 'redux/slice/categorySlice';
import { GetCompanyApi } from 'apis/CompanyApi/GetAllComany';
import { UpdateOrderApi } from 'apis/Order/updateOrder';
import { GetAllDrivers } from 'apis/Order/getAllDrivers';
import { GetAllOrder } from 'apis/Order/getAllOrder';
import { GetGateListID } from 'apis/Order/getGateID';
import { AddOrderApi } from 'apis/Order/AddOrder';
import { toast } from 'react-toastify';
import { Menu, MenuItem, OutlinedInput, Select, TablePagination } from '@mui/material';
import { GetFavouriteApi } from 'apis/CompanyApi/GetAllFavorite';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { OrderStatusUpdateApi } from 'apis/Order/OrderStatus';

const Order = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const planId = useSelector((state) => state.categoryState?.planId);
  const orderid = useSelector((state) => state.categoryState?.orderid);

  console.log(18, planId)
  const [allCompanyData, setAllCompanyData] = useState()
  const [showDelete, setShowDelete] = useState(false);
  const [modalTypeDelete, setModalTypeDelete] = useState("Delete");
  const handleModalCloseduser = () => {
    setModalTypeDelete("Delete");
  };

  const onReset = () => {
    setShowDelete(!showDelete);

  };




  const [value, setValue] = React.useState(dayjs());
  const [value2, setValue2] = React.useState(dayjs());


  const [selectedCompanies, setSelectedCompanies] = useState([]);
  console.log(51, selectedCompanies)
  const handleCheckboxChange = (value) => {
    if (selectedCompanies.includes(value)) {
      setSelectedCompanies(selectedCompanies.filter((company) => company !== value));
    } else {
      setSelectedCompanies([...selectedCompanies, value]);
    }
  };

  const [selectedCompanies2, setSelectedCompanies2] = useState([]);

  const handleCheckboxChange2 = (value) => {
    if (selectedCompanies2.includes(value)) {
      setSelectedCompanies2(selectedCompanies2.filter((company) => company !== value));
    } else {
      setSelectedCompanies2([...selectedCompanies2, value]);
    }
  };


  const [selectedCompanies3, setSelectedCompanies3] = useState([]);

  const handleCheckboxChange3 = (value) => {
    if (selectedCompanies3.includes(value)) {
      setSelectedCompanies3(selectedCompanies3.filter((company) => company !== value));
    } else {
      setSelectedCompanies3([...selectedCompanies3, value]);
    }
  };


  const [selectedCompanies4, setSelectedCompanies4] = useState([]);

  const handleCheckboxChange4 = (value) => {
    if (selectedCompanies4.includes(value)) {
      setSelectedCompanies4(selectedCompanies4.filter((company) => company !== value));
    } else {
      setSelectedCompanies4([...selectedCompanies4, value]);
    }
  };
  // ========================for Gates==================//
  const [selectedCompaniesGate, setSelectedCompaniesGate] = useState([]);

  const handleCheckboxChangeGate = (value) => {
    if (selectedCompaniesGate.includes(value)) {
      setSelectedCompaniesGate(selectedCompaniesGate.filter((company) => company !== value));
    } else {
      setSelectedCompaniesGate([...selectedCompaniesGate, value]);
    }
  };

  // ========================for Driver==================//
  const [selectedCompaniesDrive, setSelectedCompaniesDrive] = useState([]);

  const handleCheckboxChangeDrive = (value) => {
    if (selectedCompaniesDrive.includes(value)) {
      setSelectedCompaniesDrive(selectedCompaniesDrive.filter((company) => company !== value));
    } else {
      setSelectedCompaniesDrive([...selectedCompaniesDrive, value]);
    }
  };



  const [getOrderename, setOrderename] = useState()

  const [getOrder, setGetOrder] = useState()
  const [getIDename, setIDename] = useState()

  const [gateID, setGAteID] = useState()

  const [invoice, setInvoice] = useState()
  const [trucks, setTrucks] = useState()
  const [gateTypeId, setGateTypeId] = useState()
  const [image, setImage] = useState()
  const [driverDoc, setDriverDoc] = useState()

  const [fromCompany, setFromCompany] = useState()
  const [toCompany, setToCompany] = useState()
  const [driver, setDriver] = useState()
  const [date, setDate] = useState()


  const [showUserEdit, setShowUserEdit] = useState(false);
  const [modalTypeUserEdit, setModalTypeUserEdit] = useState("Update");
  const handleModalClosedUser = () => {
    setModalTypeUserEdit('Update')
  }
  const onReset1 = () => {
    setShowUserEdit(!showUserEdit);

  };

  const [showOrder, setShowOrder] = useState(false);
  const [modalTypeOrder, setModalTypeOrder] = useState("Add");

  const handleModalClosed2 = () => {
    setModalTypeOrder("Add");
  };
  const onReset2 = () => {
    setShowOrder(!showOrder);

  };



  const [records, setRecords] = useState()
  // console.log(139, companyName)

  useEffect(() => {
    GetAllOrder().then((res) => {
      console.log(79, res.data.data.data)
      // console.log(44, res.data.data.data.filter((resp) => resp.status == !1 ? 0 : 1))
      setRecords(res.data.data.data)

    })
    // GetFavouriteApi().then((res) => {
    //   console.log(105, res)
    //   setAllCompanyData(res.data.data)
    // })
    GetAllDrivers().then((res) => {
      console.log(127, res.data.data)
      setGetOrder(res.data.data)
      // setOrderename(res.data.data[0]?.first_name)

    })
    GetGateListID().then((res) => {
      console.log(3333, res.data.data)
      setGAteID(res.data.data)
      // setIDename(res.data.data[0]?.ename)

    })

  }, [])

  const AddFavApiFunc = async () => {
    await GetFavouriteApi().then((res) => {
      console.log(105, res)
      setAllCompanyData(res.data.data)
    })
  }
  const refrace = () => {
    GetAllOrder().then((res) => {
      // console.log(44, res.data.data.data.filter((resp) => resp.status == !0 ? 1 : 0))
      setRecords(res.data.data.data)
    })
  }

  const defaultShow = async () => {
    await GetGateListID().then((res) => {
      console.log(203, res.data.data.filter((resp) => resp.gate_id == records.filter((respp) => respp.gate_type_id)))
      // ((ids) => ids == records.map((drop_points) => drop_points.drop_points.map((id) => id.includes(ids))))
      // arrayOfArrays.filter(innerArray => innerArray.includes('76d86fa9-bf4e-446b-9c82-cd79cb3f9d99'));
      // console.log(203, records.map((drop_points) => drop_points.drop_points.map((id) => id.includes())))
      // console.log(203, res.data.data.map((fav_company_id) => fav_company_id.fav_company_id.filter((ids) => ids == records.map((drop_points) => drop_points.drop_points.map((id) => id.id)))))

      // console.log(203, res.data.data.map((res) => res.fav_company_id == records.filter((ids) => ids == drop_points.map((res) => res.id))))



      // setAllCompanyData(res.data.data) drop_points.map((resp) => resp.ename)
    })
  }

  // ======================Base 64 Image==============================//

  // const UplodeImage = (e) => {
  //   console.log(284, e.target.files);
  //   const imageData = new FileReader();
  //   imageData.addEventListener("load", () => {
  //     setImage(imageData.result);
  //   });
  //   // Pass e.target.files[0] instead of e
  //   imageData.readAsDataURL(e.target.files[0]);
  // };
  // ===========================Create Order===============================//


  const OrderData = {
    invoice: invoice,
    number_of_trucks: trucks,
    gate_type_id: selectedCompaniesGate,
    status: true,
    image: image,
    // from_company: selectedCompanies,
    to_company: selectedCompanies2,
    driver: selectedCompaniesDrive,
    dispatch_date: value
  }
  console.log(128, OrderData)

  const addorderApi = () => {
    AddOrderApi(OrderData).then((res) => {
      console.log(89, res)
      refrace();
      setShowOrder(!showOrder)

      if (res.status == 200) {
        toast.success('Order Created');
      } else {

        toast.error('Something went wrong');
      }
    })
  }
  // ==============================Order Update===========================//
  const [selectedCompaniesDriverUP, setSelectedCompaniesDriverUP] = useState([]);
  const handleCheckboxChangeDriverUP = (value) => {
    if (selectedCompaniesDriverUP.includes(value)) {
      setSelectedCompaniesDriverUP(selectedCompaniesDriverUP.filter((company) => company !== value));
    } else {
      setSelectedCompaniesDriverUP([...selectedCompaniesDriverUP, value]);
    }
  };

  const [selectedCompaniesGateUP, setSelectedCompaniesGateUP] = useState([]);

  const handleCheckboxChangeGateUP = (value) => {
    if (selectedCompaniesGateUP.includes(value)) {
      setSelectedCompaniesGateUP(selectedCompaniesGateUP.filter((company) => company !== value));
    } else {
      setSelectedCompaniesGateUP([...selectedCompaniesGateUP, value]);
    }
  };

  const [invoiceUpdate, setInvoiceUpdate] = useState()
  const [trucksUpdate, setTrucksUpdate] = useState()
  // const [gateTypeIdUpdate, setGateTypeIdUpdate] = useState()
  const [imageUpdate, setImageUpdate] = useState()
  // const [fromCompanyUpdate, setFromCompanyUpdate] = useState()
  // const [toCompanyUpdate, setToCompanyUpdate] = useState()
  // const [driverUpdate, setDriverUpdate] = useState()

  const updateData = {
    id: orderid ? orderid : "",
    invoice: invoiceUpdate,
    number_of_trucks: trucksUpdate,
    gate_type_id: selectedCompaniesGateUP,
    status: true,
    image: imageUpdate,
    // from_company: selectedCompanies3,
    to_company: selectedCompanies4,
    driver: selectedCompaniesDriverUP,
    dispatch_date: value2

  }

  console.log(104, updateData)
  const OredrUpdate = () => {
    UpdateOrderApi(updateData).then((res) => {
      // console.log(106, res)
      refrace();
      setShowUserEdit(!showUserEdit)
    })
  }

  // ===============================Order Delete=============================//
  const deleteID = {
    id: planId ? planId : ""
  }
  const orderDelete = () => {
    deleteOrderApi(deleteID).then((res) => {
      // console.log(res)
      refrace();
      setShowDelete(!showDelete);
    })
  }

  // ======================= Update Order Status=========================//

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
      refrace();

    })
  }

  // ==========================Pagination=====================//


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };


  return (
    <>

      <HelmetProvider >
        <Helmet>
          <title>Order</title>
        </Helmet>
      </HelmetProvider>
      <IndexHeader />

      <Container className="mt-5" fluid>
        <div className="card">
          <CardHeader className="border-0">

            <Row>
              <div className="col-6" >
                <h3> Order</h3>
              </div>
              <div className="text-right col-6 " >
                {localStorage.getItem('_role') == 'SuperAdmin' ? (
                  ''
                ) : (
                  <Button
                    id='tooltip969372949'
                    color="neutral"

                    onClick={() => { setShowOrder(!showOrder); AddFavApiFunc() }}
                    size="sm"

                  >
                    <span className='mr-2'>
                      <i className="fas fa-user" />
                    </span>
                    <span className='btn-inner--text'

                    >Create Order</span>
                  </Button>
                )}
                {/* <Button
                  id='tooltip969372949'
                  color="neutral"

                  onClick={() => { setShowOrder(!showOrder); AddFavApiFunc() }}
                  size="sm"

                >
                  <span className='mr-2'>
                    <i className="fas fa-user" />
                  </span>
                  <span className='btn-inner--text'

                  >Create Order</span>
                </Button> */}
              </div>
            </Row>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive >
            <thead className="thead-light">
              <tr>
                <th scope="col">Company Name</th>
                <th scope="col">Invoice</th>
                <th scope="col">Date</th>
                <th scope="col">Gate Name</th>
                <th scope="col">Driver</th>
                <th scope="col">Status</th>

                <th scope="col">Action</th>


              </tr>
            </thead>

            {records && records
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((res) => {
                return (
                  <>
                    <tbody>
                      <tr>
                        <td scope="row"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/admin/orderdetails/${res.order_id}`)
                            dispatch(setOrderid(res.order_id))
                          }}>


                          {res.drop_points.map((resp) => resp.ename)}

                        </td>
                        {/* <td>
                          {res?.drop_point?.ename}
                        </td> */}

                        <td>{res.invoice_id}
                        </td>
                        <td>{res.dispatch_date.slice(-24, -14)}</td>

                        <td>{res.gate_names}</td>
                        <td> {res.drivers.map((resp) => resp.driver_firstName)}</td>

                        <td onClick={() => {

                          dispatch(setOrderid(res.order_id))


                        }}>
                          {res.order_status}

                          <KeyboardArrowDownIcon
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}

                          />
                        </td>


                        <td className="table-actions">
                          <>
                            <a className="table-action" style={{ cursor: "pointer" }}>

                              <AddLocationAltIcon

                                onClick={() => {
                                  navigate('/admin/orderMaps')
                                }}
                              />

                            </a>
                          </>


                          <>
                            {localStorage.getItem('_role') == 'SuperAdmin' ? (

                              ''
                            ) : (

                              <>
                                <a href={() => false} id="tooltip611234743" className="table-action" style={{ cursor: "pointer" }}>
                                  <i className="fas fa-user-edit"
                                    onClick={() => {
                                      dispatch(setOrderid(res.order_id))
                                      dispatch(setPlanId(res))
                                      // localStorage.setItem("RoleId", res.id);
                                      AddFavApiFunc();
                                      // setShowUserEdit(!showUserEdit)
                                      defaultShow();
                                      navigate(`/admin/orderUpdate/${res.order_id}`)
                                    }}

                                  /></a>
                                <UncontrolledTooltip
                                  delay={0}
                                  placement="top"
                                  target="tooltip611234743"
                                >

                                  Edit Order
                                </UncontrolledTooltip>
                              </>

                            )}

                          </>
                          {/* <>
                            <a href={() => false} id="tooltip601065234" className="table-action" style={{ cursor: "pointer" }}>
                              <i className="fas fa-trash"
                                onClick={() => {
                                  dispatch(setPlanId(res.order_id))
                                  setShowDelete(!showDelete);

                                }}
                              /></a>
                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target="tooltip601065234"
                            >
                              Delete Order
                            </UncontrolledTooltip>
                          </> */}



                        </td>

                      </tr>
                    </tbody >
                  </>)
              }
              )}



          </Table>


          <TablePagination sx={{ marginTop: "1%" }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            //  count={rows.length}
            count={records?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            color="primary"
            variant="outlined" shape="rounded"
          />
          {/* <nav>
                  <ul className='pagination'>
                    <ArrowBackIcon style={{ cursor: "pointer" }} onClick={() => prePage()} />


                    {
                      numbers.map((n, i) => (
                        <li style={{ cursor: "pointer" }} className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                          <a className='page-link'
                            onClick={() => changeCPage()}>{n}</a>
                        </li>
                      ))
                    }
                    <ArrowForwardIcon style={{ cursor: "pointer" }} onClick={() => nextPage()
                    } />


                  </ul>
                </nav> */}










        </div>
      </Container >

      {/* =========================Order Add============================= */}

      <Modal
        isOpen={showOrder}
        onClosed={handleModalClosed2}
        toggle={() => setShowOrder(!showOrder)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowOrder(!showOrder)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-5" style={{ marginTop: "-7%" }}>
            <h3>  {modalTypeOrder} Order</h3>

          </div>
          <Row tag="form" style={{ marginTop: "-5%" }}>
            <Col xs={12} >

              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Invoice
              </label>
              <InputGroup className="input-group-alternative mb-3">
                <Input placeholder="Enter Invoice" type="text"
                  onChange={(e) => setInvoice(e.target.value)}
                />
                {/* <select
                  name='status'
                  //value={addForm.status}
                  onChange={(e) => setInvoice(e.target.value)}
                  className='form-control input-group-alternative'
                >

                  <option value='1'>fd7424b2-a23f-404e-a4e6-a477e74fdacf</option>

                </select> */}
              </InputGroup>

              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Number Of Trucks
              </label>
              <InputGroup className="input-group-alternative mb-3 ">
                <Input placeholder="Number Of Trucks" type="text"
                  onChange={(e) => setTrucks(e.target.value)}
                />
              </InputGroup>
              <Row>
                {/* <Col lg="6">

                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Pick-Up
                  </label>
                 

                  <Select
                    sx={{ width: 340 }}
                    multiple
                    value={selectedCompanies}
                    onChange={(e) => setSelectedCompanies(e.target.value)}
                    input={<OutlinedInput />}
                  >
                    {allCompanyData &&
                      allCompanyData.map((res) => (
                        <MenuItem
                          key={res.id}
                          id={res.ename}
                          value={res.fav_company_id}

                          onClick={(e) => e.stopPropagation()}
                        // defaultChecked={res.id}
                        >
                          <input
                            type="checkbox"

                            checked={selectedCompanies.includes(res.fav_company_id)}
                            onChange={() => handleCheckboxChange(res.fav_company_id)}

                          />
                          {res.ename}
                        </MenuItem>
                      ))}
                  </Select>
                </Col> */}
                <Col lg='12'>

                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Drop
                  </label>
                  <Select
                    sx={{ width: 700 }}
                    multiple
                    value={selectedCompanies2}
                    onChange={(e) => setSelectedCompanies2(e.target.value)}
                    input={<OutlinedInput />}
                  >
                    {allCompanyData &&
                      allCompanyData.map((res) => (
                        <MenuItem
                          key={res.id}
                          id={res.ename}
                          value={res.fav_company_id}
                          onClick={(e) => e.stopPropagation()}
                        // defaultChecked={res.id}
                        >
                          <input
                            type="checkbox"
                            checked={selectedCompanies2.includes(res.fav_company_id)}
                            onChange={() => handleCheckboxChange2(res.fav_company_id)}

                          />
                          {res.ename}
                        </MenuItem>
                      ))}
                  </Select>
                </Col>
              </Row>
              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Gate Id
              </label>
              <InputGroup className="input-group-alternative mb-3">

                <Select
                  name='gate_id'
                  multiple
                  value={selectedCompaniesGate}
                  onChange={(e) => setSelectedCompaniesGate(e.target.value)}
                  input={<OutlinedInput />}

                  className="form-control"
                // onChange={(e) => setCountryOption(e.target.value)}

                >
                  {gateID &&
                    gateID.map((res) => (
                      <MenuItem
                        key={res.gate_id}
                        id={res.ename}
                        value={res.gate_id}
                        checked={selectedCompaniesGate.includes(res.gate_id)}
                        onClick={(e) => e.stopPropagation()}
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
              </InputGroup>
              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Image
              </label>
              <InputGroup className="input-group-alternative mb-3">
                <Input
                  className="form-control"
                  id="input-name"
                  placeholder="Name"
                  type="file"
                  name='logo'
                  // onChange={(e) => UplodeImage(e)}
                  onChange={(e) => setImage(e.target.value)}
                />
              </InputGroup>
              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Driver
              </label>

              <InputGroup className="input-group-alternative mb-3">

                <Select
                  name='gate_id'
                  multiple
                  value={selectedCompaniesDrive}
                  onChange={(e) => setSelectedCompaniesDrive(e.target.value)}
                  input={<OutlinedInput />}

                  className="form-control"
                // onChange={(e) => setCountryOption(e.target.value)}

                >
                  {getOrder &&
                    getOrder.map((res) => (
                      <MenuItem
                        key={res.driver_id}
                        id={res.ename}
                        value={res.driver_id}
                        checked={selectedCompaniesDrive.includes(res.driver_id)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCompaniesDrive.includes(res.driver_id)}
                          onChange={() => handleCheckboxChangeDrive(res.driver_id)}
                        />
                        {res.first_name}
                      </MenuItem>
                    ))}
                </Select>
              </InputGroup>

              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Date
              </label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    sx={{ width: '50vw' }}
                    label="Controlled picker"
                    value={value}
                    format="YYYY-MM-DD"
                    minDate={dayjs()}  // Set minDate to the start of the current day
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>

            </Col>
            <Col className="text-center mt-4" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  addorderApi()
                }}
              >
                Order
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" onClick={() => { onReset2(); }}>
                Cancel
              </Button>
            </Col>


          </Row>
        </ModalBody>
      </Modal>

      {/* ===========================Order Update======================== */}
      <Modal
        isOpen={showUserEdit}
        onClosed={handleModalClosedUser}
        toggle={() => setShowUserEdit(!showUserEdit)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowUserEdit(!showUserEdit)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5" >
          <div className="text-center mb-4" style={{ marginTop: "-7%" }}>
            <h1>{modalTypeUserEdit} Order</h1>

          </div>
          <Row tag="form" style={{ marginTop: "-5%" }}>
            <Col xs={12} >

              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Invoice
              </label>
              <InputGroup className="input-group-alternative mb-3">
                <Input placeholder="Enter Invoice" type="text"
                  onChange={(e) => setInvoiceUpdate(e.target.value)}

                  defaultValue={planId ? planId.invoice_id : ""}
                />
                {/* <select
                  name='status'
                  //value={addForm.status}
                  onChange={(e) => setInvoiceUpdate(e.target.value)}

                  className='form-control input-group-alternative'
                >

                  <option value='1'>fd7424b2-a23f-404e-a4e6-a477e74fdacf</option>





                </select> */}
              </InputGroup>

              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Number Of Trucks
              </label>
              <InputGroup className="input-group-alternative mb-3 ">
                <Input placeholder="Number Of Trucks" type="text"
                  onChange={(e) => setTrucksUpdate(e.target.value)}
                  defaultValue={planId ? planId.number_of_trucks : ""}
                />
              </InputGroup>
              <Row>

                <Col lg="12">

                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Drop
                  </label>
                  <InputGroup className="input-group-alternative mb-3">
                    <Select
                      sx={{ width: 700 }}
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
                  </InputGroup>

                </Col>
              </Row>
              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Gate Id
              </label>
              <InputGroup className="input-group-alternative mb-3">

                <Select
                  name='gate_id'
                  multiple
                  value={selectedCompaniesGateUP}
                  onChange={(e) => setSelectedCompaniesGateUP(e.target.value)}
                  input={<OutlinedInput />}

                  className="form-control"
                // onChange={(e) => setCountryOption(e.target.value)}

                >
                  {gateID &&
                    gateID.map((res) => (
                      <MenuItem
                        key={res.gate_id}
                        id={res.ename}
                        value={res.gate_id}
                        checked={selectedCompaniesGateUP.includes(res.gate_id)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCompaniesGateUP.includes(res.gate_id)}
                          onChange={() => handleCheckboxChangeGateUP(res.gate_id)}
                        />
                        {res.ename}
                      </MenuItem>
                    ))}

                </Select>
              </InputGroup>
              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Image
              </label>
              <InputGroup className="input-group-alternative mb-3">
                <Input
                  className="form-control"
                  id="input-name"
                  placeholder="Name"
                  type="file"
                  name='logo'
                  onChange={(e) => setImageUpdate(e.target.value)}
                />
              </InputGroup>
              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Driver
              </label>
              <InputGroup className="input-group-alternative mb-3">
                <Select
                  sx={{ width: 720 }}
                  multiple
                  value={selectedCompaniesDriverUP}
                  onChange={(e) => setSelectedCompaniesDriverUP(e.target.value)}
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
                          checked={selectedCompaniesDriverUP.includes(res.driver_id)}
                          onChange={() => handleCheckboxChangeDriverUP(res.driver_id)}

                        />
                        {res.first_name}
                      </MenuItem>
                    ))}
                </Select>
              </InputGroup>


              <label
                className="form-control-label"
                htmlFor="input-email"
              >
                Date
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker', 'DatePicker']} >

                  <DatePicker
                    sx={{ width: '50vw' }}
                    label="Controlled picker"
                    value={value2}
                    format="YYYY-MM-DD"
                    minDate={dayjs()}  // Set minDate to the start of the current day
                    onChange={(newValue) => setValue2(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>

            </Col>
            <Col className="text-center mt-4" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  OredrUpdate()
                }}
              >
                Update
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset"
                onClick={() => {
                  onReset1();
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      {/* ======================Order Delete===================== */}
      <Modal
        isOpen={showDelete}
        onClosed={handleModalCloseduser}
        toggle={() => setShowDelete(!showDelete)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowDelete(!showDelete)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4">
            <h4> Are You Sure You want to {modalTypeDelete} This Order</h4>

          </div>
          <Row tag="form">

            <Col className="text-center mt-2" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  orderDelete();

                }}
              >
                Delete
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" onClick={() => { onReset(); }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>


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
            setOredrStatus("Pending");
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

export default Order