import './App.css';
import Home from './Components/Home';
import Service from './Components/Service';
import Headers from './Components/Headers';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';
import { Routes, Route } from "react-router-dom"
import About from './Components/About';
import Footer from './Components/Footer';
import Contact from './Components/Contact';
import Feature from './Components/Feature';
import Appointment from './Components/Appointment';
import Team from './Components/Team';
import Testimonial from './Components/Testimonial';
import AdminDashboard from "./Components/AdminDashboard";


import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './Components/Signup';


function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/about' element={<About/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/feature' element={<Feature/>} />
        <Route path='/appointment' element={<Appointment/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/*' element={<Error/>} />
        <Route path='/team' element={<Team/>} />
        <Route path='/testimonial' element={<Testimonial/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
