import './App.css';
import {useState, useEffect} from 'react'
import {Routes, Route, useLocation, useNavigate} from 'react-router'
import AuthPage from './routes/AuthPage.js'
import MyProductsPage from './routes/MyProductsPage.js'
import SearchPage from './routes/SearchPage.js'
import Modal from './components/Modal.js'
import Navbar from './components/Navbar.js'
import {AnimatePresence} from 'framer-motion'


function App() {

  const [isRegistered, setIsRegistered] = useState(false);
  const [scrapedProducts, setScrapedProducts] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [typeModal, setTypeModal] = useState('loading');
  const [modalText, setModalText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
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
    const response = await fetch('http://localhost:5000/products', {
      method: 'GET'
    })
    const products = await response.json()

    //save products in state
    console.log('products:', products)
    setTimeout(() => {
      setIsModal(false)
      setScrapedProducts(products)
    }, 500)
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
      <Navbar isRegistered={isRegistered} setIsRegistered={setIsRegistered} setIsModal={setIsModal} setTypeModal={setTypeModal} setModalText={setModalText}/>
      <AnimatePresence mode="wait">
      {
        isModal && <Modal typeModal = {typeModal} setIsModal={setIsModal} modalText={modalText} className="loading"></Modal>
      }
      </AnimatePresence>
    <AnimatePresence>
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
