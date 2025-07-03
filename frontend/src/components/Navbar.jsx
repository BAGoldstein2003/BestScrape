import './Navbar.css'
import {useState} from 'react'
import {useNavigate} from 'react-router'
import { CiCircleList } from "react-icons/ci";
import { FcSearch } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar({setIsModal, isRegistered, setIsRegistered, setTypeModal, setModalText, forgetDevice}) {
  const [isLogoActive, setIsLogoActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleClick = (path) => {
    switch (path) {
      case '/my-products':
        if (!isRegistered) {
          setIsModal(true)
          setTypeModal('error')
          setModalText('You must be logged in to view all products!')
          navigate('/')
          break;
        }
        else {
          navigate('/my-products')
          break;
        }
      case '/favorites':
        if (!isRegistered) {
          setIsModal(true)
          setTypeModal('error')
          setModalText('You must be logged in to view your favorites!')
          navigate('/')
          break;
        }
        else {
          navigate('/favorites');
          break;
        }
      case '/search':
        if (!isRegistered) {
          setIsModal(true);
          setTypeModal('error');
          setModalText('You must be logged in to search for products!');
          navigate('/')
          break;
        }
        else {
          navigate('/search')
          break;
        }
      default:
        break;
    }
  }

  const handleLogoClick = () => {
    setIsLogoActive(prev => !prev)
    console.log('clicked logo')
    console.log(isLogoActive)
  }

  const changeAuthState = () => {
    if (isRegistered) {
      setIsRegistered(false)
    }
    navigate('/')
    document.querySelector('auth-button')
    setIsLogoActive(false)
  }
  
  const forgetDeviceAndHideOptions = () => {
    forgetDevice();
    setIsLogoActive(false);
  }
  

    return (
      <>
        <div className="navbar">
          <img onClick={() => handleLogoClick()} className="logo" alt="logo" src="BEST_SCRAPE-removebg-preview.png"/>
          <div className="nav-option" onClick={() => handleClick('/my-products')} style={{opacity: isCollapsed ? 0 : 1, display: isCollapsed ? 'none' : 'flex'}}>
            <CiCircleList className="products-icon" size="50" fill="grey"/>
            <p className="products-link">View Products</p>
          </div>
          <div className="nav-option" onClick={() => handleClick('/favorites')} style={{opacity: isCollapsed ? 0 : 1, display: isCollapsed ? 'none' : 'flex'}}>
            <FaHeart className="favorites-icon" size="50" fill="pink"/>
            <p className="favorites-link">Your Favorites</p>
          </div>
          <div className="nav-option" onClick={() => handleClick('/search')} style={{opacity: isCollapsed ? 0 : 1, display: isCollapsed ? 'none' : 'flex'}}>
            <FcSearch className="search-icon" size="50" />
            <p className="search-link">Search For Products</p>
          </div>
        </div>
        
        <RxHamburgerMenu className='collapse-btn' onClick={() => {setIsCollapsed(prev => !prev)}} />
        <div className={`logo-options ${isLogoActive ? 'active' : ''}`}>
          <button className={`auth-button ${isRegistered ? 'log-out' : 'log-in'}`} onClick={changeAuthState}>{isRegistered ? 'Log Out' : 'Log In'}</button>
          <button className='forget-device' onClick={forgetDeviceAndHideOptions}>Forget This Device</button>
        </div>
      </>
    )
}