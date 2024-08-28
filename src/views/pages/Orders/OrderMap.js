import React, { useEffect, useState } from "react";

// reactstrap components
import { Button, Card, Col, Container, Row } from "reactstrap";

// core components
// import GoogleMapReact from 'google-map-react';
import { useNavigate, useParams } from "react-router-dom";
import { GetMapApi } from "apis/MapApi/GetMap";

const OrderMap = () => {
  const navigate = useNavigate()

  const [toggle, setToggle] = useState(false)

  const Clicked = () => {
    setToggle(!toggle);
  };
  // const [leti, setLeti] = useState([])
  // const [lon, setLon] = useState([])
  const zoom = 16; // 15 is ideal
  const [leti, setLeti] = useState()
  const [lon, setLon] = useState()
  console.log(112, leti)
  const [mapData, setMapData] = useState()
  console.log(22, mapData)
  useEffect(() => {

    GetMapApi().then((res) => {
      console.log(24, res.data.data)
      setMapData(res.data.data)
      setLeti(res.data.data[0]?.driver_latitude)
      setLon(res.data.data[0]?.driver_longitude)
      // setLon(res.data.data.map((resp) => resp.driver_longitude))

    })
    // navigator.geolocation.getCurrentPosition((location) => {
    //   setLeti(location.coords.latitude)
    //   setLon(location.coords.longitude)
    //   localStorage.setItem('latitude', location.coords.latitude)
    //   localStorage.setItem('longitude', location.coords.longitude)

    // })



  }, [])
  return (
    <>
      <Container fluid>
        <Row>

          <div className="col">
            <Card className="shadow border-0" style={{ marginTop: "10%" }}>
              <Row >

                <div className="col-11">

                </div>

                <div className="col-1" >
                  <Button className="mt-3 mb-3"
                    id='tooltip969372949'
                    color="neutral"
                    href={() => false}
                    onClick={() => navigate('/admin/order')}
                    size="sm"

                  >
                    <span className='mr-2'>
                      <i className="fas fa-user" />
                    </span>
                    <span className='btn-inner--text'

                    >Select</span>
                  </Button>
                </div>



              </Row>

              {/* <MapWrapper /> */}
              <div style={{
                width: "100%"
              }}
                onClick={Clicked}
              >
                {/* src='https://www.google.com/maps/embed' */}
                <iframe
                  src={` https://www.google.com/maps?q=${leti},${lon}&z=${zoom}&output=embed`}
                  id="map"
                  animation='google.maps.Animation.DROP'
                  title='data.title'
                  height='500px'
                  width="100%"

                ></iframe>

                {
                  toggle ?
                    <div style={{ marginTop: "3%", marginLeft: "2%" }}>
                      <h3>Driver Detalis -:</h3>
                      <div style={{ marginTop: "1%" }}>
                        <h4 > Driver Name - {(mapData || [])[2]?.driver_name}</h4>
                        <h4> Order Invoice - {(mapData || [])[2]?.order_invoice}</h4>
                        <h4> Latitude - {(mapData || [])[2]?.driver_latitude}</h4>
                        <h4> Longitude - {(mapData || [])[2]?.driver_longitude}</h4>
                      </div>
                    </div>
                    :
                    <div style={{ marginTop: "3%", marginLeft: "2%" }}>
                      <h3>Driver Detalis -:</h3>
                      <div style={{ marginTop: "1%" }}>
                        <h4 > Driver Name - {(mapData || [])[0]?.driver_name}</h4>
                        <h4> Order Invoice - {(mapData || [])[0]?.order_invoice}</h4>
                        <h4> Latitude - {(mapData || [])[0]?.driver_latitude}</h4>
                        <h4> Longitude - {(mapData || [])[0]?.driver_longitude}</h4>
                      </div>



                    </div>
                }
              </div>

              {/* <iframe



                height="500px"

                src={`https://maps.google.com/maps?q=${leti},${lon}&z=${zoom}&output=embed`}





                loading="lazy"

                referrerPolicy="no-referrer-when-downgrade"

                title="google map"



              ></iframe> */}
            </Card>
          </div>

        </Row >



      </Container >



    </>
  )
}

export default OrderMap