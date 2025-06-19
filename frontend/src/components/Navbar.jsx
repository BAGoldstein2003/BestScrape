import './Navbar.css'
import {useState} from 'react'
import {useNavigate} from 'react-router'
import { CiCircleList } from "react-icons/ci";
import { FcSearch } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import Subscribe from './Subscribe.jsx'

export default function Navbar({setIsModal, isRegistered, setIsRegistered, setTypeModal, setModalText}) {
  const [isLogoActive, setIsLogoActive] = useState(false);
  const navigate = useNavigate();

  const handleClick = (path) => {
    switch (path) {
      case '/my-products':
        if (!isRegistered) {
          setIsModal(true)
          setTypeModal('error')
          setModalText('You must be logged in to view all products!')
          navigate('/authenticate')
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
          break;
        }
        else {
          navigate('/search')
          break;
        }
    }
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
      <>
        <div className="navbar">
          <img onClick={() => handleLogoClick()} className="logo" alt="logo" src="BEST_SCRAPE-removebg-preview.png"/>
          <div className="products" onClick={() => handleClick('/my-products')}>
            <CiCircleList className="products-icon" size="50" fill="grey"/>
            <p className="products-link">View Products</p>
          </div>
          <div className="favorites" onClick={() => handleClick('/favorites')}>
            <FaHeart className="favorites-icon" size="50" fill="pink"/>
            <p className="favorites-link">Your Favorites</p>
          </div>
          <div className="search" onClick={() => handleClick('/search')}>
            <FcSearch className="search-icon" size="50" />
            <p className="search-link">Search For Products</p>
          </div>
        </div>
        
        <div className={`logo-options ${isLogoActive ? 'active' : ''}`}>
          <button className={`auth-button ${isRegistered ? 'log-out' : 'log-in'}`} onClick={changeAuthState}>{isRegistered ? 'Log Out' : 'Log In'}</button>
        </div>
      </>
    )
}