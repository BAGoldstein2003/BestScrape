import './Navbar.css'
import { motion } from 'framer-motion'
import {useNavigate} from 'react-router'
import { FcSearch } from "react-icons/fc";
import { CiCircleList } from "react-icons/ci";

export default function Navbar({setIsModal, isRegistered, setTypeModal, setModalText}) {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    if (isRegistered) {
      navigate('/my-products')
    }
    else {
      setModalText('You must be logged in to visit this page!')
      setTypeModal('error')
      setIsModal(true)
    }
  }

  const handleSearchClick = () => {
    if (isRegistered) {
      navigate('/search')
    }
    else {
      setModalText('You must be logged in to search for products!')
      setTypeModal('error')
      setIsModal(true)
    }
  }

  const handleProductsClick = () => {
    if (isRegistered) {
      navigate('/my-products')
    }
    else {
      setModalText('You must be logged in to view products!')
      setTypeModal('error')
      setIsModal(true)
    }
  }

    return (
      
        <div className="navbar">
          
          <a onClick={handleLogoClick}><img className="logo" alt="logo" src="BEST_SCRAPE-removebg-preview.png"></img></a>
          <div className="products" onClick={handleProductsClick}>
            <CiCircleList size="50" fill="grey"/>
            <a className="products-link">View Products</a>
          </div>
          <div className="search" onClick={handleSearchClick}>
            <FcSearch size="50" />
            <a className="search-link">Search For Products</a>
          </div>
          
          
        </div>
      
    )
}