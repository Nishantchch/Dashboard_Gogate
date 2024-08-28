// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  InputGroup,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
// import { UserDetailsApi } from "apis/User/UserDetailsById";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toast } from "react-toastify";
import { GetAllUser } from "apis/User/GetUserApli";
import { UpdateProfile } from "apis/User/UpdateUserProfile";
import { ChangePasswordAPI } from "apis/ChangePasswordApi";

const Profile = () => {

  const [data, setData] = useState(true);
  const [allUserData, setAllUserData] = useState();

  const Clicked = () => {
    setData(!data);
  };

  const [showEdit, setShowEdit] = useState(false);
  const [modalTypeEdit, setModalTypeEdit] = useState("Change");
  const handleModalClosed = () => {
    setModalTypeEdit("Change");
  };
  const onReset = () => {
    setShowEdit(!showEdit);

  };
  const userdata = {
    id: localStorage.getItem('LoginId')
  }
  console.log(23, userdata)
  useEffect(() => {
    GetAllUser().then((res) => {
      console.log(41, res)


      if (res.status == 200) {
        setAllUserData(res.data.data.filter((resp) => resp.user_id == localStorage.getItem('LoginId')))
      } else {
        toast.error('You do not have admin access');

      }

    })

    // UserDetailsApi().then((res) => {
    //   console.log(45, res)
    // })
  }, [])

  const refrace = () => {
    GetAllUser().then((res) => {
      console.log(41, res.data.data.filter((resp) => resp.user_id == localStorage.getItem('LoginId')))
      setAllUserData(res.data.data.filter((resp) => resp.user_id == localStorage.getItem('LoginId')))
    })
  }
  // =================================Upadte User=========================//
  const [userName, setUserName] = useState();
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [fullName, setFullName] = useState()
  const [userPhone, setUserPhone] = useState()
  const [userWorkPhone, setUserWorkPhone] = useState()

  const userUpdateData = {
    // id: localStorage.getItem('LoginId'),
    first_name: userName == undefined ? (allUserData || [])[0]?.first_name : userName,
    last_name: lastName == undefined ? (allUserData || [])[0]?.last_name : lastName,
    full_name: fullName == undefined ? (allUserData || [])[0]?.full_name : fullName,
    phone_id: userPhone == undefined ? (allUserData || [])[0]?.phone : userPhone,
    comm_phone: userWorkPhone == undefined ? (allUserData || [])[0]?.work_phone : userWorkPhone
    // status: true,
    // password: updatePassword,
    // admin_role_id: updaterole
  }
  console.log(88, userUpdateData, allUserData)
  const UserUpdate = () => {
    UpdateProfile(userUpdateData).then((res) => {
      console.log(89, res)
      refrace();
    })
  }


  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState()
  const [confirmNewPassword, setConfirmNewPassword] = useState('');



  const changePassword = () => {
    if (newPassword === confirmNewPassword) {
      const changeData = {
        currentPassword: oldPassword,
        newPassword: newPassword,
      };

      ChangePasswordAPI(changeData).then((res) => {
        console.log(106, res);
        if (res.status === 200) {
          toast.success('Password has been changed successfully');
          setShowEdit(!showEdit)
        } else {
          toast.error('Current password is not correct');
        }
      });
    } else {
      toast.error('New password and confirm password do not match');
    }
  };

  return (
    <>
      <HelmetProvider >
        <Helmet>
          <title>User Profile</title>
        </Helmet>
      </HelmetProvider>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--9" fluid>
        <Row>

          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="6">
                    <h3 className="mb-0">My account</h3>
                  </Col>

                  <Col className="text-right" xs="5" >

                    {data ?
                      <Button
                        color="primary"

                        onClick={() => {
                          Clicked()
                          refrace()
                        }}
                        size="sm"
                      >
                        Edit
                      </Button>
                      :
                      <div>
                        <Button
                          color="primary"


                          size="sm"
                          onClick={() => {
                            Clicked()
                            UserUpdate()
                          }}

                        >
                          Save
                        </Button>
                        <Button
                          color="primary"


                          size="sm"
                          onClick={() => Clicked()}
                        >
                          Cancel
                        </Button>
                      </div>
                    }

                  </Col>

                  <Col className="text-right" xs="1">
                    <Button
                      color="primary"

                      onClick={() => {
                        setShowEdit(!showEdit)
                      }}
                      size="sm"
                    >
                      Change Password
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    {data ?
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <h3>{(allUserData || [])[0]?.first_name}</h3>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <h3>{(allUserData || [])[0]?.last_name}</h3>
                          </FormGroup>
                        </Col>
                      </Row>
                      :
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={(allUserData && allUserData.length > 0) ? allUserData[0]?.first_name : ""}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              onChange={(e) => setUserName(e.target.value)}

                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={(allUserData || [])[0]?.last_name}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>}


                    <Row>
                      {/* {data ?
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              full Name
                            </label>
                            <h3>{(allUserData || [])[0]?.full_name}</h3>
                          </FormGroup>
                        </Col>
                        :
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              full Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={(allUserData || [])[0]?.full_name}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              onChange={(e) => setFullName(e.target.value)}

                            />
                          </FormGroup>
                        </Col>} */}

                      {data ? <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <h3>{(allUserData || [])[0]?.email}</h3>
                        </FormGroup>
                      </Col> : <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={(allUserData || [])[0]?.email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>}


                      {data ?
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Phone
                            </label>
                            <h3>{(allUserData || [])[0]?.phone}</h3>
                          </FormGroup>
                        </Col> : <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Phone
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-phone"
                              defaultValue={(allUserData || [])[0]?.phone}
                              type="number"
                              onChange={(e) => setUserPhone(e.target.value)}
                            />
                          </FormGroup>
                        </Col>}

                      {data ? <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            work phone
                          </label>
                          <h3>{(allUserData || [])[0]?.work_phone}</h3>
                        </FormGroup>
                      </Col> : <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            work phone
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            defaultValue={(allUserData || [])[0]?.work_phone}
                            type="number"
                            onChange={(e) => setUserWorkPhone(e.target.value)}
                          />
                          {/* <Input
                            className="form-control-alternative"
                            id="input-phone"
                            defaultValue={(allUserData && allUserData.length > 0) ? allUserData[0]?.work_phone : ""}

                            // defaultValue={(allUserData || [])[0]?.work_phone}
                            type="number"
                            onChange={(e) => setUserWorkPhone(e.target.value)}
                          /> */}
                        </FormGroup>
                      </Col>}
                    </Row>
                  </div>

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>


      </Container>

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
            <h1>{modalTypeEdit} Password</h1>

          </div>
          <Row tag="form">
            <Col xs={12}>
              <Label className="form-label" for="roleName">
                Old Password
              </Label>
              <InputGroup className="input-group-alternative">
                <Input

                  onChange={(e) => setOldPassword(e.target.value)}
                // placeholder={localStorage.getItem('role_name')}
                />
              </InputGroup>

            </Col>

            <Col xs={12}>
              <Label className="form-label" for="roleName">
                New Password
              </Label>
              <InputGroup className="input-group-alternative">
                <Input
                  // defaultValue={planId ? planId.description : ""}
                  onChange={(e) => setNewPassword(e.target.value)}
                // placeholder={localStorage.getItem('role_name')}
                />
              </InputGroup>

            </Col>
            <Col xs={12}>
              <Label className="form-label" for="roleName">
                Confirm Password
              </Label>
              <InputGroup className="input-group-alternative">
                <Input
                  // defaultValue={planId ? planId.description : ""}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                  changePassword();

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

    </>
  );
};

export default Profile;
