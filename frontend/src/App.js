import './App.css';
import {useState, useEffect} from 'react'
import {Routes, Route, useLocation, useNavigate} from 'react-router'
import AuthPage from './routes/AuthPage.js'
import MyProductsPage from './routes/MyProductsPage.js'
import SearchPage from './routes/SearchPage.js'
import Modal from './components/Modal.js'
import Navbar from './components/Navbar.js'
import Subscribe from './components/Subscribe.js'
import PriceHistory from './components/PriceHistory.js'
import {AnimatePresence} from 'framer-motion'


function App() {

  const [isRegistered, setIsRegistered] = useState(false);
  const [scrapedProducts, setScrapedProducts] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [modalText, setModalText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: null,
    email: null,
    id: null
  });

  const location = useLocation();
  const navigate = useNavigate();
  const appHeight = ((location.pathname === '/my-products') && (scrapedProducts.length > 8)) ? '100%' : '100vh';

  const getProductsFromDB = async () => {
    if (scrapedProducts.length !== 0) {
      return
    }
    setTypeModal('loading')
    setModalText('Loading Product Data. Please be patient')
    setIsModal(true)
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'GET'
      })
      const products = await response.json()
      console.log('products:', {products})
      setTimeout(() => {
        setIsModal(false)
        setScrapedProducts(products)
      }, 500)
    }
    catch {
      setTypeModal('error')
    }

    //save products in state
    
  }

  const subscribe = async () => {
    setIsModal(true)
    setModalText('Please Wait while we subscribe you to our newsletter.')
    setTypeModal('loading')
    const response = await fetch(`http://localhost:5000/subscribe?userid=${userInfo.id}&useremail=${userInfo.email}`)
    const data = await response.json();
    console.log('server response:', data)
    if (data.error) {
      setIsModal(true)
      setModalText('email could not send, please check your connection')
      setTypeModal('error')
    }
    else {
      setIsModal(true)
      setModalText('subscription email successfully sent!')
      setTypeModal('success')
    }
  }

  const searchProducts = async () => {
    const encodedQuery = encodeURIComponent(searchQuery)
    setTypeModal('loading');
    setIsModal(true);
    const queriedProducts = await fetch(`http://localhost:5000/scrape?query=${encodedQuery}&userid`, {
      method: 'GET'
    })
    setIsModal(false);
    console.log(`products caught: ${queriedProducts}`)
    setScrapedProducts(queriedProducts)
    console.log(scrapedProducts)
  }

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/authenticate')
    }
  }, )


  return (
    
    <div className="App" style={{ height: appHeight }}>
      <div className="gradient-bg"></div>
      <Navbar isRegistered={isRegistered} setIsRegistered={setIsRegistered} setIsModal={setIsModal} setTypeModal={setTypeModal} setModalText={setModalText}/>
      <AnimatePresence>
        {
          isModal && <Modal key="modal" className="loading" typeModal={typeModal} setIsModal={setIsModal} modalText={modalText} isModal={isModal}></Modal>
        }
        {
          isRegistered && <Subscribe subscribe={subscribe}></Subscribe>
        }
      <Routes location={location} key={location.pathname}>
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
    </AnimatePresence>
    </div>

  );
}

export default App;
