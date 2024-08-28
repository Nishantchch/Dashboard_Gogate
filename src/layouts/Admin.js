import React, { useState } from "react";
import './admin.css'
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { Box } from "@mui/material";

const Admin = (props,) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }

    return "Brand";
  };

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen);

  const [notOpen, setNotOpen] = useState(routes)


  return (
    <>
      <div
        onClick={() => toggle() || !toggle() == isOpen ? true : setNotOpen}
        sx={{
          marginLeft: isOpen ? '13.5%' : "5%",
        }}
      >
        <Sidebar
          {...props}
          routes={notOpen}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/logo/gogates.png"),
            imgAlt: "...",
          }}
        />

      </div>
      <Box className="main-content" ref={mainContent}

        sx={{
          marginLeft: isOpen ? '13.2%' : "" || !isOpen ? '13.2%' : '',
          // "@media(max-width:1280px": {
          //   marginLeft: isOpen ? '5%' : "19.5% !important "
          // },


        }}
      >

        11<AdminNavbar

          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </Box>
    </>
  );
};

export default Admin;
