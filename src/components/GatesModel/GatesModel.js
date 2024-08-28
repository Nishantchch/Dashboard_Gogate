import { AddGateApi } from 'apis/Gates/addGate'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, InputGroup, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'



const GatesModels = ({ modelStatus, fun_checkModel }) => {

  const [showMap, setShowMap] = useState(false);
  const [modalTypeMap, setModalTypeMap] = useState('');
  const handleModalClosed = () => {
    setModalTypeMap();
  };

  // const mapLet = () => {
  //   navigator.geolocation.getCurrentPosition((location) => {
  //     setLeti(location.coords.latitude)
  //     setLon(location.coords.longitude)
  //     localStorage.setItem('latitudeGC', location.coords.latitude)
  //     localStorage.setItem('longitudeGC', location.coords.longitude)

  //   })
  // }
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
  console.log(112, leti)
  const [Ename, setEname] = useState()
  const [Aname, setAname] = useState()
  // const [long, setLong] = useState()
  // const [lat, setLat] = useState()

  const AddData = {
    ename: Ename,
    aname: Aname,
    long: localStorage.getItem('longitudeGC'),
    lat: localStorage.getItem('latitudeGC'),
  }
  console.log(20, AddData)
  const AddAPI = () => {
    AddGateApi(AddData).then((res) => {
      console.log(20, res)
      fun_checkModel()
    })
  }

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="sm"
        isOpen={modelStatus}
        toggle={fun_checkModel}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Add Gate</small>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <Input placeholder="Name" type="text"
                      onChange={(e) => setEname(e.target.value)} />

                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <Input placeholder=" Arabic name" type="text"
                      onChange={(e) => setAname(e.target.value)} />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3" onClick={() => { setShowMap(!showMap); }}>
                  <InputGroup className="input-group-alternative" >
                    <Input placeholder='longitude' type="text"
                      defaultValue={localStorage.getItem('longitudeGC')} />

                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <Input placeholder='latitude' type="text"
                      defaultValue={localStorage.getItem('latitudeGC')} />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"

                    onClick={() => {
                      AddAPI()
                      remove();
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Modal>



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

export default GatesModels