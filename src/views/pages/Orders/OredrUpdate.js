import { MenuItem, OutlinedInput, Select } from '@mui/material'
import { GetFavouriteApi } from 'apis/CompanyApi/GetAllFavorite'
import { GetAllDrivers } from 'apis/Order/getAllDrivers'
import { GetAllOrder } from 'apis/Order/getAllOrder'
import { GetGateListID } from 'apis/Order/getGateID'
import IndexHeader from 'components/Headers/IndexHeader'
import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Button, Card, CardBody, CardHeader, Col, Container, Input, InputGroup, Row } from 'reactstrap'
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateOrderApi } from 'apis/Order/updateOrder'

const OredrUpdate = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const planId = useSelector((state) => state.categoryState?.planId);
  const orderid = useSelector((state) => state.categoryState?.orderid);

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

  const [selectedCompanies4, setSelectedCompanies4] = useState([]);

  const handleCheckboxChange4 = (value) => {
    if (selectedCompanies4.includes(value)) {
      setSelectedCompanies4(selectedCompanies4.filter((company) => company !== value));
    } else {
      setSelectedCompanies4([...selectedCompanies4, value]);
    }
  };
  const [invoiceUpdate, setInvoiceUpdate] = useState()
  const [trucksUpdate, setTrucksUpdate] = useState()
  const [imageUpdate, setImageUpdate] = useState()
  const [value2, setValue2] = React.useState(dayjs());

  const updateData = {
    id: orderid ? orderid : "",
    invoice: invoiceUpdate == undefined ? planId?.invoice_id : invoiceUpdate,
    number_of_trucks: trucksUpdate == undefined ? planId?.number_of_trucks : trucksUpdate,
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
    })
  }


  const [allCompanyData, setAllCompanyData] = useState()
  const [records, setRecords] = useState()
  const [getOrder, setGetOrder] = useState()
  const [gateID, setGAteID] = useState()



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


    GetFavouriteApi().then((res) => {
      console.log(105, res)
      setAllCompanyData(res.data.data)
    })


  }, [])



  return (
    <>
      <HelmetProvider >
        <Helmet>
          <title>Update-Order</title>
        </Helmet>
      </HelmetProvider>

      <IndexHeader />


      <Container className="mt-5" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="6">
                  <h3 className="mb-0"
                  > Update Order  </h3>
                </Col>




              </Row>

            </CardHeader>
            <CardBody>
              <Row>
                <Col xs={6} >

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
                  </InputGroup>
                </Col>

                <Col xs={6}>
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
                </Col>
              </Row>


              {/* <select
    name='status'
    //value={addForm.status}
    onChange={(e) => setInvoiceUpdate(e.target.value)}

    className='form-control input-group-alternative'
  >

    <option value='1'>fd7424b2-a23f-404e-a4e6-a477e74fdacf</option>





  </select> */}



              <Row>

                <Col lg="6">

                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Drop
                  </label>
                  <InputGroup className="input-group-alternative mb-3">
                    <Select
                      sx={{ width: '100%' }}
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

                <Col lg='6'>

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
                </Col>
              </Row>


              <Row>
                <Col lg='6'>
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
                </Col>
                <Col lg='6'>
                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Driver
                  </label>
                  <InputGroup className="input-group-alternative mb-3">
                    <Select
                      sx={{ width: '100%' }}
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
                </Col>
              </Row>


              <Row>
                <Col lg='6'>

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
              </Row>



              <Button
                style={{ float: "right", backgroundColor: "#4bbfb8", }}

                className="me-1"
                variant="contained"

                onClick={() => {
                  OredrUpdate()
                }}
              >
                Update
              </Button>

            </CardBody>
          </Card>
        </Col>
      </Container >

    </>
  )
}

export default OredrUpdate