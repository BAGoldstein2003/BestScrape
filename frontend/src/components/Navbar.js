import './Navbar.css'
import {useState} from 'react'
import {useNavigate} from 'react-router'
import { FcSearch } from "react-icons/fc";
import { CiCircleList } from "react-icons/ci";

export default function Navbar({setIsModal, isRegistered, setIsRegistered, setTypeModal, setModalText, forgetDevice}) {
  const [isLogoActive, setIsLogoActive] = useState(false);
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (!isRegistered) {
      if (path === '/my-products') {
        setIsModal(true)
        setTypeModal('error')
        setModalText('You must be logged in to view the products page!')
        navigate('/authenticate')
        return
      }
      if (path === '/search') {
        setIsModal(true)
        setTypeModal('error')
        setModalText('You must be logged in to search for products!')
        return
      }
    }
    navigate(path)
  }

  const handleLogoClick = () => {
    setIsLogoActive(prev => !prev)
  }

  const changeAuthState = () => {
    if (isRegistered) {
      setIsRegistered(false)
    }
    navigate('/authenticate')
    document.querySelector('auth-button')
    setIsLogoActive(false)
  }
  
  

    return (
        <div className="navbar">
          
          <img onClick={() => handleLogoClick()} className="logo" alt="logo" src="BEST_SCRAPE-removebg-preview.png"></img>
          <div className={`logo-options ${isLogoActive ? 'active' : ''}`}>
            <button className={`auth-button ${isRegistered ? 'log-out' : 'log-in'}`} onClick={changeAuthState}>{isRegistered ? 'Log Out' : 'Log In'}</button>
            <button className='forget-device' onClick={forgetDevice}>Forget This Device</button>
          </div>
          <div className="products" onClick={() => handleClick('/my-products')}>
            <CiCircleList size="50" fill="grey"/>
            <p className="products-link">View Products</p>
          </div>
          <div className="search" onClick={() => handleClick('/search')}>
            <FcSearch size="50" />
            <p className="search-link">Search For Products</p>
          </div>
          
          
        </div>
      
    )
}