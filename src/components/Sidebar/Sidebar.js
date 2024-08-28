/*eslint-disable*/
import React, { useEffect, useState } from "react";
import './sidebar.css'
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { SendRolePermission } from "apis/RolesApi/Permission/rolePermission";
import { toast } from "react-toastify";


var ps;

const Sidebar = (props) => {

  const handelLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    navigate("/auth/login")
  }
  const [isOpen, setIsOpen] = useState(false)
  const [isShow, setIsShow] = useState()
  const [logData, setLogData] = useState(false)
  const toggle = () => setIsOpen(!isOpen);

  const [collapseOpen, setCollapseOpen] = useState();

  useEffect(() => {
    SendRolePermission().then((res) => {
      console.log(44444, res)
      if (res.status == 200) {
        console.log(79, res.data.data.filter((res) => res.role_name == localStorage.getItem('_role')))
        setIsShow(res.data.data.filter((res) => res.role_name == localStorage.getItem('_role')))
      } else {
        toast.error('token Expired');

      }

    })
  }, [])
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {

    console.log(56, routes, isShow)
    // return routes.map((prop, key) => {
    //   return (
    //     <>
    //       {console.log(65, isShow && isShow[0].pages.filter((resp) => resp.page_name == prop.name ? "true" : 'false'))}
    //       {isShow && isShow[0]?.pages.filter((resp) => resp.page_name == prop.name ?
    //         <React.Fragment key={key}>
    //           {!prop.hide &&
    //             <NavItem key={key}>

    //               <NavLink
    //                 to={prop.layout + prop.path}
    //                 tag={NavLinkRRD}
    //                 onClick={closeCollapse}
    //               >

    //                 <i className={prop.icon} id="topnav" style={{
    //                   marginRight: isOpen ? "80%" : "0%",
    //                   fontSize: isOpen ? "1.1vw" : '1vw'
    //                 }} />
    //                 {prop.name}
    //               </NavLink>
    //             </NavItem>
    //           }
    //         </React.Fragment>
    //         : '')
    //       }

    //     </>
    //   );
    // });


    return routes.map((prop, key) => {
      console.log(108, prop, routes, isShow)
      const filteredPages = isShow?.[0]?.pages?.filter((resp) => resp.page_name === prop.name);
      return (
        <React.Fragment key={key}>
          {!prop.hide && filteredPages?.length > 0 && (
            <NavItem>
              <NavLink

                to={prop.layout + prop.path}
                tag={NavLinkRRD}
                onClick={closeCollapse}
              >
                <i
                  className={prop.icon}
                  id="topnav"
                  style={{
                    marginRight: isOpen ? "80%" : "0%",
                    fontSize: isOpen ? "1.1vw" : '1vw'
                  }}
                />
                {prop.name}
              </NavLink>
            </NavItem>
          )}
        </React.Fragment>
      );
    });


  };
  // const roleData = {
  //   role_id: localStorage.getItem('RoleID')
  // }

  const { bgColor, routes, logo } = props;
  // console.log(51, routes)
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }



  return (
    <>


      <Navbar
        style={{ width: isOpen ? "5%" : "50%", overflow: "hidden" }}
        className="navbar-vertical fixed-left navbar-light bg-white side"
        expand='md'
        id="sidenav-main"
      // onClick={toggle}

      >
        <div
          style={{
            marginLeft: isOpen ? "15%" : "80%", marginTop: isOpen ? "0%" : "5%",
            display: isOpen ? "none" : ""
          }}
          className="logo" onClick={toggle}>
          <i class="fa fa-bars"></i>
        </div>
        <Container fluid>
          {/* Toggler */}
          {/* <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}

          >
            <span className="navbar-toggler-icon" />
          </button> */}
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                style={{ marginTop: isOpen ? "60%" : "0%", maxHeight: "6.5rem" }}
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
                onClick={toggle}
              />
            </NavbarBrand>
          ) : null}
          {/** User mobile responsive nav bar */}
          <Nav className="align-items-center d-md-none">
            {/* <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            <UncontrolledDropdown nav className="phonescreen">
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>

                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={handelLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/** User mobile responsive nav bar End */}

          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none respop" >
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>

            {/* Navigation */}
            <Nav navbar

              style={{ marginLeft: isOpen ? "-10%" : "0%", }}

            >

              {createLinks(routes)}

            </Nav>
          </Collapse>
        </Container>
      </Navbar>


    </>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
