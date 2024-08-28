import IndexHeader from 'components/Headers/IndexHeader'
import './favouriteCop.css'

import React, { useEffect, useState } from 'react'
import { Badge, Button, CardHeader, Col, Container, Media, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { GetCompanylist } from 'apis/CompanyApi/getCompanyList';
import { setCompanyid } from 'redux/slice/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompanyApi } from 'apis/CompanyApi/deleteCompanyApi';
import { setPlanId } from 'redux/slice/categorySlice';
import TablePagination from '@mui/material/TablePagination';
import './company.css'
import { toast } from 'react-toastify';
import { GetCompanyApi } from 'apis/CompanyApi/GetAllComany';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from '@mui/material';
// import Select from 'react-select';
import { AddFavouriteApi } from 'apis/CompanyApi/addFavourite';

import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import { GetFavouriteApi } from 'apis/CompanyApi/GetAllFavorite';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import { deleteFavouriyeApi } from 'apis/CompanyApi/DeleteFavourite';
import { setFavouriteid } from 'redux/slice/categorySlice';

const FavouriteCompany = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const navigate = useNavigate()
  const dispatch = useDispatch()



  const [showDelete, setShowDelete] = useState(false);
  const [modalTypeDelete, setModalTypeDelete] = useState("Remove");

  const onReset = () => {
    setShowDelete(!showDelete);

  };

  const companyid = useSelector((state) => state.categoryState?.companyid);
  const Favouriteid = useSelector((state) => state.categoryState?.Favouriteid);

  console.log(255, Favouriteid)

  const [getAllComany, setGetAllComany] = useState()

  const [selectedCompanies, setSelectedCompanies] = useState([]);
  console.log(37, selectedCompanies)
  const favouriteData = {
    fav_company_id: selectedCompanies

  }




  // console.log(131, favouriteData)
  const AddFavourite = () => {
    AddFavouriteApi(favouriteData).then((res) => {
      console.log(132, res)
      refrace()
      setShowAdd(!showAdd)
      // setToggleshow(true)
      if (res.status == 200) {
        toast.success(' Company Favourite List Updated');
      }
    })
  }



  const handleCheckboxChange = (value) => {
    if (selectedCompanies.includes(value)) {
      setSelectedCompanies(selectedCompanies.filter((company) => company !== value));
    } else {
      setSelectedCompanies([...selectedCompanies, value]);
    }
  };



  console.log(25, selectedCompanies)

  const [companyData, setCompanyData] = useState()
  const [toggle, setToggle] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [modalTypeAdd, setModalTypeAdd] = useState("Add");

  const handleModalClosed1 = () => {
    setModalTypeAdd("Delete");

  };
  const onReset1 = () => {
    setShowAdd(!showAdd);

  };

  const GetcComany = {
    filter: {
      id: "",
      email: "",
      company_type: "",
      created_at: ""
    },
    limit: 40,
    offset: 0
  }
  useEffect(() => {
    GetFavouriteApi().then((res) => {
      console.log(1111, res.data.data)

      setCompanyData(res.data.data)
      setToggle(true)
      // setCheck(res.data.data.filter((resp) => resp.status == 1 ? true : false))
    })
    // GetCompanyApi(GetcComany).then((res) => {
    //   console.log(54, res.data.data.rows)


    //   const defaultSelections = companyData.filter((resp) => resp.status == 1 ? true : false)
    //     .map((res) => res.id);
    //   setGetAllComany(res.data.data.rows);

    //   setSelectedCompanies(defaultSelections);

    //   console.log(124, defaultSelections)
    // })

  }, [])

  const checkData = async () => {

    GetCompanyApi(GetcComany).then((res) => {
      // console.warn(128, res.data.data.rows.filter((result) => result.status == !true ? false : true))
      console.log(54, res.data.data.rows.filter((resp) => (resp.favourite === false && resp.status === true) ? resp : ""))


      const defaultSelections = companyData.filter((resp) => resp.status == 1 ? true : false)
        .map((res) => res.fav_company_id);
      setGetAllComany(res.data.data.rows.filter((resp) => resp.status == !true ? false : true));

      setSelectedCompanies(defaultSelections);

      console.log(124, defaultSelections, companyData)
    })
  };

  const refrace = () => {
    GetFavouriteApi().then((res) => {
      // console.log(21, res)
      console.log(21, res.data.data)
      setCompanyData(res.data.data)
      setToggle(true)
    })
    // GetFavouriteApi().then((res) => {
    //   console.log(21, res)
    //   setCompanyData(res.data.data.filter((resp) => (resp.favourite === false && resp.status === true) ? resp : ""))
    // })
  }
  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedCompanies(selectedValues);
  };

  const options = getAllComany && getAllComany.map((res) => ({
    value: res.ename,
    label: res.ename,
  }));

  // =============================Delete Favouriye============================//

  const deleteData = {
    fav_company_id: localStorage.getItem('FavCompanyID')
  };
  console.log(178, deleteData)
  const deleteAPI = () => {
    deleteFavouriyeApi(deleteData).then((res) => {
      console.log(177, res)
      refrace()
      setShowDelete(!showDelete);

    })
  }
  // =======================Pagination=============================//

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
          <title>Favourite Companies</title>
        </Helmet>
      </HelmetProvider>
      <IndexHeader />
      <Container className="mt-5" fluid>
        <div className="card">
          <CardHeader className="border-0">
            <Row>
              <div className="col-6">

                <h3 className="mb-0">Favourite Companies </h3>
              </div>
              <div className="text-right col-6">

                <Button
                  id='tooltip969372949'
                  color="neutral"
                  onClick={() => {
                    setShowAdd(!showAdd);
                    checkData()
                  }}
                  size="sm"
                >
                  <span className='mr-2'>
                    <i className="fas fa-user" />
                  </span>
                  <span className='btn-inner--text' >Add To Favourite</span>
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
                {/* <th scope='col'>Type</th> */}
                {/* <th scope="col">Status</th>
                <th scope="col">Action</th> */}
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>
              {companyData && companyData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((res) => {
                return (
                  <>
                    <tr>

                      <th scope="row">
                        <Media className="align-items-center">
                          <Media
                            onClick={() => {
                              dispatch(setCompanyid(res))
                              dispatch(setPlanId(res.id))
                              sessionStorage.setItem('FavCompanyID', res.id)
                              navigate(`/admin/favouriteUser/${res.ename}`)
                            }}
                          >
                            <span className="mb-0 text-sm span-hover">
                              {res.ename}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        {res.email}
                      </td>
                      <td>
                        {res.e_name}
                      </td>
                      <td onClick={() => {
                        localStorage.setItem('FavCompanyID', res.fav_company_id)
                        dispatch(setFavouriteid(res.fav_company_id));
                        setShowDelete(!showDelete);
                      }}>
                        <Checkbox checked={true} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "gold" }} />} />

                      </td>


                      {/* {res.status == 1 ? <td style={{ color: "green" }}>Active</td> : <td style={{ color: "red" }}>Inactive</td>} */}


                      {/* <td className="table-actions">
                        <>
                          <a href={() => false} id="tooltip611234743" className="table-action"
                            style={{ cursor: "pointer" }}

                          ><i className="fas fa-user-edit"
                            // onClick={() => {
                            //   dispatch(setCompanyid(res.id))
                            //   dispatch(setPlanId(res))
                            //   navigate(`/admin/updatecompany/${res.id}`)



                            // }}

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

                          // onClick={() => {
                          //   dispatch(setCompanyid(res.id))
                          //   setShowDelete(!showDelete);

                          // }}
                          /></a>
                          <UncontrolledTooltip
                            delay={0}
                            placement="top"
                            target="tooltip601065234"
                          >
                            Delete Company
                          </UncontrolledTooltip>
                        </>

                      </td> */}
                    </tr>

                  </>
                )
              })}



            </tbody>


          </Table>

          <TablePagination sx={{ marginTop: "1%" }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            //  count={rows.length}
            count={companyData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            color="primary"
            variant="outlined" shape="rounded"
          />

        </div>

      </Container>

      <Modal
        isOpen={showAdd}
        onClosed={handleModalClosed1}
        toggle={() => setShowAdd(!showAdd)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowAdd(!showAdd)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4" style={{ marginTop: "-5%" }}>
            <h4>  {modalTypeAdd} To Favourite</h4>

          </div>
          <Row tag="form">
            <Col className="text-center " xs={12}>


              <Select
                sx={{ width: 500 }}
                multiple
                value={selectedCompanies}
                onChange={(e) => setSelectedCompanies(e.target.value)}
                input={<OutlinedInput />}
              >
                {getAllComany &&
                  getAllComany.map((res) => (
                    <MenuItem
                      key={res.id}
                      id={res.ename}
                      value={res.id}
                      // checked={selectedCompanies.includes(res.id)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(res.id)}
                        onChange={() => handleCheckboxChange(res.id)}
                      />
                      {res.ename}
                    </MenuItem>
                  ))}
              </Select>



            </Col>
            <Col style={{ marginTop: "15%" }} className="text-center " xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {

                  AddFavourite()
                }}
              >
                Submit
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" onClick={() => { onReset1(); }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>


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
            <h4> Are You Sure You want to {modalTypeDelete} This Favorite Company</h4>

          </div>
          <Row tag="form">

            <Col className="text-center mt-2" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  deleteAPI();


                }}
              >
                Remove
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" onClick={() => { onReset(); }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
}

export default FavouriteCompany