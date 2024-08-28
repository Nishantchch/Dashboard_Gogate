import React, { useEffect, useState } from 'react'
import IndexHeader from 'components/Headers/IndexHeader'
import { Badge, Button, Card, CardHeader, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, InputGroup, Label, Media, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip, } from 'reactstrap'
import GatesModels from 'components/GatesModel/GatesModel';
import { Pagination, TablePagination } from '@mui/material'
import { GetAllGateList } from 'apis/Gates/getAllGateList';
import { UpdateGateApi } from 'apis/Gates/updateGate';
import { useDispatch, useSelector } from 'react-redux';
import { setPlanId } from 'redux/slice/categorySlice';
import { setCompanyid } from 'redux/slice/categorySlice';
import { DeleteGateApi } from 'apis/Gates/deleteGate';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Gates = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [leti, setLeti] = useState([])
  const [lon, setLon] = useState([])
  const zoom = 16; // 15 is ideal
  const [showMap, setShowMap] = useState(false);
  const [modalTypeMap, setModalTypeMap] = useState('');
  const handleModalClosed2 = () => {
    setModalTypeMap();
  };
  const planId = useSelector((state) => state.categoryState?.planId);
  const companyid = useSelector((state) => state.categoryState?.companyid);
  console.log(16, companyid)
  const [modelStatus, setModelStatus] = useState(false);
  // const [rowsPerPage, setRowsPerPage] = useState(7)
  const [currentPage, setCurrentPage] = useState('1');



  const [showEdit, setShowEdit] = useState(false);
  const [modalTypeEdit, setModalTypeEdit] = useState("Update");
  const [gateData, setGateData] = useState()

  const [showDelete, setShowDelete] = useState(false);
  const [modalTypeDelete, setModalTypeDelete] = useState("Delete");
  const handleModalClosed1 = () => {
    setModalTypeDelete("Delete");
  };
  const onReset1 = () => {
    setShowDelete(!showDelete);

  };
  const [Ename, setEname] = useState()
  const [Aname, setAname] = useState()
  const [long, setLong] = useState()
  const [lat, setLat] = useState()

  const handleModalClosed = () => {
    setModalTypeEdit("Update");
  };
  const onReset = () => {
    setShowEdit(!showEdit);

  };
  const handleChange = (value) => {
    setCurrentPage(value);
  }

  const fun_checkModel = () => {
    setModelStatus(pre => !pre)
    refrace()
  }
  useEffect(() => {
    GetAllGateList().then((res) => {
      console.log(26, res.data.data)
      setGateData(res.data.data)
    })


  }, [])

  const maping = () => {
    setLeti(25.276987)
    setLon(55.296249)
    localStorage.setItem('latitudeGC', 25.276987)
    localStorage.setItem('longitudeGC', 55.296249)
  }


  const remove = () => {

    localStorage.removeItem('latitudeGC');
    localStorage.removeItem('longitudeGC');

  }

  const refrace = () => {
    GetAllGateList().then((res) => {
      console.log(26, res.data.data)
      setGateData(res.data.data)
    })
  }

  // ===========================update=============//

  const updateData = {

    id: planId ? planId : "",
    ename: Ename == undefined ? companyid?.ename : Ename,
    aname: Aname == undefined ? companyid?.aname : Aname,
    long: localStorage.getItem('longitudeGC'),
    lat: localStorage.getItem('latitudeGC'),

  }
  console.log(57, updateData)
  const updateAPI = () => {
    UpdateGateApi(updateData).then((res) => {
      console.log(47, res)
      refrace()
      setShowEdit(!showEdit);

    })
  }


  const deleteData = {

    id: planId ? planId : "",

  }
  const deleteAPI = () => {
    DeleteGateApi(deleteData).then((res) => {
      console.log(104, res)
      refrace()
      setShowDelete(!showDelete)
      toast.error('Gate cannot be deleted because it has some assigned company');

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
      <IndexHeader />

      <HelmetProvider >
        <Helmet>
          <title>Gates</title>
        </Helmet>
      </HelmetProvider>
      <IndexHeader />

      <Container className="mt-0" fluid>
        <div className="card">
          <CardHeader className="border-0">
            <Row>
              <div className="col-6">
                <h3 className="mb-0" onClick={() => navigate('/admin/verifiedPage')}>Companies Gates </h3>
              </div>
              <div className="text-right col-6">
                <Button
                  id='tooltip969372949'
                  color="neutral"
                  onClick={fun_checkModel
                  }
                  size="sm"
                >
                  <span className='mr-2'>
                    <i className="fas fa-user" />
                  </span>
                  <span className='btn-inner--text'>Add Gates</span>
                </Button>
              </div>
            </Row>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Lat</th>
                <th scope="col">Long</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {gateData && gateData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((res) => {
                  return (<>
                    <tr>

                      <td>{res.ename}</td>
                      <td>{res.lat}</td>
                      <td>

                        {res.long}

                      </td>
                      <td className="table-actions">
                        <>
                          <a href={() => false} id="tooltip611234743" className="table-action"><i className="fas fa-user-edit"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch(setCompanyid(res))
                              dispatch(setPlanId(res.gate_id))

                              setShowEdit(!showEdit);
                            }}
                          /></a>
                          <UncontrolledTooltip
                            delay={0}
                            placement="top"
                            target="tooltip611234743"
                          >
                            Edit Gate
                          </UncontrolledTooltip>
                        </>
                        <>
                          <a href={() => false} id="tooltip601065234" className="table-action"><i className="fas fa-trash"
                            style={{ cursor: "pointer" }}
                            onClick={() => {

                              dispatch(setPlanId(res.gate_id))

                              setShowDelete(!showDelete)
                            }}
                          /></a>
                          <UncontrolledTooltip
                            delay={0}
                            placement="top"
                            target="tooltip601065234"
                          >
                            Delete Gate
                          </UncontrolledTooltip>
                        </>

                      </td>
                    </tr>
                  </>)
                })}


            </tbody>
          </Table>


          <TablePagination sx={{ marginTop: "1%" }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            //  count={rows.length}
            count={gateData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            color="primary"
            variant="outlined" shape="rounded"
          />
          {/* <Pagination style={{ marginTop: "2%", marginLeft: "85.6%" }}
            onChange={handleChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
            count={2}
            rowsPerPage={rowsPerPage}
            color='primary'
            variant='outlined'
            shape='rounded'
            currentPage={currentPage}
            showFirstButton
            showLastButton
          /> */}
        </div>
      </Container>

      <GatesModels modelStatus={modelStatus} fun_checkModel={fun_checkModel} />

      {/* ================================Update============================ */}
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
            <h1>{modalTypeEdit} Gate</h1>

          </div>
          <Row tag="form">
            <Col xs={12}>
              <Label className="form-label" for="roleName">
                Gate Name
              </Label>
              <InputGroup className="input-group-alternative">
                <Input type="text"
                  defaultValue={companyid ? companyid.ename : ""}
                  onChange={(e) => setEname(e.target.value)}
                />

              </InputGroup>

            </Col>

            <Col xs={12}>
              <Label className="form-label" for="roleName">
                Arabic Name
              </Label>
              <InputGroup className="input-group-alternative">
                <Input type="text"
                  defaultValue={companyid ? companyid.aname : ""}
                  onChange={(e) => setAname(e.target.value)}
                />

              </InputGroup>


            </Col>
            <Col xs={12}>
              <Label className="form-label" for="roleName">
                longitude
              </Label>
              <InputGroup className="input-group-alternative" onClick={() => {
                maping()
                setShowMap(!showMap);
              }}>
                <Input placeholder={localStorage.getItem('longitudeGC')} type="text"
                  onChange={(e) => setLong(e.target.value)} />

              </InputGroup>


            </Col>
            <Col xs={12}>
              <Label className="form-label" for="roleName">
                latitude
              </Label>
              <InputGroup className="input-group-alternative">
                <Input placeholder={localStorage.getItem('latitudeGC')} type="text"
                  onChange={(e) => setLat(e.target.value)} />

              </InputGroup>


            </Col>

            <Col className="text-center mt-2" xs={12}>

              <Button
                sx={{ backgroundColor: "#4bbfb8", }}
                className="me-1"
                variant="contained"

                onClick={() => {
                  updateAPI();
                  remove();

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

      {/* ==================================Delete=========================== */}


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
            <h4> Are You Sure You want to {modalTypeDelete} This Gate</h4>

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
                Delete
              </Button>
              <Button variant="outlined" sx={{ color: "#4bbfb8", borderColor: "#4bbfb8", marginLeft: "2%" }} type="reset" onClick={() => { onReset1(); }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      {/* ==============================map============================ */}


      <Modal
        isOpen={showMap}
        onClosed={handleModalClosed2}
        toggle={() => setShowMap(!showMap)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShowMap(!showMap)}
        ></ModalHeader>
        <ModalBody >

          <Row>

            <div className="col">
              <Card className="shadow border-0" style={{ marginTop: "-7%" }}>
                <Row >



                  <Button className=" mb-3 ml-3"
                    id='tooltip969372949'
                    color="neutral"
                    href={() => false}
                    onClick={() => {
                      setShowMap(!showMap);
                      maping();
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

export default Gates