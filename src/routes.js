import Register from "views/auth_pages/Register.js";
import Login from "views/auth_pages/Login.js";
import Verified from "views/auth_pages/Verified";
import ForgetPassword from "views/auth_pages/ForgetPassword";


import Index from "views/Index.js";
import Profile from "views/pages/Profile.js";
import Maps from "views/pages/Maps.js";
import Tables from "views/pages/Tables.js";
import Icons from "views/pages/Icons.js";
import Roles from "views/pages/Roles";
import Companies from "views/pages/Companies/Companies";
import AddCompany from "views/pages/Companies/AddCompany";
import CompanyStaff from "views/pages/Companies/CompanyStaff/CompanyStaff";
import AddCompanyStaff from "views/pages/Companies/CompanyStaff/AddCompanyStaff";
import Gates from "views/pages/Companies/Gates/Gates";
import UserDetails from "views/pages/Companies/CompanyStaff/UserDetails";

import RoleParmission from "views/pages/RoleParmission";
import UpdateCompany from "views/pages/Companies/UpdateCompany";
import UpdateCompanyStaff from "views/pages/Companies/CompanyStaff/UpdateCompanyStaff";
import AddAdmin from "views/pages/Companies/AddAdmin";
import LoginPage from "views/LoginPage";
import Order from "views/pages/Orders/Order";
import FavouriteCompany from "views/pages/Companies/FavouriteCompany";
import FavouriteUserDetails from "views/pages/Companies/FavouriteUserDetails";
import OrderMap from "views/pages/Orders/OrderMap";
import SetPassword from "views/auth_pages/SetPassword";
import OrderUserDetails from "views/pages/Orders/OrderUserDetails";
import CompanyProfile from "views/pages/CompanyProfile";
import OredrUpdate from "views/pages/Orders/OredrUpdate";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    hide: false,
    myvalue: ''
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/roles",
    name: "Roles",
    icon: "ni ni-vector text-blue",
    component: <Roles />,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/roleparmission/:value",
    name: "Roles",
    icon: "ni ni-vector text-blue",
    component: <RoleParmission />,
    layout: "/admin",
    hide: true,
  },
  /** ################ company path ################### */
  {
    path: "/companies",
    name: "Company",
    icon: "ni ni-building text-blue",
    component: <Companies />,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/companies/addcompany",
    name: "Add User",
    icon: "ni ni-single-02 text-blue",
    component: <AddCompany />,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/companies/addadmin",
    name: "Add User",
    icon: "ni ni-single-02 text-blue",
    component: <AddAdmin />,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/companies/edit/:id",
    name: "Edit User",
    icon: "ni ni-single-02 text-blue",
    component: <AddCompany />,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/companies/staff/:cid",
    name: "Company Staff",
    icon: "ni ni-single-02 text-blue",
    component: <CompanyStaff />,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/companies/staff/addstaff",
    name: "Add Company Staff",
    icon: "ni ni-single-02 text-blue",
    component: <AddCompanyStaff />,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/userdetails/:id",
    name: "Add User",
    icon: "ni ni-single-02 text-blue",
    component: <UserDetails />,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/updatecompany/:id",
    name: "Add User",
    icon: "ni ni-single-02 text-blue",
    component: <UpdateCompany />,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/updatecompanystaff/:id",
    name: "Add User",
    icon: "ni ni-single-02 text-blue",
    component: <UpdateCompanyStaff />,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/companyprofile",
    name: "Add User",
    icon: "ni ni-single-02 text-blue",
    component: <CompanyProfile />,
    layout: "/admin",
    hide: true,
  },
  /** ################## company path ################# */
  {
    path: "/gates",
    name: "Gate",
    icon: "ni ni-basket text-orange",
    component: <Gates />,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    hide: true,
  },
  {
    path: "/:user_id/:token",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    hide: true,
  },

  {
    path: "/ForgetPassword",
    name: "ForgetPassword",
    icon: "ni ni-key-25 text-info",
    component: <ForgetPassword />,
    layout: "/auth",
    hide: true,
  },
  {
    path: "/setPassword",
    name: "setPassword",
    icon: "ni ni-key-25 text-info",
    component: <SetPassword />,
    layout: "/auth",
    hide: true,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
    hide: true,
  },
  {
    path: "/Verified",
    name: "Verified",
    icon: "ni ni-key-25 text-info",
    component: <Verified />,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/order",
    name: "Order",
    icon: "ni ni-single-02 text-yellow",
    component: <Order />,
    layout: "/admin",
    hide: false,
  },

  {
    path: "/favourite",
    name: "Favourite",
    icon: "ni ni-building text-yellow",
    component: <FavouriteCompany />,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/favouriteUser/:id",
    name: "FavouriteUserDetails",
    icon: "ni ni-building text-yellow",
    component: <FavouriteUserDetails />,
    layout: "/admin",
    hide: false,
  },



  {
    path: "/orderMaps",
    name: "orderMaps",
    icon: "ni ni-pin-3 text-orange",
    component: <OrderMap />,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/orderdetails/:id",
    name: "orderdetails",
    icon: "ni ni-pin-3 text-orange",
    component: <OrderUserDetails />,
    layout: "/admin",
    hide: true,
  },


  {
    path: "/orderUpdate/:id",
    name: "OrderUpdate",
    icon: "ni ni-pin-3 text-orange",
    component: <OredrUpdate />,
    layout: "/admin",
    hide: true,
  },

];



export default routes;