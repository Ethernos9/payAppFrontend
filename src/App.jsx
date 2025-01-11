
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeatureSection'
import TestimonialsSection from './components/TestimonialsSection'
import DownloadSection from './components/DownloadSection'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateAccount from './pages/CreateAccount'
import GetUser from './pages/GetUser'
import Dashboard from './pages/Dashboard'
import GetInfo from './pages/GetInfo'
import Transfer from './pages/Transfer'
import Transaction from './pages/Transaction'
import ShowTransaction from './pages/ShowTransaction'
import MobileTransfer from './pages/MobileTransfer'
import ProtectedRoute from './ProtectedRoute'

function App() {


  return (
   <div>
    <Router>
        <Routes>
           <Route path='/' element = {<HomePage/>}/>
           <Route path='/protected' element = {<ProtectedRoute/>}/>
           <Route path='/login' element = {<Login/>}/>
           <Route path='/signup' element = {<Signup/>}/>
           <Route path='/create/account' element = {
            <ProtectedRoute>
            <CreateAccount/>
          </ProtectedRoute>
           }/>
           <Route path='/get/user' element = {<GetUser/>}/>
           <Route path='/dashboard' element = {<ProtectedRoute>
             <Dashboard/>
           </ProtectedRoute>}/>
           <Route path='/getInfo' element = {<GetInfo/>}/>
           <Route path='/transfer' element = {<ProtectedRoute>
             <Transfer/>
           </ProtectedRoute>}/>
           <Route path='/show-transactions' element = {<ProtectedRoute>
             <ShowTransaction/>
           </ProtectedRoute>}/>
           <Route path='/transaction/:transactionId' element = {<ProtectedRoute>
             <Transaction/>
           </ProtectedRoute>}/>
           <Route path='/mobile-transfer' element = {<ProtectedRoute>
             <MobileTransfer/>
           </ProtectedRoute>}/>

        </Routes>
    </Router>
   </div>
  )
}

export default App
