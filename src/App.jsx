import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
import LandingPage from "./Pages/LandingPage"
import Dashboard from "./Pages/Dashboard"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Notfound from "./Pages/Notfound"
import { auth } from "./firebase";
import './index.css'
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Pages/Footer";



function App() {
 
  return (
    <div  style={{ width: '100%',
      minHeight:' 100vh',
      backgroundColor: "var(--body)"}}>
    <ToastContainer/>
   <Router>
     <Routes>
       <Route path="/" element={<LandingPage />} />
       <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
       <Route path="*" element={<Notfound />} />
       
     </Routes>
   </Router>
   <Footer/>
   </div>
  )
}

export default App
