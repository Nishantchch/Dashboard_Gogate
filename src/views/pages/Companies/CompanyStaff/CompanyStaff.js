import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import IndexHeader from 'components/Headers/IndexHeader'
import { Badge, Button, CardHeader, Col, Container, Input, InputGroup, Media, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip } from 'reactstrap'
import { Pagination } from '@mui/material';
import { GetCompanyStaff } from 'apis/CompanyApi/CompanyStaff/getCompanyStaff';
import { useDispatch, useSelector } from 'react-redux';
import { setPlanId } from 'redux/slice/categorySlice';
import { setCompanyid } from 'redux/slice/categorySlice';
import { deleteCompanyStaffApi } from 'apis/CompanyApi/CompanyStaff/DeleteCompanyStaffApi';
import DvrIcon from '@mui/icons-material/Dvr';
import { toast } from 'react-toastify';
const CompanyStaff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const companyid = useSelector((state) => state.categoryState?.companyid);

  console.log(167, companyid)

  /** Add company */
  // const fun_AddCompany = (e) => {
  //   navigate(`/admin/companies/staff/addstaff`)
  // }

  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [currentPage, setCurrentPage] = useState('1');
  const handleChange = (value) => {
    setCurrentPage(value);
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage('1');
  }


  const [showDelete, setShowDelete] = useState(false);
  const [modalTypeDelete, setModalTypeDelete] = useState("Delete");
  const handleModalClosed1 = () => {
    setModalTypeDelete("Delete");
  };
  const onReset1 = () => {
    setShowDelete(!showDelete);

  };


  // const [showOrder, setShowOrder] = useState(false);
  // const [modalTypeOrder, setModalTypeOrder] = useState("Add");

  // const handleModalClosed2 = () => {
  //   setModalTypeOrder("Add");
  // };
  // const onReset2 = () => {
  //   setShowOrder(!showOrder);

  // };

  const [getStaff, setGetStaff] = useState()

  const GetcComany = {
    company_id: companyid ? companyid.company_id : "",
  }
  console.log(611, GetcComany)

  useEffect(() => {
    GetCompanyStaff(GetcComany).then((res) => {
      console.log(40, res)
      setGetStaff(res.data.data.data.filter((resp) => resp.user_status == !1 ? 0 : 1))

      if (res.status == 200) {
        setGetStaff(res.data.data.data.filter((resp) => resp.user_status == !1 ? 0 : 1))

      } else {
        toast.error('You do not have required permission');



      }
      // if (res.response.data.message == "You do not have required permission.") {
      //   toast.error('You do not have required permission');

      // }
    })

  }, [])

  const companyStaffRef = () => {
    GetCompanyStaff(GetcComany).then((res) => {
      console.log(40, res)
      // setGetStaff(res.data.data.data.filter((resp) => resp.user_status == !1 ? 0 : 1))

      if (res.status == 200) {
        setGetStaff(res.data.data.data.filter((resp) => resp.user_status == !1 ? 0 : 1))

      } else {
        toast.error('You do not have required permission');



      }
      // if (res.response.data.message == "You do not have required permission.") {
      //   toast.error('You do not have required permission');

      // }
    })
  }

  const deleteData = {
    id: companyid ? companyid : "",
  }
  console.log(111, deleteData)
  const DeleteApi = () => {
    deleteCompanyStaffApi(deleteData).then((res) => {
      console.log(56, res)
      setShowDelete(!showDelete);
      companyStaffRef()

    })
  }

  return (
    <>
      <IndexHeader />
      <Container className="mt-5" fluid>
        <div className="card">
          <CardHeader className="border-0">
            <Row>
              <div className="col-6">
                <h3 className="mb-0">Companies Staff </h3>
              </div>
              <div className="text-right col-6">
                <Button
                  id='tooltip969372949'
                  color="neutral"
                  onClick={() =>
                    navigate('/admin/companies/staff/addstaff', companyid ? companyid.company_id : "")

                  }
                  size="sm"
                >
                  <span className='mr-2'>
                    <i className="fas fa-user" />
                  </span>
                  <span className='btn-inner--text'>Add Staff</span>
                </Button>
              </div>
            </Row>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>

                <th scope="col">Name</th>
                <th scope="col">email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
                {/* <th scope="col">Order</th> */}

              </tr>
            </thead>


            {getStaff && getStaff.map((res) => {
              return (<>
                <tbody>
                  <tr>

                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            {res.first_name}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{res.email}</td>
                    <td>{res.role_name}</td>

                    <td className="table-actions">
                      <>
                        <a href={() => false} id="tooltip611234743" className="table-action">
                          <i className="fas fa-user-edit"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch(setCompanyid(res.user_id))
                              dispatch(setPlanId(res))
                              navigate(`/admin/updatecompanystaff/${res.user_id}`)



                            }}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          placement="top"
                          target="tooltip611234743"
                        >
                          Edit Staff
                        </UncontrolledTooltip>
                      </>
                      <>
                        <a href={() => false} id="tooltip601065234" className="table-action">
                          <i className="fas fa-trash"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch(setCompanyid(res.user_id))
                              setShowDelete(!showDelete);
                            }}
                          /></a>
                        <UncontrolledTooltip
                          delay={0}
                          placement="top"
                          target="tooltip601065234"
                        >
                          Delete Staff
                        </UncontrolledTooltip>
                      </>

                    </td>
                    {/* <td>
                      <Button

                        color="neutral"
                        onClick={() => {
                          dispatch(setCompanyid(res.user_id))

                          setShowOrder(!showOrder)

                        }}
                        size="sm"
                      >

                        <DvrIcon size="sm" />
                        <span>Add</span>

                      </Button>
                    </td> */}
                  </tr>


                </tbody>

              </>)
            })}



          </Table>


        </div>
      </Container>


      <Modal
        isOpen={showDelete}
        onClosed={handleModalClosed1}
        toggle={() => setShowDelete(!showDelete)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowDelete(!showDelete)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4">
            <h4> Are You Sure You want to {modalTypeDelete} This Staff</h4>

          </div>
          <Row tag="form">

            <Col className="text-center mt-2" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  DeleteApi();

                }}
              >
                Delete
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" onClick={() => { onReset1(); }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>


      {/* <Modal
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
          <div className="text-center mb-4">
            <h4>  {modalTypeOrder} Order</h4>

          </div>
          <Row tag="form">
            <Col xs={12}>

              <InputGroup className="input-group-alternative">
                <Input
                  type="text" placeholder="Name"
                // onChange={(e) => setAddName(e.target.value)}

                />
              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Last Name" type="text"
                // onChange={(e) => setLastName(e.target.value)}
                />
              </InputGroup> <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Email" type="text"
                // onChange={(e) => setAddEmail(e.target.value)}
                />
              </InputGroup> <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" Phone" type="text"
                // onChange={(e) => setAddPhone(e.target.value)}
                />
              </InputGroup> <InputGroup className="input-group-alternative mt-3">
                <Input placeholder="Password" type="password"
                // onChange={(e) => setAddPassword(e.target.value)}
                />
              </InputGroup>




            </Col>
            <Col className="text-center mt-4" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {

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
      </Modal> */}


    </>
  )
}

export default CompanyStaff