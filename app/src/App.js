import Login from './components/Login'
import {Routes, Route,BrowserRouter} from 'react-router-dom'
import Reset from './components/Reset'
import CreateAccount from './components/CreateAccount'
import Otp from './components/Otp'
import NewPassword from './components/NewPassword'
import LandingPage from './components/LandingPage'
import Home from './components/HomePage'
import Context from './Context/Context'
import Profile from './components/Profile'
import History from './components/History'
import Transfer from './components/Transfer'
import Balance from './components/Balance'
import {useState} from 'react'
const App=()=>{
  const [activeTabId,setActiveTabId]=useState('HOME');
  const changeActiveTabId=(tabId)=>{
    setActiveTabId(tabId);
  }
  return(
  <Context.Provider value={{activeTabId,changeActiveTabId:changeActiveTabId}}>
      
    <BrowserRouter>
   <Routes>
   <Route exact path="/login" element={<Login/>}/>
   <Route exact path="/reset-password" element={<Reset/>}/>
   <Route exact path='/create-account' element={<CreateAccount/>}/>
   <Route exact path="/otp" element={<Otp/>}/>
   <Route exact path="/new-password" element={<NewPassword/>}/>
   <Route exact path="/" element={<LandingPage/>}/>
   <Route exact path='/home' element={<Home/>}/>
   <Route exact path="/profile" element={<Profile/>}/>
   <Route exact path="/history" element={<History/>}/>
   <Route exact path="/transfer" element={<Transfer/>}/>
   <Route exact path="/balance" element={<Balance/>}/>
   </Routes>
   </BrowserRouter>
  
  </Context.Provider>
  )
}
export default App