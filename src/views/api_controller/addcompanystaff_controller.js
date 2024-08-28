

export const fun_formStaffHandlerController = async ({ e, setAddForm, setErrorAddForm }) => {
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

export const Fun_isValidStaffController = ({ addForm, erroraddForm, setErrorAddForm, errorMessages }) => {
  const errorMsg = {
    ...erroraddForm,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    gate_id: "",
    status: "",
  };

  if (!addForm.first_name) {
    errorMsg.first_name = errorMessages.required;
  }
  if (!addForm.last_name) {
    errorMsg.last_name = errorMessages.required;
  }
  if (!addForm.email) {
    errorMsg.email = errorMessages.required;
  }
  if (!addForm.password) {
    errorMsg.password = errorMessages.required;
  }
  if (!addForm.phone) {
    errorMsg.phone = errorMessages.required;
  }
  if (!addForm.gate_id) {
    errorMsg.gate_id = errorMessages.required;
  }
  if (!addForm.status) {
    errorMsg.status = errorMessages.required;
  }

  if (errorMsg.first_name || errorMsg.last_name || errorMsg.email || errorMsg.password || errorMsg.phone || errorMsg.gate_id || errorMsg.status) {
    setErrorAddForm(errorMsg);
    return false;
  } else {
    setErrorAddForm(errorMsg);
    return true;
  }
}
export const fun_submitFormStaffHandlerController = ({ Fun_isValid }) => {
  if (Fun_isValid()) { }
}
