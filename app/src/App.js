import Login from './components/Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Reset from './components/Reset';
import CreateAccount from './components/CreateAccount';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import Home from './components/HomePage';
import Context from './Context/Context';
import Profile from './components/Profile';
import History from './components/History';
import Balance from './components/Balance';
import ChangeNumber from './components/ChangeNumber';
import Admin from './components/Admin';
import { useState } from 'react';

const App = () => {
  const [activeTabId, setActiveTabId] = useState('HOME');

  const changeActiveTabId = (tabId) => {
    setActiveTabId(tabId);
  };

  return (
    <Context.Provider value={{ activeTabId, changeActiveTabId }}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/change-number" element={<ChangeNumber />} />
          <Route path="/" element={<LandingPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
