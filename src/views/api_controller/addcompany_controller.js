import { AddCompanyApi } from "apis/CompanyApi/AddCompanyApi";
import getBase64 from "utils/getBase64";

export const fun_formHandlerController = async ({ e, setAddForm, setErrorAddForm }) => {
  let { name, value } = e.target;

  setErrorAddForm((preval) => {
    return {
      ...preval,
      [name]: "",
    };
  });

  setAddForm((preval) => {
    return {
      ...preval,
      [name]: value,
    };
  });
}
export const fun_formLogoHandlerController = async ({ e, setAddForm }) => {
  let { name } = e;
  const logoFile = e;
  const base64 = await getBase64(logoFile);

  setAddForm((preval) => {
    return {
      ...preval,
      logo: name
    }
  })
  // ====================base64=================//

  // let { name } = e;
  // const logoFile = e;
  // const base64 = await getBase64(logoFile);
  // // const name = base64
  // setAddForm((preval) => {
  //   return {
  //     ...preval,
  //     logo: base64
  //   }
  // })

}
export const Fun_isValidController = ({ addForm, erroraddForm, setErrorAddForm, errorMessages }) => {
  const errorMsg = {
    ...erroraddForm,
    short_name: "",
    ename: "",
    aname: "",
    // phone: "",
    email: "",
    country_id: "",
    // logo: "",
    long: "",
    lat: "",
    company_type_id: "",
    status: "",
  };

  if (!addForm.short_name) {
    errorMsg.short_name = errorMessages.required;
  }
  if (!addForm.ename) {
    errorMsg.ename = errorMessages.required;
  }
  if (!addForm.aname) {
    errorMsg.aname = errorMessages.required;
  }
  if (!addForm.email) {
    errorMsg.email = errorMessages.required;
  }
  if (!addForm.country_id) {
    errorMsg.country_id = errorMessages.required;
  }
  if (!addForm.long) {
    errorMsg.long = errorMessages.required;
  }
  if (!addForm.lat) {
    errorMsg.lat = errorMessages.required;
  }
  if (!addForm.company_type_id) {
    errorMsg.company_type_id = errorMessages.required;
  }
  if (!addForm.status) {
    errorMsg.status = errorMessages.required;
  }

  if (errorMsg.short_name || errorMsg.ename || errorMsg.aname || errorMsg.email || errorMsg.country_id || errorMsg.long || errorMsg.lat || errorMsg.company_type_id || errorMsg.status) {
    setErrorAddForm(errorMsg);
    return false;
  } else {
    setErrorAddForm(errorMsg);
    return true;
  }
}
export const fun_submitFormHandlerController = async ({ Fun_isValid, }) => {
  if (Fun_isValid()) {


  }
}
