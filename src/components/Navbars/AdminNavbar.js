import { Link, useNavigate } from "react-router-dom";
// reactstrap components
import './navBar.css'
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {


  const navigate = useNavigate();
  const handelLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    navigate("/auth/login")
  }

  return (
    <>
      <Navbar
        className="navbar-top navbar-dark border-bottom bg-white " id="navbar-main" >
        <Container fluid>
          <Link
            className="h4 mb-0 text-dark text-uppercase d-none d-lg-inline-block mainText"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex halfnnav" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-4-800x800.jpg")}
                    />
                  </span>
                  <div style={{ display: "block" }}>
                    <Media className="ml-2 d-none d-lg-block" >
                      <h5 className="mb-0 text-sm font-dark-bold text-dark">
                        {localStorage.getItem('Name')}
                      </h5>

                    </Media>
                    <Media className="ml-2 d-none d-lg-block" >

                      <h5 className="mb-0  font-dark-bold text-dark">
                        {localStorage.getItem('_role')}
                      </h5>
                    </Media>
                  </div>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {/* <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem> */}
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem> */}
                {localStorage.getItem('_role') == 'SuperAdmin' ? (
                  ''
                ) : (

                  <DropdownItem to="/admin/companyprofile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Company Profile</span>
                  </DropdownItem>
                )}

                <DropdownItem divider />
                <DropdownItem onClick={handelLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
