import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../src/layouts/Auth';
import ForgetPassword from 'views/auth_pages/ForgetPassword';
import SetPassword from 'views/auth_pages/SetPassword';

const App = () => {
  const location = useLocation();
  console.log(10, location)
  const [useToken, setuseToken] = useState('')
  const [reloadPath, setReloadPath] = useState("/auth/login")
  console.log(14, location)
  // To remove local and sessionStorage 

  // To remove local and sessionStorage 
  useEffect(() => {
    const localToken = location?.state?.token || localStorage.getItem("_token")
    switch (localToken) {
      case localToken:
        return setuseToken(localToken);

      default:
        return setuseToken("/admin/index");
    }
  }, [location]);

  useEffect(() => {
    /** this function call when page reload */
    const fun_onReload = () => {
      const filterOptions = ['/login', '/auth/register'];
      let res = filterOptions.some(i => i === location?.pathname)
      if (!res) {
        setReloadPath(location?.pathname)
      }
    }
    fun_onReload()
  }, []);     // eslint-disable-line react-hooks/exhaustive-deps

  const getRoutes = (data) => {
    if (data) {
      // alert('IF Working')
      return (
        <>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/" element={<Navigate to="/admin/index" replace />} />
          <Route path="*" element={<Navigate to='/admin/index' replace />} />
        </>
      );
    } else {
      // alert('Else Working')
      return (
        <>
          <Route path='/verify-email/:userId/:token' element={<Login />} />
          {/* <Route path='/auth/login' element={<Login />} /> */}
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />

        </>
      )
    }
  };

  return (
    <React.Fragment>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover={false} />
      <Routes>
        {getRoutes(useToken)}
        <Route path="*" element={<Login />} />
        <Route path='/reset-password/:userId/:token' element={<SetPassword />} />
      </Routes>
    </React.Fragment>
  )
}

export default App