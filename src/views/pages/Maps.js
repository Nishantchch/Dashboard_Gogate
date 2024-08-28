import React, { useEffect, useState } from "react";

// reactstrap components
import { Button, Card, Col, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { markers } from "./MapData";
import GoogleMapReact from 'google-map-react';
import { useNavigate, useParams } from "react-router-dom";



const Maps = () => {

  // const mapRef = React.useRef(null);

  const navigate = useNavigate()


  const [leti, setLeti] = useState([])
  const [lon, setLon] = useState([])
  const zoom = 16; // 15 is ideal

  console.log(112, leti)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setLeti(location.coords.latitude)
      setLon(location.coords.longitude)
      localStorage.setItem('latitude', location.coords.latitude)
      localStorage.setItem('longitude', location.coords.longitude)

    })




  }, [])



  // const AnyReactComponent = ({ text }) => <div>{text}</div>;
  return (
    <>
      {/* <Header /> */}
      {/* Page content */}
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
                    onClick={() => navigate('/admin/companies/addcompany')}
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
      </Container>
    </>
  );
};

export default Maps;
