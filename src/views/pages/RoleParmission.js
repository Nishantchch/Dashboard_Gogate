import IndexHeader from 'components/Headers/IndexHeader'
import React, { useEffect, useState } from 'react'
import { Button, CardHeader, Container, Input, Label, Row } from 'reactstrap'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import { GetAllPage } from 'apis/RolesApi/Permission/getAllPage';
import { GetAllPermission } from 'apis/RolesApi/Permission/getAllPermission';
import { SendRolePermission } from 'apis/RolesApi/Permission/rolePermission';
import { GetRolePermission } from 'apis/RolesApi/Permission/getRolePermission';
import { UpdataRolePermission } from 'apis/RolesApi/Permission/updateRolePermission';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const RoleParmission = () => {

  const navigate = useNavigate()
  const params = useParams()

  const [allPermissions, setAllPermissions] = useState([])
  const [pagePermission, setPagePermission] = useState()
  const [permissionLength, setPermissionLength] = useState([])
  const [toggleshow, setToggleshow] = useState(false);
  const [userRole, setUserRole] = useState()
  const [check, setCheck] = useState(true)
  const [idArray, setIdArray] = useState([]);
  const [filteredIds, setFilteredIds] = useState([]);
  const Clicked = () => {
    setCheck(!check);
  };
  console.log(23, params.value)
  const arr = [];
  let UniqueSubjects = [...new Set(userRole ? userRole[0].pages.map((res) => res.permission_id) : "")]

  function SetStoreValue(id) {
    arr.push(id);
    const Myv = UniqueSubjects.indexOf(id)
    console.log(49, Myv, UniqueSubjects);

    if (Myv > -1) {
      setIdArray(prevIds => [...prevIds, UniqueSubjects.splice(Myv, 1)]);
      // console.log(8585, UniqueSubjects.splice(Myv, 1))
      UniqueSubjects.splice(Myv, 1)
      filterIds()
      // removalConditions.push(Myv);
    }
    else {
      UniqueSubjects.push(id)

    }
  }
  const filterIds = () => {
    // Filter IDs that are not found in the array of arrays
    const newIds = UniqueSubjects.filter(id => !idArray.some(arr => arr.includes(id)));
    console.log(55, newIds)
    // Update the state with filtered IDs
    setFilteredIds(newIds);
  };
  console.log(2666, UniqueSubjects, arr, idArray, filteredIds)

  // const sendDataOnAddPermission = {
  //   role_id: localStorage.getItem('RoleID'),
  //   permission_id: arr,
  //   status: true,
  //   user_id: ' c54bb5a4-d9ed-43d1-9eaf-ffc79046949c'
  // }

  const updateData = {
    role_id: localStorage.getItem('RoleID'),
    // permission_id: UniqueSubjects,
    permission_id: filteredIds.length != 0 ? filteredIds : UniqueSubjects,
    status: true,
    // user_id: ''
  }
  const SubmitDate = async () => {
    // await SendRolePermission(sendDataOnAddPermission).then((res) => {
    //   console.log(33, res)
    //   navigate('/admin/roles')
    // })
    await UpdataRolePermission(updateData).then((res) => {
      navigate('/admin/roles')

    })
  }

  useEffect(() => {

    GetAllPage().then((res) => {
      console.log(15, res.data.data.rows)
      setAllPermissions(res.data.data.rows)
    })
    GetAllPermission().then((res) => {
      console.log(22, res.data.data.rows)
      setPagePermission(res.data.data.rows)
    })
    GetRolePermission().then((res) => {

      console.log(48, res.data.data.filter((res) => res.role_name == localStorage.getItem('RoleName')))
      setUserRole(res.data.data.filter((resp) => resp.id == parseInt(params.value)))
      setPermissionLength(res.data.data.filter((res) => res.id == localStorage.getItem('RoleID')))
      setToggleshow(true)
      // console.log(888, res.data.data.filter((resp) => resp.id == parseInt(params.value)))

    })




  }, [])
  console.log(544, permissionLength)


  return (
    <>
      <HelmetProvider >
        <Helmet>
          <title>Role-Parmission</title>
        </Helmet>
      </HelmetProvider>

      <IndexHeader />
      <IndexHeader />
      <Container className="mt-0" fluid>

        <div className="card">
          <CardHeader className="border-0">
            <Row>
              <div className="col-6">
                <h3 className="mb-0">Parmission </h3>
              </div>
              <div className="text-right col-6">

              </div>
            </Row>

          </CardHeader>
        </div>
      </Container >

      <Container className="mt-5" fluid>
        <Row>
          <div className="col-3">
            <div style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/roles')}><ArrowBackIosIcon fontSize="5px" />Back</div>

          </div>
        </Row>

        {allPermissions && allPermissions.map((res) => {
          // console.log(85, res)

          return (
            <div className='mainDiv2'>
              <div className="d-flex">
                <div style={{ marginLeft: "30% ", minWidth: "10% " }} >{res.name}</div>


                {pagePermission && pagePermission.map((resp) => {

                  // console.log(102, pagePermission[0]?.permission)
                  return (
                    <>

                      {
                        toggleshow ?

                          resp?.page_id == res.id ?

                            (permissionLength || [])[0]?.pages.filter((respp) => respp.permission_id == resp.id).length != 0 ?
                              <div style={{ marginLeft: "3%", minWidth: "max-content" }}>
                                <Input defaultChecked={true} type="checkbox" value={resp.id}
                                  onClick={() => {
                                    SetStoreValue(resp.id)
                                    Clicked()
                                  }}
                                />
                                <Label className="form-check-label">
                                  {resp.permission}
                                </Label></div>
                              :
                              <div style={{ marginLeft: "3%", minWidth: "max-content" }} >
                                <Input type='checkbox' value={resp.id} onClick={() => SetStoreValue(resp.id)} />
                                <Label className="form-check-label">
                                  {resp.permission}
                                </Label>
                              </div>
                            : ''
                          : ""}
                      <div>

                      </div>
                    </>
                  )
                })
                }

              </div>
            </div>
          )
        })}


        <div >

        </div>
        <Stack direction="row" alignItems="center" sx={{ my: 2, marginLeft: "35%" }}>

          <Button className='Editbutton' variant="contained"
            onClick={() => SubmitDate()}
          >
            Submit
          </Button>

          <Button className='Discardbutton' variant="outlined"
            onClick={() => SubmitDate()}

          >Discard</Button>


        </Stack>
      </Container >
    </>
  )
}

export default RoleParmission