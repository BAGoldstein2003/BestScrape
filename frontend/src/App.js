import './App.css';
import RegisterForm from './components/RegisterForm.js'
import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router'
import AuthPage from './routes/AuthPage.js'
import MyProductsPage from './routes/MyProductsPage.js'
import SearchPage from './routes/SearchPage.js'
import Modal from './components/Modal.js'
import Navbar from './components/Navbar.js'
import {AnimatePresence} from 'framer-motion'


function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [scrapedProducts, setScrapedProducts] = useState()
  const [isModal, setIsModal] = useState(false)
  const [typeModal, setTypeModal] = useState('loading')
  const [modalText, setModalText] = useState('')
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    phone: ''
  });
  const navigate = useNavigate();


  useEffect(() => {
    if (!isRegistered) {
      navigate('/authenticate')
      setIsModal()
      setTimeout(() => {
      console.log("After 2 seconds");
      }, 2000);
      

    }
  }, [])

  const searchProducts = async (query) => {
    setTypeModal()
    setIsModal(true)
  }
  //set URL upon startup

  return (
    
    <div className="App">
      <Navbar isRegistered={isRegistered} setIsModal={setIsModal} setTypeModal={setTypeModal} setModalText={setModalText}/>
      <AnimatePresence>
      {
        isModal && <Modal typeModal = {typeModal} setIsModal={setIsModal} modalText={modalText} className="loading"></Modal>
      }
      </AnimatePresence>
      {
        isRegistered && <h3 className="greeting">Welcome, {userInfo.name}!</h3>
      }
      
      <Routes>
        <Route 
          path='/authenticate' 
          element={<AuthPage 
            isRegistered={isRegistered} 
            setIsRegistered={setIsRegistered} 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} 
            setIsModal={setIsModal}
            setTypeModal={setTypeModal}
            setModalText={setModalText}>
            </AuthPage>}
        />
        <Route
          path='/my-products'
          element={<MyProductsPage />}
        />
        <Route
          path='/search'
          element={<SearchPage 
          searchProducts={searchProducts}/>}
        />
      </Routes>
    </div>

  );
}

export default App;
