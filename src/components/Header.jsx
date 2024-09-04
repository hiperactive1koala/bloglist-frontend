import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../reducers/userReducer";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    dispatch(Logout());
    navigate("/");
  };

  if (!user) return null;

  return (
    <div>
        <Navbar collapseOnSelect  expand='sm' bg="warning" data-bs-theme="light">
        <Container className='d-sm-flex flex-row  w-100'>
          <Nav className='d-sm-flex flex-row justify-content-lg-start justify-content-evenly'>
            <Nav.Link as={Link} className='mx-2' to="/"><strong>blogs</strong></Nav.Link>
            <Nav.Link as={Link} className='mx-2' to="/users"><strong>users</strong></Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id='responsive-navbar-nav' className="justify-content-end">
          <Navbar.Text>
            {user.name} logged in <Button variant='dark' onClick={handleLogout}>logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h1><strong>blog app</strong></h1>
      </Container>
    </div>
  );
};

export default Header;
