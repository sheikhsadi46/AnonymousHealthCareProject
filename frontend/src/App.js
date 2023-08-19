import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import Home from './screens/Home';
import DoctorScreen from './screens/DoctorScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import AddressScreen from './screens/AddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceAppointmentScreen from './screens/PlaceAppointmentScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import AppointmentHistoryScreen from './screens/AppointmentHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
// import PrescriptionsScreen from './screens/PrescriptionsScreen';
import AdminRoute from './components/AdminRoute';
// import PrescriptionForm from './screens/PrescriptionForm';
import ChatScreen from './screens/Chat/ChatScreen';
import { ChakraProvider } from '@chakra-ui/react';
import VideoScreen from './screens/VideoScreen';
import DoctorListScreen from './screens/DoctorListScreen';
import DoctorEditScreen from './screens/DoctorEditScreen';
import AppointmentListScreen from './screens/AppointmentListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MapScreen from './screens/MapScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import Footer from './components/Footer';
import Logo from './assets/images/logo2.png';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/doctors/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          {/* <Header/> */}
          <Navbar bg="light" variant="light" expand="lg">
            <Container>
  

              <LinkContainer to="/">
                <Navbar.Brand>
                  <div>
                    <Link to="/">
                      <img src={Logo} alt="" />
                    </Link>
                  </div>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />

                <Nav className="me-auto  w-100  justify-content-end">
                
                  {userInfo && (
                    <>
                    <Link to="/chats" className="nav-link">
                      Chat
                    </Link>
                    <Link to="/video" className="nav-link">
                    Video Call
                  </Link></>
                  )}
                  <Link to="/doctors" className="nav-link">
                    Doctor
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.email} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/appointmenthistory">
                        <NavDropdown.Item>Appointment History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/doctors">
                        <NavDropdown.Item>Doctors</NavDropdown.Item>
                      </LinkContainer>
                      
                      <LinkContainer to="/admin/appointments">
                        <NavDropdown.Item>Appointments</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                 
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/doctor/:slug" element={<DoctorScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/video"
                element={
                  <ProtectedRoute>
                    <VideoScreen />
                  </ProtectedRoute>
                  
                }
              />
              <Route
                path="/chats"
                element={
                  <ChakraProvider>
                  <ProtectedRoute>
                    <ChatScreen />
                  </ProtectedRoute>
                  </ChakraProvider>
                }
              />
              <Route
                path="/forget-password"
                element={<ForgetPasswordScreen />}
              />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordScreen />}
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/placeappointment"
                element={<PlaceAppointmentScreen />}
              />
              <Route
                path="/appointment/:id"
                element={
                  <ProtectedRoute>
                    <AppointmentScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/appointmenthistory"
                element={
                  <ProtectedRoute>
                    <AppointmentHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/address" element={<AddressScreen />}></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/appointments"
                element={
                  <AdminRoute>
                    <AppointmentListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/doctors"
                element={
                  <AdminRoute>
                    <DoctorListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/doctor/:id"
                element={
                  <AdminRoute>
                    <DoctorEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
 
              
              <Route path="/Doctors" element={<HomeScreen />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <Footer />
         
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
