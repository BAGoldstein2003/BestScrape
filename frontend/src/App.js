import './App.css';
import RegisterForm from './components/RegisterForm.js'
import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, useNavigate, useLocation} from 'react-router'
import AuthPage from './routes/AuthPage.js'
import MyProductsPage from './routes/MyProductsPage.js'
import SearchPage from './routes/SearchPage.js'
import Modal from './components/Modal.js'
import Navbar from './components/Navbar.js'
import {AnimatePresence} from 'framer-motion'


function App() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [scrapedProducts, setScrapedProducts] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [typeModal, setTypeModal] = useState('loading')
  const [modalText, setModalText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    phone: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const appHeight = location.pathname === '/my-products' ? '100%' : '100vh';

  const getProductsFromDB = async () => {
    setTypeModal('loading')
    setModalText('Loading Product Data. Please be patient')
    setIsModal(true)
    const response = await fetch('http://localhost:5000/products', {
      method: 'GET'
    })
    const products = await response.json()

    setScrapedProducts(products)
    console.log('products:', products)
    setIsModal(false)
  }

  const searchProducts = async () => {
    const encodedQuery = encodeURIComponent(searchQuery)
    setTypeModal('loading');
    setIsModal(true);
    const queriedProducts = await fetch(`http://localhost:5000/scrape?query=${encodedQuery}`, {
      method: 'GET'
    })
    setIsModal(false);
    console.log(`products caught: ${queriedProducts}`)
    const filtered = removeDuplicateSKUs(scrapedProducts, queriedProducts)
    setScrapedProducts(queriedProducts)
    console.log(scrapedProducts)
  }

  const removeDuplicateSKUs = (existingItems, newItems) => {
    const existingSKUs = new Set(existingItems.map(item => item.productSKU));

    return newItems.filter(item => !existingSKUs.has(item.productSKU));
  }

  return (
    
    <div className="App" style={{ height: appHeight }}>
      <Navbar isRegistered={isRegistered} setIsModal={setIsModal} setTypeModal={setTypeModal} setModalText={setModalText}/>
      <AnimatePresence>
      {
        isModal && <Modal typeModal = {typeModal} setIsModal={setIsModal} modalText={modalText} className="loading"></Modal>
      }
      </AnimatePresence>
      
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
          element={<MyProductsPage products={scrapedProducts} getProducts={getProductsFromDB}/>}
        />
        <Route
          path='/search'
          element={<SearchPage 
          searchProducts={searchProducts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}/>}
        />
      </Routes>
    </div>

  );
}

export default App;
