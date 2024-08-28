import { GetAllCompanyProfile } from 'apis/CompanyApi/CompanyProfileApi'
import UserHeader from 'components/Headers/UserHeader'
import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Form } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Row } from 'reactstrap'

const CompanyProfile = () => {

  const [getAllData, setGetAllData] = useState();
  const [companyType, setCompanyType] = useState();
  const [gateData, setGateData] = useState();

  useEffect(() => {
    GetAllCompanyProfile().then((res) => {
      console.log(11, res.data.data)
      setGetAllData(res.data.data.company_data)
      setCompanyType(res.data.data.company_types)
      setGateData(res.data.data.gates)

    })
  }, [])

  return (

    <>
      <HelmetProvider >
        <Helmet>
          <title>Company Profile</title>
        </Helmet>
      </HelmetProvider>
      <UserHeader />
      <Container className="mt--9" fluid>
        <Row>


          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="6">
                    <h3 className="mb-0">Company Profile</h3>
                  </Col>

                  <Col className="text-right" xs="5" >


                  </Col>

                  {/* <Col className="text-right" xs="1">
                    <Button
                      color="primary"

                      onClick={() => {
                        // setShowEdit(!showEdit)
                      }}
                      size="sm"
                    >
                      Change Password
                    </Button>
                  </Col> */}
                </Row>
              </CardHeader>
              <CardBody>


                <div className="pl-lg-4">

                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Short name
                        </label>
                        <h3>
                          {(getAllData || [])[0]?.short_name}
                        </h3>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Arabic name
                        </label>
                        <h3>
                          {(getAllData || [])[0]?.aname}
                        </h3>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Name
                        </label>
                        <h3>  {(getAllData || [])[0]?.ename}
                        </h3>
                      </FormGroup>
                    </Col>



                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          phone
                        </label>
                        <h3>
                          {(getAllData || [])[0]?.phone}
                        </h3>
                      </FormGroup>
                    </Col>


                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Email
                        </label>
                        <h3>
                          {(getAllData || [])[0]?.email}
                        </h3>
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          work phone
                        </label>
                        <h3>

                          {(getAllData || [])[0]?.work_phone}
                        </h3>
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Company Registration
                        </label>
                        <h3>

                          {(getAllData || [])[0]?.cr}
                        </h3>
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Company Type

                        </label>
                        <h3>

                          {(companyType || [])[0]?.ename}
                        </h3>
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Gate
                        </label>
                        <h3>

                          {(gateData || [])[0]?.ename}
                        </h3>
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Latitude
                        </label>
                        <h3>

                          {(getAllData || [])[0]?.lat}
                        </h3>
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Long
                        </label>
                        <h3>

                          {(getAllData || [])[0]?.long}
                        </h3>
                      </FormGroup>
                    </Col>

                  </Row>
                </div>


              </CardBody>
            </Card>
          </Col>
        </Row>


      </Container>
    </>
  )
}

export default CompanyProfile