import './App.css';
import RegisterForm from './components/RegisterForm.js'
import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router'
import AuthPage from './routes/AuthPage.js'
import MyProductsPage from './routes/MyProductsPage.js'
import LoadingModal from './components/LoadingModal.js'
import Navbar from './components/Navbar.js'


function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    phone: ''
  });
  const navigate = useNavigate();

  //set URL upon startup
  useEffect(() => {
    navigate('/authenticate')
  }, [])
  return (
    
    <div className="App">
      <Navbar />
      {
        loading && <LoadingModal className="loading"></LoadingModal>
      }
      
      <Routes>
        <Route 
          path='/authenticate' 
          element={<AuthPage 
            isRegistered={isRegistered} 
            setIsRegistered={setIsRegistered} 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} 
            setLoading={setLoading}>
            </AuthPage>}
        />
        <Route
          path='/my-products'
          element={<MyProductsPage />}
        />
      </Routes>
    </div>

  );
}

export default App;
