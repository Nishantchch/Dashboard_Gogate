// import { AddRole } from 'apis/RolesApi/addRoleApi'
import { AddRole } from 'apis/RolesApi/addRoleApi'
import { GetAllRole } from 'apis/RolesApi/getAllRole'
// import { AddRoleData } from 'apis/RolesApi/AddRoles'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, InputGroup, Modal } from 'reactstrap'

const RolesModels = ({ modelStatus, fun_checkModel, }) => {

  const [roleName, setRoleName] = useState()
  const [roleDescription, setRoleDescription] = useState()
  const [roleStatus, setRoleStatus] = useState()
  // console.log(14, modelStatus, fun_checkModel)

  const modelT = useSelector((state) => state.categoryState?.modelT);
  // const [close,setClose]=useState()

  // const closeFun=()=>{
  //   setClose(modelT== flase)
  // }

  // ===================Add Api ===============//
  console.log(12, parseInt(roleStatus))


  const AddData = {
    name: roleName,
    description: roleDescription,
    // status: roleStatus == 'true' ? true : false
    status: true
  }
  const AddAPI = () => {
    AddRole(AddData).then((res) => {
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
                <small>Add role</small>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <Input placeholder="Role name" type="text"
                      onChange={(e) => setRoleName(e.target.value)} />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <Input placeholder="Role description" type="text"
                      onChange={(e) => setRoleDescription(e.target.value)} />
                  </InputGroup>
                </FormGroup>
                {/* <FormGroup>
                  <InputGroup className="input-group-alternative"
                  >
                    <select className='form-control' onChange={(e) => setRoleStatus(e.target.value)}
                    >
                      <option>true</option>
                      <option>false</option>
                    </select>
                  </InputGroup>
                </FormGroup> */}
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    isOpen={modelStatus}

                    // toggle={fun_checkModel}

                    onClick={() =>
                      AddAPI()
                    }
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Modal>
    </>
  )
}

export default RolesModels