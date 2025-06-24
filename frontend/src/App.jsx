import './App.css';
import {useState, useCallback, useEffect} from 'react'
import {Routes, Route, useLocation, useNavigate} from 'react-router'
import AuthPage from './routes/AuthPage.jsx'
import MyProductsPage from './routes/MyProductsPage.jsx'
import SearchPage from './routes/SearchPage.jsx'
import FavoritesPage from './routes/FavoritesPage.jsx'
import Modal from './components/Modal.jsx'
import Navbar from './components/Navbar.jsx'
import LockScreen from './components/LockScreen.jsx'
import {AnimatePresence} from 'framer-motion'


function App() {
  const [isLocal, setIsLocal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [scrapedProducts, setScrapedProducts] = useState([]);
  const [priceHistoryProduct, setPriceHistoryProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [modalText, setModalText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: null,
    email: null,
    id: null
  });
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortType, setSortType] = useState('name');
  const location = useLocation();
  const navigate = useNavigate();
  const appHeight = (location.pathname === '/my-products') ? '100%' : '100vh';

  //CHANGE BACK TO HOSTED API AFTER TESTING
  const getProducts = useCallback(async () => {
    setTypeModal('loading')
    setModalText('Loading Product Data. Please be patient')
    setIsModal(true)
    
    try {
      const response = await fetch(`https://bestscrape-api-official.onrender.com/products?pageNum=${pageNum}&itemsPerPage=${itemsPerPage}&sortType=${sortType}`, {
        method: 'GET'
      })
      const products = await response.json()
      console.log('products:', {scrapedProducts})
      setTimeout(() => {
        setIsModal(false)
        setScrapedProducts(products)
      }, 500)
    }
    catch {
      setTypeModal('error')
      setModalText('Error trying to fetch products. Please try restarting your connection')
      getDummyData()
    }
    //save products in state
  }, [pageNum, itemsPerPage, sortType, setTypeModal, setModalText, setScrapedProducts])


  const handleFavorite = (productChecked, isChecked) => {
    setFavorites((prev) =>
      isChecked ? 
        [...prev, productChecked]                      
      : 
        prev.filter((product) => product !== productChecked)
    );
  };

  const handleDeleteFavorite = (productDeleted) => {
    setFavorites((prev) => prev.filter((product) => product !== productDeleted));
  }

  const getDummyData = async () => {
    try {
      const response = await fetch('dummyData.json')
      const data = await response.json()
      console.log('dummy data:', data)
      setScrapedProducts(data)
    }
    catch {
      console.error('error fetching dummy data')
    }
    
    return
  }

  const subscribe = async () => {
    setIsModal(true)
    setModalText('Please Wait while we subscribe you to our newsletter.')
    setTypeModal('loading')

    try {
      const response = await fetch(`https://bestscrape-api-official.onrender.com/subscribe?userid=${userInfo.id}&useremail=${userInfo.email}`)
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
    catch {
      setTypeModal('error')
      setModalText('error trying to subscribe your account. Please check your internet connection.')
    }
  }

  const forgetDevice = () => {
    navigate('/');
    setIsLocal(false);
  }

  const searchProducts = async () => {
    const encodedQuery = encodeURIComponent(searchQuery)
    setTypeModal('loading');
    setIsModal(true);
    const queriedProducts = await fetch(`https://bestscrape-api-official.onrender.com//scrape?query=${encodedQuery}&userid`, {
      method: 'GET'
    })
    setIsModal(false);
    console.log(`products caught: ${queriedProducts}`)
    setScrapedProducts(queriedProducts)
    console.log(scrapedProducts)
  }

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, [getProducts]);

  return (
    
    <div className="App" style={{ height: appHeight }}>
      <div className="gradient-bg"></div>
      {
        !isLocal && <LockScreen setIsLocal={setIsLocal} />
      }
      <Navbar className="navbar-app" isRegistered={isRegistered}
       setIsRegistered={setIsRegistered}
       setIsModal={setIsModal}
       setTypeModal={setTypeModal}
       setModalText={setModalText}
       subscribe={subscribe}
       forgetDevice={forgetDevice}/>
      <AnimatePresence>
        {
          isModal && <Modal key="modal" className="loading" typeModal={typeModal} setIsModal={setIsModal} modalText={modalText} isModal={isModal}></Modal>
        }
      <Routes location={location} key={location.pathname}>
        <Route 
          path='/' 
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
          element={<MyProductsPage products={scrapedProducts}
          pageNum={pageNum}
          setPageNum={setPageNum}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          sortType={sortType}
          setSortType={setSortType}
          favorites={favorites}
          handleFavorite={handleFavorite}
          handleDeleteFavorite={handleDeleteFavorite}
          getProducts={getProducts}
          priceHistoryProduct={priceHistoryProduct}
          setPriceHistoryProduct={setPriceHistoryProduct}/>}
        />
        <Route
          path='/search'
          element={<SearchPage 
            searchProducts={searchProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}/>}
        />
        <Route
          path='/favorites'
          element={<FavoritesPage
            favorites={favorites} 
            handleDeleteFavorite={handleDeleteFavorite}
            priceHistoryProduct={priceHistoryProduct}
            setPriceHistoryProduct={setPriceHistoryProduct}/>
          }
        />
      </Routes>
    </AnimatePresence>
    </div>

  );
}

export default App;