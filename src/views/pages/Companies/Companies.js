import React, { useEffect, useState } from 'react'
import IndexHeader from 'components/Headers/IndexHeader'
import { Badge, Button, CardHeader, Col, Container, Input, InputGroup, Media, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { GetCompanylist } from 'apis/CompanyApi/getCompanyList';
import { setCompanyid } from 'redux/slice/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompanyApi } from 'apis/CompanyApi/deleteCompanyApi';
import { setPlanId } from 'redux/slice/categorySlice';
import TablePagination from '@mui/material/TablePagination';
import './company.css'
import { toast } from 'react-toastify';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CompanyActiveApi } from 'apis/CompanyApi/CompanyActiveApi';


const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const companyid = useSelector((state) => state.categoryState?.companyid);

  /** Add company */
  const fun_AddCompany = () => {
    navigate("/admin/companies/addcompany")
  }
  /** Edit company */
  // const fun_EditCompany = (e) => {
  //   navigate(`/admin/companies/edit/${e}`)
  // }
  /** Edit company */
  const fun_StaffCompany = (e) => {
    navigate(`/admin/companies/staff/${e}`)
  }
  const fun_UserDetail = (e) => {
    navigate(`/admin/companies/userdetails/${e}`)
  }

  const [addComData, setAddComData] = useState()


  const [showDelete, setShowDelete] = useState(false);
  const [modalTypeDelete, setModalTypeDelete] = useState("Delete");

  const handleModalClosed1 = () => {
    setModalTypeDelete("Delete");
  };
  const onReset1 = () => {
    setShowDelete(!showDelete);

  };

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
  // const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  //console.log(32, GetcComany)
  useEffect(() => {
    GetCompanylist(GetcComany).then((res) => {
      // console.log(65, "favourite", res.data.data.data.filter((resp) => (resp.favourite === 0 && resp.company_status === 1) ? resp : ""))

      if (res.status == 200) {
        setAddComData(res.data.data.data.filter((resp) => resp.company_status == !1 ? 0 : 1))


      } else {
        toast.error('You do not have required permission.');

      }
      // console.log(65, res.data.data.data.filter((resp) => resp.company_status == !1 ? 0 : 1))


    })


  }, [])
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered company list based on the search query
  // const filteredCompanyList = addComData ? addComData.filter(item => Object.keys(item)?.some(key =>
  //   String(item[item])?.toLowerCase().includes(searchQuery.toLowerCase())
  // )) : [];

  const filteredCompanyList = addComData ? addComData.filter(company =>
    company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.cr?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];


  const refrance = () => {
    GetCompanylist(GetcComany).then((res) => {
      //console.log(24, res.data.data.data.filter((resp) => resp.company_status == !1 ? 0 : 1))
      setAddComData(res.data.data.data.filter((resp) => resp.company_status == !1 ? 0 : 1))
    })
  }

  // ============================delete============================//
  const deleteData = {
    id: companyid ? companyid : ""
  }
  const deleteApi = () => {
    deleteCompanyApi(deleteData).then((res) => {
      //console.log(62, res)
      setShowDelete(!showDelete);
      refrance()
    })
  }

  // =======================Comapnay Active InActive==========================//
  // const [active, setActive] = useState(companyid.is_active == 1 ? true : "" && companyid.is_active == 0 ? false : "")

  const activeData = {
    id: companyid ? companyid : "",
    is_active: addComData?.filter((res) => res.company_id === companyid)[0]?.is_active == 1 ? false : true
  }
  // console.log(114, addComData?.filter((res) => res.company_id === companyid)[0]?.is_active)
  const activeInActive = () => {
    CompanyActiveApi(activeData).then((res) => {
      console.log(117, res)
      setShowDelete(!showDelete);
      refrance()
    })
  }

  // ====================Pagination==============================//
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>

      <HelmetProvider >
        <Helmet>
          <title>Companies</title>
        </Helmet>
      </HelmetProvider>

      <IndexHeader />

      <Container className="mt-5" fluid>
        <div className="card">
          <CardHeader className="border-0">
            <Row>
              <div className="col-6">

                <h3 className="mb-0">Companies </h3>
              </div>
              <div className="text-right col-5 d-flex">
                <h4>Search by email or Cr</h4>
                <InputGroup className="input-group-alternative " style={{ width: "50%", marginLeft: "2%" }}>
                  <Input
                    type="text"

                    placeholder="Search "
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                </InputGroup>

              </div>
              <div className="text-right col-1">

                <Button
                  id='tooltip969372949'
                  color="neutral"
                  onClick={fun_AddCompany}
                  size="sm"
                >
                  <span className='mr-2'>
                    <i className="fas fa-user" />
                  </span>
                  <span className='btn-inner--text' >Add Companies</span>
                </Button>


              </div>
            </Row>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                {/* <th scope="col">S.No</th> */}
                <th scope="col">Name</th>
                <th scope="col">email</th>
                <th scope="col">Country</th>
                <th scope='col'>Type</th>
                <th scope="col">Company Registration</th>

                <th scope="col">Status</th>
                <th scope="col">Action</th>


              </tr>
            </thead>
            <tbody>
              {filteredCompanyList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((res) => {
                // console.log(153, res)
                return (
                  <>
                    {
                      <tr>

                        <th scope="row">
                          <Media className="align-items-center">
                            <Media onClick={() => {
                              dispatch(setCompanyid(res))
                              dispatch(setPlanId(res.company_id))
                              sessionStorage.setItem('CompanyID', res.company_id)
                              navigate(`/admin/userdetails/${res.ename}`)
                            }}>
                              <span className="mb-0 text-sm span-hover">
                                {res.ename}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>{res.email}</td>
                        <td>{res.country_name}</td>

                        <td>{res.companyType.ename}</td>
                        <td>{res.cr}</td>

                        {res.is_active == 1 ? <td style={{ color: "green" }}>Active</td> : <td style={{ color: "red" }}>Inactive</td>}

                        <td className="table-actions">
                          <>
                            <a href={() => false} id="tooltip611234743" className="table-action"
                              style={{ cursor: "pointer" }}

                            ><i className="fas fa-user-edit"
                              onClick={() => {
                                dispatch(setCompanyid(res.company_id))
                                dispatch(setPlanId(res))
                                navigate(`/admin/updatecompany/${res.company_id}`)



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
                          <>
                            <a href={() => false} id="tooltip601065234" className="table-action"><i className="fas fa-trash"
                              style={{ cursor: "pointer" }}

                              onClick={() => {
                                dispatch(setCompanyid(res.company_id))
                                setShowDelete(!showDelete);

                              }}
                            /></a>
                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target="tooltip601065234"
                            >
                              Delete Company
                            </UncontrolledTooltip>
                          </>

                        </td>
                      </tr>}
                  </>
                )
              })}



            </tbody>


          </Table>

          <TablePagination sx={{ marginTop: "1%" }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            //  count={rows.length}
            count={addComData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            color="primary"
            variant="outlined" shape="rounded"
          />

        </div>

      </Container>

      {/* =============================delete  Module========================== */}

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
            <h4> Are You Sure You want to {modalTypeDelete} or Active & inActive This Company</h4>

          </div>
          <Row tag="form">

            <Col className="text-center mt-2" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  deleteApi();

                }}
              >
                Delete
              </Button>
              {addComData?.filter((res) => res.company_id === companyid)[0]?.is_active == 1 ?
                <Button
                  sx={{ backgroundColor: "#4bbfb8", }}
                  className="me-1"
                  variant="contained"
                  onClick={() => {
                    activeInActive();

                  }}
                >
                  Inactive
                </Button> :
                <Button
                  sx={{ backgroundColor: "#4bbfb8", }}
                  className="me-1"
                  variant="contained"
                  onClick={() => {
                    activeInActive();

                  }}
                >
                  Active
                </Button>}


              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" onClick={() => { onReset1(); }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>


    </>
  )
}

export default Companies