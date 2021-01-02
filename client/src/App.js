import React, {useEffect} from "react";
// import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Navigate,
  Link,
  useRoutes,
  Routes,
} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "../src/components/GlobalStyles";
import "../src/mixins/chartjs";
import theme from "../src/theme";
import routes from "../src/routes";
import {dispatchLogin, dispatchGetUser, fetchUser} from '../src/redux/actions/authAction'
import Login from "./components/Login/Login";
import PageNotFound from "./components/404/404";
import Home from "./components/Home/Home";
import MainLayout from "./components/MainLayout";
import Register from "./components/Register/Register";
import ActivationEmail from "./components/Register/Activation";
import ForgotPassword from "./components/Register/ForgetPassword";
import ResetPassword from "./components/Register/ResetPassword";
import EventPage from "./components/Event/EventPage";
import EventDetail from "./components/Event/EventDetail";
import SpeakersContainer from "./components/Speakers/SpeakerCard";
import SpeakersPage from "./components/Speakers/SpeakersPage";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import SpeakerDetail from "./components/Speakers/SpeakerDetail";
import DashboardLayout from "./components/AdminLayout";
import CustomerListView from "./views/customer/CustomerListView";


// import DashboardLayout from "./components/AdminLayout";
function App() {
  const routing = useRoutes(routes);
  const dispatch = useDispatch();
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/api/users/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <Routes>
          <Route path="/" element={<MainLayout/>} >
            <Route path="/" element={<Home/>} />,
            <Route path="home" element={<Navigate to="/"/>} />,
            <Route path="login" element={ auth.isLogged ? <PageNotFound/>: <Login/>} />
            <Route path="register" element={ auth.isLogged ? <PageNotFound/> : <Register/>} />,
            <Route path="user" element={<ActivationEmail/>} />,
            <Route path="/forget" element={<ForgotPassword/>} />,
            <Route path="/events" element={<EventPage/>} />,
            <Route path="/events/:id" element={<EventDetail/>} />,
            <Route path="/speakers" element={<SpeakersPage/>} />,
            <Route path="/speakers/:id" element={<SpeakerDetail/>} />,
            <Route path="/about" element={<About/>} />,
            <Route path="/contact" element={<Contact/>}/>
            <Route path="*" element={<PageNotFound/>} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route path="/events" element={<CustomerListView/>}/>
          </Route>
          <Route path="user" element={<MainLayout/>} >
            <Route path="/activate/:activation_token" element={ auth.isLogged ? <PageNotFound/> : <ActivationEmail/>} />,
            <Route path="/reset/:token" element={ auth.isLogged ? <PageNotFound/> : <ResetPassword />}/>
          </Route>

        </Routes>
    </ThemeProvider>
  );
}
export default App;
