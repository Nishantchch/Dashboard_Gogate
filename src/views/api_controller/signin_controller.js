import { signInApi } from "apis/auth_api";
import { LoginAPI } from "apis/loginApi";
export const Fun_subInputHandler = ({ e, setError, setFormState, error }) => {
  const { name, value } = e.target;
  if (name === "email" && value) {
    setError({ ...error, email: "" });
  }
  if (name === "password" && value) {
    setError({ ...error, password: "" });
  }
  setFormState((preval) => {
    return {
      ...preval,
      [name]: value,
    };
  });
}

export const Fun_subValid = ({ email, password, isValidEmail, errorMsg, errorMessages, setError }) => {
  if (!email) {
    errorMsg.email = errorMessages.required;
  }
  if (email && !isValidEmail(email)) {
    errorMsg.email = errorMessages.validEmail;
  }
  if (!password) {
    errorMsg.password = errorMessages.required;
  }
  if (errorMsg.email || errorMsg.password) {
    setError(errorMsg);
    return false;
  } else {
    setError(errorMsg);
    return true;
  }
}

export const Fun_submitHandlerController = async ({ Fun_isValid, formstate, navigate, toast }) => {
  // console.log(39, 'working')
  if (Fun_isValid()) {
    // console.log(41, 'working')
    try {
      // console.log(43, 'working')
      const apiRes = await LoginAPI(formstate);
      const resData = apiRes.data
      console.log(43, resData)
      localStorage.setItem("Name", resData.data.full_name);
      localStorage.setItem("_role", resData.data.role_name);
      localStorage.setItem("_token", resData.data.token);
      localStorage.setItem("LoginId", resData.data.id);
      localStorage.setItem("Login_companyId", resData.data.company_id);

      toast.success("LoggedIn Successful");

      navigate("/admin/index", { state: { data: resData.data, token: resData.token } })
    } catch (err) {
      toast.error(err?.response?.data?.message);

    }
  }
}
