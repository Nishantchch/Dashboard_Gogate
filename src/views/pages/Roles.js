import React, { useEffect, useState } from 'react'
import './Css/role.css'
import IndexHeader from 'components/Headers/IndexHeader'
import { Badge, Button, CardHeader, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, InputGroup, Label, Media, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip, } from 'reactstrap'
import RolesModels from 'components/Models/RolesModels'
import { Box, Pagination, Select, TablePagination } from '@mui/material'
import { AddRole } from 'apis/RolesApi/addRoleApi'
import { GetAllRole } from 'apis/RolesApi/getAllRole'
import { UpdateRoleApi } from 'apis/RolesApi/roleUpdateApi'
import { useDispatch, useSelector } from 'react-redux';
import { setPlanId, setUserid } from '../../redux/slice/categorySlice';
import { deleteRoleApi } from 'apis/RolesApi/deleteApi'
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { useNavigate, useParams } from 'react-router-dom'
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AddUser } from 'apis/User/AddUser'
import { GetAllUser } from 'apis/User/GetUserApli'
import { UserUpdataApi } from 'apis/User/UserUpdateApi'
import { toast } from 'react-toastify';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { UserDeleteAPI } from 'apis/User/UserDeleteApi'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { SuperAdminGateListApi } from 'apis/Gates/SuperAdminGateList'
import { AddCompanyStaffApi } from 'apis/CompanyApi/CompanyStaff/AddCompanyStaff'
import { GetCompanyStaff } from 'apis/CompanyApi/CompanyStaff/getCompanyStaff'
import { GetAllSuperUser } from 'apis/User/UserListSuperAdmin'
import { GetAllGateList } from 'apis/Gates/getAllGateList'
import { UpdateCompanyStaffApi } from 'apis/CompanyApi/CompanyStaff/UpdateStaff'
import { deleteCompanyStaffApi } from 'apis/CompanyApi/CompanyStaff/DeleteCompanyStaffApi'
import GatesModels from 'components/GatesModel/GatesModel'
const Roles = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modelStatus1, setModelStatus1] = useState(false);

  const fun_checkModelGate = () => {
    setModelStatus1(pre => !pre)
    refraceGate()
  }
  const [value, setValue] = useState('1');
  const handleChange1 = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };



  const [roleNameDrop, setRoleNameDrop] = useState('');
  console.log(43, roleNameDrop)



  const [modelStatus, setModelStatus] = useState(false);
  const [allData, setAllData] = useState('');

  const [showEdit, setShowEdit] = useState(false);
  const [modalTypeEdit, setModalTypeEdit] = useState("Update");

  const [updateName, setUpdateName] = useState();
  const [updateDescription, setUpdateDescription] = useState();


  const [showDelete, setShowDelete] = useState(false);
  const [modalTypeDelete, setModalTypeDelete] = useState("Delete");


  const [superGateData, setSuperGateData] = useState()

  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const handleCheckboxChange = (value) => {
    if (selectedCompanies.includes(value)) {
      setSelectedCompanies(selectedCompanies.filter((company) => company !== value));
    } else {
      setSelectedCompanies([...selectedCompanies, value]);
    }
  };
  console.log(41, selectedCompanies)

  const [showAddUser, setShowAddUser] = useState(false);
  const [modalTypeAddUser, setModalTypeAddUser] = useState("Add");


  const [addGetAllData, setAddGetAllData] = useState()
  console.log(70, addGetAllData)

  const [showUserEdit, setShowUserEdit] = useState(false);
  const [modalTypeUserEdit, setModalTypeUserEdit] = useState("Update");

  // const [updateUserName, setUpdateUserName] = useState()
  // const [updateEmail, setUpdateEmail] = useState()
  // const [updatePhone, setUpdatePhone] = useState()
  // const [updatePassword, setUpdatePassword] = useState()
  console.log(82, updaterole)
  const [addUserRoleID, setAddUserRoleID] = useState()
  const [showSuperData, setShowSuperData] = useState()

  const [showUserDelete, setShowUserDelete] = useState(false);
  const [modalTypeUserDelete, setModalTypeUserDelete] = useState("Delete");

  const [allGateCA, setAllGataCA] = useState()

  // const [rowsPerPage, setRowsPerPage] = useState(4)

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setCurrentPage('1');
  // };
  console.log(60, addUserRoleID)

  const fun_checkModel = () => {
    setModelStatus(!modelStatus)
    refrance()
  }

  const planId = useSelector((state) => state.categoryState?.planId);
  const userid = useSelector((state) => state.categoryState?.userid);


  const handleModalClosed = () => {
    setModalTypeEdit("Update");
  };
  const handleModalClosed1 = () => {
    setModalTypeDelete("Delete");
  };

  const handleModalCloseduser = () => {
    setModalTypeUserDelete("Delete");
  };

  const onReset = () => {
    setShowEdit(!showEdit);

  };
  const onReset1 = () => {
    setShowDelete(!showDelete);

  };
  const userClose = () => {
    setShowAddUser(!setShowAddUser);

  };
  const updateClose = () => {
    setShowUserEdit(!showUserEdit);

  };

  const handleModalClosedADD = () => {
    setModalTypeAddUser('Add')
  }

  const handleModalClosedUser = () => {
    setModalTypeUserEdit('Update')
  }


  // const userDataID = {
  //   id: localStorage.getItem('Login_companyId')
  // }

  // ===================Get All Role Api ===============//
  useEffect(() => {
    GetAllRole().then((res) => {
      console.log(102, res)
      // console.log(30, res.data.data.rows.filter((resp) => resp.status == !true ? false : true))
      if (res.status == 200) {
        setAllData(res.data.data
          .filter((resp) => resp.status == !true ? false : true)
        )


      } else {
        toast.error('You do not have required permission.');

      }
    })



    GetCompanyStaff().then((res) => {
      console.log(1111, res.data.data.data)
      setAddGetAllData(res.data.data.data
        .filter((resp) => resp.user_status == !1 ? 0 : 1)
      )
    })


    SuperAdminGateListApi().then((res) => {
      console.log(254, res.data.data)
      setSuperGateData(res.data.data)
    })

    GetAllGateList().then((res) => {
      console.log(266, res.data.data)
      setAllGataCA(res.data.data)
    })


  }, [])

  const refraceGate = () => {
    GetAllGateList().then((res) => {
      console.log(266, res.data.data)
      setAllGataCA(res.data.data)
    })
  }
  const refrance = () => {
    GetAllRole().then((res) => {
      console.log(172, res)
      setAllData(res.data.data
        .filter((resp) => resp.status == !true ? false : true)
      )
    })
  }

  const superUserApi = () => {
    GetAllSuperUser().then((res) => {
      console.log(199, res.data.data.data)
      setShowSuperData(res.data.data.data)
    })
  }


  //=============================Updata Role==================//

  const updateData = {
    id: localStorage.getItem('RoleId'),
    name: updateName == undefined ? planId?.name : updateName,
    description: updateDescription == undefined ? planId?.description : updateDescription,
    status: true
  }
  console.log(79, updateData)
  const UpdataApi = () => {
    UpdateRoleApi(updateData).then((res) => {
      console.log(51, res)
      refrance()
      setShowEdit(!showEdit);
    })
  }

  //=========================Delete  Api========================//
  const deleteData = {
    id: localStorage.getItem('deleteId')
  }
  console.log(102, deleteData)
  const DeleteApi = () => {
    deleteRoleApi(deleteData).then((res) => {
      console.log(92, res)
      refrance()
      setShowDelete(!showDelete);

    })
  }

  //=======================getAll User=================================//

  const reffGetUser = async () => {
    // setTimeout(() => {
    await
      GetCompanyStaff().then((res) => {
        console.log(110, res.data.data.data)
        setAddGetAllData(res.data.data.data
          .filter((resp) => resp.user_status == !1 ? 0 : 1)
        )
      })

  }
  // }, 1000);



  // =======================UserAdd ==================================//
  const [addName, setAddName] = useState()
  const [addLastName, setLastName] = useState()
  const [addEmail, setAddEmail] = useState()
  const [addPhone, setAddPhone] = useState()
  const [addPassword, setAddPassword] = useState()
  const [addWorkPhone, setAddWorkPhone] = useState()
  const [selectedCompanyAdd, setSelectedCompanyAdd] = useState([]);


  const handleCheckboxChangeAdd = (value) => {
    if (selectedCompanyAdd.includes(value)) {
      setSelectedCompanyAdd(selectedCompanyAdd.filter((company) => company !== value));
    } else {
      setSelectedCompanyAdd([...selectedCompanyAdd, value]);
    }
  };
  console.log(41, selectedCompanyAdd)


  const AdduserData = {
    company_id: localStorage.getItem('Login_companyId'),
    first_name: addName,
    last_name: addLastName,
    email: addEmail,
    password: addPassword,
    phone_id: addPhone,
    gate_id: selectedCompanyAdd,
    role_id: roleNameDrop,
    comm_phone: addWorkPhone,
  }
  const UserAddData = () => {
    AddCompanyStaffApi(AdduserData).then((res) => {
      console.log(77, res)
      reffGetUser();
      setShowAddUser(!showAddUser)

      // navigate('/admin/companies/staff/:cid')
      // if (res.status == 200) {
      //   toast.success('User Created');
      // }
      // else {
      //   // setShowAddUser(!showAddUser)
      //   toast.error('kindly fill all the field');


      // }
      //  console.log(48, res.data.error.message)
      // toast.success(res.data.error.message);

    })
    // AddUser(AdduserData).then((res) => {
    //   console.log(171, res)
    //   reffGetUser()
    //   setShowAddUser(!showAddUser)
    // })
  }

  //================================== Update User===========================//

  const [updateUserName, setupdateUserName] = useState()
  const [updateLastName, setUpdateLastName] = useState()
  const [updateEmail, setupdateEmail] = useState()
  const [updatePhone, setupdatePhone] = useState()
  const [updatePassword, setupdatePassword] = useState()
  const [updateWorkPhone, setupdateWorkPhone] = useState()
  const [updaterole, setUpdaterole] = useState('');

  const [selectedCompanyupdate, setSelectedCompanyupdate] = useState([]);

  const handleCheckboxChangeUpdate = (value) => {
    if (selectedCompanyupdate.includes(value)) {
      setSelectedCompanyupdate(selectedCompanyupdate.filter((company) => company !== value));
    } else {
      setSelectedCompanyupdate([...selectedCompanyupdate, value]);
    }
  };

  const userUpdateData = {
    id: userid ? userid : "",

    // company_id: localStorage.getItem('Login_companyId'),
    first_name: updateUserName == undefined ? planId?.first_name : updateUserName,
    last_name: updateLastName == undefined ? planId?.last_name : updateLastName,
    email: updateEmail == undefined ? planId?.email : updateEmail,
    password: updatePassword,
    phone_id: updatePhone == undefined ? planId?.phone_id : updatePhone,
    gate_id: selectedCompanyupdate,
    role_id: updaterole,
    comm_phone: updateWorkPhone == undefined ? planId?.comm_phone : updateWorkPhone,

    // first_name: updateUserName,
    // last_name: updateLastName,
    // email: planId ? planId.email : "",
    // phone: updatePhone,
    // status: true,
    // password: updatePassword,
    // admin_role_id: updaterole
  }
  console.log(369, userUpdateData)

  const UserUpdate = () => {
    UpdateCompanyStaffApi(userUpdateData).then((res) => {
      console.log(236, res)
      reffGetUser()
      setShowUserEdit(!showUserEdit)

    })
  }
  //=============================User Delete Api ==========================//

  const userDeleteData = {
    id: userid ? userid : "",
  }
  console.log(384)
  const UserDelete = () => {
    deleteCompanyStaffApi(userDeleteData).then((res) => {
      console.log(272, res)
      reffGetUser()
      setShowUserDelete(!showUserDelete);
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
          <title>Roles & User</title>
        </Helmet>
      </HelmetProvider>
      <IndexHeader />

      <Container className="mt-5" fluid>
        <div className="card">
          <CardHeader className="border-0">

            <Row>
              <div className="col-12" style={{}}>
                <TabContext value={value}>

                  <TabList onChange={handleChange1} aria-label="lab API tabs example">
                    <Tab label="Role" value="1" />
                    {localStorage.getItem('_role') == 'SuperAdmin' ? (
                      <Tab
                        onClick={() => { superUserApi(); }}
                        label="User" value="2" />

                    ) : (
                      <Tab

                        label="User" value="2" />

                    )}

                  </TabList>
                  {/* ==============================Role Side================= */}
                  <TabPanel value="1" style={{ padding: "0px" }}>
                    <div className="text-right col-12" style={{ marginBottom: "1%" }}>
                      <Button
                        id='tooltip969372949'
                        color="neutral"
                        href={() => false}
                        onClick={fun_checkModel}
                        size="sm"

                      >
                        <span className='mr-2'>
                          <i className="fas fa-user" />
                        </span>
                        <span className='btn-inner--text'

                        >Add Role</span>
                      </Button>
                    </div>
                    <Table className="align-items-center table-flush" responsive >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Roles Name</th>
                          <th scope="col">Roles Description</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                          <th scope="col">Parmission</th>

                        </tr>
                      </thead>

                      {allData && allData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((res) => {
                          return (
                            <>
                              <tbody>
                                <tr>
                                  <th scope="row">
                                    <Media className="align-items-center">

                                      <Media>
                                        <span className="mb-0 text-sm">
                                          {res.name}
                                        </span>
                                      </Media>
                                    </Media>
                                  </th>
                                  <td>{res.description}</td>
                                  {res.status == 1 ? <td style={{ color: "green" }}>Active</td> : <td style={{ color: "red" }}>Inactive</td>}
                                  <td className="table-actions">
                                    <>
                                      <a href={() => false} id="tooltip611234743" className="table-action" style={{ cursor: "pointer" }}>
                                        <i className="fas fa-user-edit"
                                          onClick={() => {
                                            dispatch(setPlanId(res))
                                            localStorage.setItem("RoleId", res.id);

                                            setShowEdit(!showEdit);
                                          }}

                                        /></a>
                                      <UncontrolledTooltip
                                        delay={0}
                                        placement="top"
                                        target="tooltip611234743"
                                      >

                                        Edit role
                                      </UncontrolledTooltip>
                                    </>
                                    <>
                                      <a href={() => false} id="tooltip601065234" className="table-action" style={{ cursor: "pointer" }}>
                                        <i className="fas fa-trash"
                                          onClick={() => {
                                            localStorage.setItem('deleteId', res.id)
                                            setShowDelete(!showDelete);

                                          }}
                                        /></a>
                                      <UncontrolledTooltip
                                        delay={0}
                                        placement="top"
                                        target="tooltip601065234"
                                      >
                                        Delete role
                                      </UncontrolledTooltip>
                                    </>

                                  </td>
                                  <td>

                                    <Diversity2Icon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        navigate(`/admin/roleparmission/${res.id}`)
                                        localStorage.setItem('RoleID', res.id)
                                        localStorage.setItem("RoleName", res.name);


                                      }}
                                    />


                                  </td>
                                </tr>
                              </tbody >
                            </>)
                        }
                        )}


                      {/* <Pagination
              // className='rolePagination'
              sx={{
                marginTop: "2%",
              }}
              onChange={handleChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              count={2}
              page={rowsPerPage}
              color="primary"
              variant="outlined" shape="rounded"
            // currentPage={currentPage}
            // showFirstButton showLastButton
            /> */}
                    </Table>
                    <TablePagination sx={{ marginTop: "1%" }}
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      //  count={rows.length}
                      count={allData?.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      color="primary"
                      variant="outlined" shape="rounded"
                    />



                  </TabPanel>

                  {/* ============================User Side====================== */}
                  <TabPanel value="2">
                    <div className="text-right col-12" style={{ marginBottom: "1%" }}>
                      {localStorage.getItem('_role') == 'SuperAdmin' ? (
                        ''
                      ) : (
                        <Button
                          id='tooltip969372949'
                          color="neutral"
                          href={() => false}
                          onClick={() => setShowAddUser(!showAddUser)}

                          size="sm"
                        >
                          <span className='mr-2'>
                            <i className="fas fa-user" />
                          </span>
                          <span className='btn-inner--text'

                          >Add User</span>
                        </Button>
                      )}

                    </div>
                    {localStorage.getItem('_role') == 'SuperAdmin' ? (
                      <>
                        <Table className="align-items-center table-flush" responsive >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">User Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Role Name</th>

                              {localStorage.getItem('_role') == 'SuperAdmin' ?

                                (<th></th>) : (<th scope="col">Action</th>)}



                            </tr>
                          </thead>


                          {showSuperData && showSuperData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((res) => {
                              return (
                                <>
                                  <tbody>
                                    <tr>
                                      <th scope="row">
                                        <Media className="align-items-center">

                                          <Media>
                                            <span className="mb-0 text-sm">
                                              {res.full_name
                                              }
                                            </span>
                                          </Media>
                                        </Media>
                                      </th>
                                      <td>{res.email}</td>
                                      <td>
                                        {res.role_name}
                                      </td>
                                      <td className="table-actions">
                                        {/* <>
                                      <a href={() => false} id="tooltip611234743" className="table-action" style={{ cursor: "pointer" }}>
                                        <i className="fas fa-user-edit"
                                          onClick={() => {
                                            dispatch(setUserid(res.user_id))
                                            dispatch(setPlanId(res))
                                            setShowUserEdit(!showUserEdit)
                                            localStorage.setItem('UserType', res.user_type)
                                          }}

                                        /></a>
                                      <UncontrolledTooltip
                                        delay={0}
                                        placement="top"
                                        target="tooltip611234743"
                                      >

                                        Edit User
                                      </UncontrolledTooltip>
                                    </> */}
                                        <>
                                          {localStorage.getItem('_role') == 'SuperAdmin' ?

                                            ("")
                                            : (
                                              <>
                                                <a href={() => false} id="tooltip601065234" className="table-action" style={{ cursor: "pointer" }}>
                                                  <i className="fas fa-trash"
                                                    onClick={() => {
                                                      setShowUserDelete(!showUserDelete)
                                                      dispatch(setUserid(res.user_id))
                                                    }}
                                                  /></a>
                                                <UncontrolledTooltip
                                                  delay={0}
                                                  placement="top"
                                                  target="tooltip601065234"
                                                >
                                                  Delete User
                                                </UncontrolledTooltip>
                                              </>
                                            )}

                                        </>

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
                          count={showSuperData?.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          color="primary"
                          variant="outlined" shape="rounded"
                        />

                      </>

                    ) : (

                      <>
                        <Table className="align-items-center table-flush" responsive >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">User Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Role Name</th>
                              <th scope="col">Action</th>


                            </tr>
                          </thead>


                          {addGetAllData && addGetAllData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((res) => {
                              return (
                                <>
                                  <tbody>
                                    <tr>
                                      <th scope="row">
                                        <Media className="align-items-center">

                                          <Media>
                                            <span className="mb-0 text-sm">
                                              {res.full_name
                                              }
                                            </span>
                                          </Media>
                                        </Media>
                                      </th>
                                      <td>{res.email}</td>
                                      <td>
                                        {res.role_name}
                                      </td>
                                      <td className="table-actions">
                                        <>
                                          <a href={() => false} id="tooltip611234743" className="table-action" style={{ cursor: "pointer" }}>
                                            <i className="fas fa-user-edit"
                                              onClick={() => {
                                                dispatch(setUserid(res.user_id))
                                                dispatch(setPlanId(res))
                                                setShowUserEdit(!showUserEdit)
                                                localStorage.setItem('UserType', res.user_type)
                                              }}

                                            /></a>
                                          <UncontrolledTooltip
                                            delay={0}
                                            placement="top"
                                            target="tooltip611234743"
                                          >

                                            Edit User
                                          </UncontrolledTooltip>
                                        </>
                                        <>
                                          <a href={() => false} id="tooltip601065234" className="table-action" style={{ cursor: "pointer" }}>
                                            <i className="fas fa-trash"
                                              onClick={() => {
                                                setShowUserDelete(!showUserDelete)
                                                dispatch(setUserid(res.user_id))
                                              }}
                                            /></a>
                                          <UncontrolledTooltip
                                            delay={0}
                                            placement="top"
                                            target="tooltip601065234"
                                          >
                                            Delete User
                                          </UncontrolledTooltip>
                                        </>

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
                          count={addGetAllData?.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          color="primary"
                          variant="outlined" shape="rounded"
                        />

                      </>

                    )}


                  </TabPanel>

                </TabContext>
              </div>

            </Row>
          </CardHeader>



        </div>
      </Container >
      <GatesModels modelStatus={modelStatus1} fun_checkModel={fun_checkModelGate} />

      <RolesModels modelStatus={modelStatus} fun_checkModel={fun_checkModel} />

      {/* ===========================Update Model============================== */}
      <Modal
        isOpen={showEdit}
        onClosed={handleModalClosed}
        toggle={() => setShowEdit(!showEdit)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowEdit(!showEdit)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4">
            <h1>{modalTypeEdit} Role</h1>

          </div>
          <Row tag="form">
            <Col xs={12}>
              <Label className="form-label" for="roleName">
                Role Name
              </Label>
              <InputGroup className="input-group-alternative">
                <Input
                  defaultValue={planId ? planId.name : ""}
                  onChange={(e) => setUpdateName(e.target.value)}
                // placeholder={localStorage.getItem('role_name')}
                />
              </InputGroup>

            </Col>

            <Col xs={12}>
              <Label className="form-label" for="roleName">
                Role Description
              </Label>
              <InputGroup className="input-group-alternative">
                <Input
                  defaultValue={planId ? planId.description : ""}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                // placeholder={localStorage.getItem('role_name')}
                />
              </InputGroup>

            </Col>

            <Col className="text-center mt-2" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  UpdataApi();

                }}
              >
                Submit
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" onClick={() => { onReset(); }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      {/* ===========================Delete model======================== */}

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
            <h4> Are You Sure You want to {modalTypeDelete} This Role</h4>

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

      {/* ==========================User Add=============================== */}

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
          <div className="text-center " style={{ marginTop: "-5%" }}>
            <h4> {modalTypeAddUser} User</h4>

          </div>
          <Row tag="form">
            <Col xs={12}>

              <label
                className="form-control-label"
                htmlFor="input-gate"
              >
                first Name
              </label>

              <InputGroup className="input-group-alternative">
                <Input
                  type="text" placeholder="Name"
                  onChange={(e) => setAddName(e.target.value)}

                />
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Last Name
              </label>
              <InputGroup className="input-group-alternative mt-1">
                <Input placeholder=" Last Name" type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Email
              </label>
              <InputGroup className="input-group-alternative mt-1">
                <Input placeholder=" Email" type="text"
                  onChange={(e) => setAddEmail(e.target.value)}
                />
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Phone
              </label>
              <InputGroup className="input-group-alternative mt-1">
                <Input placeholder=" Phone" type="text"
                  onChange={(e) => setAddPhone(e.target.value)}
                />
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Password
              </label>
              <InputGroup className="input-group-alternative mt-1">
                <Input placeholder="Password" type="password"
                  onChange={(e) => setAddPassword(e.target.value)}
                />
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Work Phone
              </label>

              <InputGroup className="input-group-alternative mt-1">
                <Input placeholder="phone" type="number"
                  onChange={(e) => setAddWorkPhone(e.target.value)}
                />
              </InputGroup>


              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Gate
              </label>
              <Button size='small' onClick={fun_checkModelGate} style={{ marginLeft: "2%", fontSize: ".6vw", marginTop: "1%" }}>Add Gates</Button>

              <InputGroup className="input-group-alternative mt-1">

                <Select
                  name='gate_id'
                  // value={addForm.gate_id}
                  // onChange={(event) => {
                  //   fun_formHandler(event);
                  // }}
                  multiple
                  value={selectedCompanyAdd}
                  onChange={(e) => setSelectedCompanyAdd(e.target.value)}

                  className="form-control"
                // onChange={(e) => setCountryOption(e.target.value)}

                >
                  {allGateCA &&
                    allGateCA.map((res) => (
                      <MenuItem
                        key={res.gate_id}
                        id={res.ename}
                        value={res.gate_id}
                        checked={selectedCompanyAdd.includes(res.gate_id)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCompanyAdd.includes(res.gate_id)}
                          onChange={() => handleCheckboxChangeAdd(res.gate_id)}
                        />
                        {res.ename}
                      </MenuItem>
                    ))}




                </Select>
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Roles
              </label>

              <FormGroup>
                <InputGroup className="input-group-alternative  mt-1"
                >
                  <select className='form-control' onChange={(e) => setRoleNameDrop(e.target.value)}
                  >
                    {allData && allData.map((res) => {

                      console.log(723, res)
                      return (<>
                        <option value={res.id}>{res.name}</option>
                      </>)
                    })}

                  </select>
                </InputGroup>
              </FormGroup>

            </Col>


            <Col className="text-center mt-5" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  UserAddData()

                }}
              >
                Submit
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" onClick={() => {
                userClose()

              }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      {/* ========================== UpDate User================== */}

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
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4">
            <h1>{modalTypeUserEdit} User</h1>

          </div>
          <Row tag="form">

            <Col xs={12}>

              <label
                className="form-control-label"
                htmlFor="input-gate"
              >
                first Name
              </label>

              <InputGroup className="input-group-alternative">
                <Input
                  type="text" placeholder="Name"
                  defaultValue={planId ? planId.first_name : ""}
                  onChange={(e) => setupdateUserName(e.target.value)}

                />
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Last Name
              </label>
              <InputGroup className="input-group-alternative mt-1">
                <Input placeholder=" Last Name" type="text"
                  onChange={(e) => setUpdateLastName(e.target.value)}
                  defaultValue={planId ? planId.last_name : ""}
                />
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Email
              </label>
              <InputGroup className="input-group-alternative mt-1">
                <Input placeholder=" Email" type="text"
                  onChange={(e) => setupdateEmail(e.target.value)}
                  defaultValue={planId ? planId.email : ""}
                />
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Phone
              </label>
              <InputGroup className="input-group-alternative mt-1">
                <Input placeholder=" Phone" type="text"
                  defaultValue={planId ? planId.phone_id : ""}
                  onChange={(e) => setupdatePhone(e.target.value)}
                />
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Password
              </label>
              <InputGroup className="input-group-alternative mt-1">
                <Input placeholder="Password" type="password"
                  onChange={(e) => setupdatePassword(e.target.value)}
                />
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Work Phone
              </label>

              <InputGroup className="input-group-alternative mt-1">
                <Input placeholder="work phone" type="text"
                  defaultValue={planId ? planId.comm_phone : ""}
                  onChange={(e) => setupdateWorkPhone(e.target.value)}
                />
              </InputGroup>


              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Gate
              </label>
              <InputGroup className="input-group-alternative mt-1">

                <Select
                  name='gate_id'
                  // value={addForm.gate_id}
                  // onChange={(event) => {
                  //   fun_formHandler(event);
                  // }}
                  multiple
                  value={selectedCompanyupdate}
                  onChange={(e) => setSelectedCompanyupdate(e.target.value)}

                  className="form-control"
                // onChange={(e) => setCountryOption(e.target.value)}

                >
                  {allGateCA &&
                    allGateCA.map((res) => (
                      <MenuItem
                        key={res.gate_id}
                        id={res.ename}
                        value={res.gate_id}
                        checked={selectedCompanyupdate.includes(res.gate_id)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCompanyupdate.includes(res.gate_id)}
                          onChange={() => handleCheckboxChangeUpdate(res.gate_id)}
                        />
                        {res.ename}
                      </MenuItem>
                    ))}




                </Select>
              </InputGroup>

              <label
                style={{ marginTop: "1%" }}
                className="form-control-label"
                htmlFor="input-gate"
              >
                Roles
              </label>

              <FormGroup>
                <InputGroup className="input-group-alternative  mt-1"
                >
                  <select className='form-control' onChange={(e) => setUpdaterole(e.target.value)}

                  >
                    {allData && allData.map((res) => {

                      console.log(723, res)
                      return (<>
                        <option value={res.id}
                          defaultValue={planId ? planId.role_name : ""}
                        >{res.name}</option>
                      </>)
                    })}

                  </select>
                </InputGroup>
              </FormGroup>

            </Col>
            {/* <Col xs={12}>

              <InputGroup className="input-group-alternative">
                <Input type="text"
                  onChange={(e) => setupdateName(e.target.value)}
                  defaultValue={planId ? planId.first_name : ""}

                />
                {console.log(750, planId)}
              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" last name" type="text"
                  onChange={(e) => setUpdateLastName(e.target.value)}
                  defaultValue={planId ? planId.last_name : ""} />

              </InputGroup> <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" email" type="text"
                  onChange={(e) => setupdateEmail(e.target.value)}
                  defaultValue={planId ? planId.email : ""} />

              </InputGroup>
              <InputGroup className="input-group-alternative mt-3">
                <Input placeholder=" phone" type="text"
                  onChange={(e) => setupdatePhone(e.target.value)}
                />
              </InputGroup> <InputGroup className="input-group-alternative mt-3">
                <Input placeholder="password" type="password"
                  onChange={(e) => setupdatePassword(e.target.value)}
                />
              </InputGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative  mt-3"
                >
                  <select className='form-control' onChange={(e) => setUpdaterole(e.target.value)}
                  >
                    {allData && allData.map((res) => {

                      console.log(723, res)
                      return (<>
                        <option value={res.id}>{res.name}</option>
                      </>)
                    })}

                  </select>
                </InputGroup>
              </FormGroup>
            </Col> */}

            <Col className="text-center mt-2" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  UserUpdate();

                }}
              >
                Submit
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" onClick={() => { updateClose(); }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      {/* ===========================User Delete ======================== */}

      <Modal
        isOpen={showUserDelete}
        onClosed={handleModalCloseduser}
        toggle={() => setShowUserDelete(!showUserDelete)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowUserDelete(!showUserDelete)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4">
            <h4> Are You Sure You want to {modalTypeUserDelete} This User</h4>

          </div>
          <Row tag="form">

            <Col className="text-center mt-2" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  UserDelete();

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
    </>
  )
}

export default Roles