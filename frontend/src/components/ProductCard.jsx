import './ProductCard.css'
import {useState} from 'react'
import {motion} from 'framer-motion'
import PriceTrend from './PriceTrend'
import { FaHeart } from "react-icons/fa";


export default function ProductCard({product, onShowPriceHistory, handleFavorite, isChecked}) {


    

    return (
        
        <motion.div
         className={`product-card ${product.direction ? product.direction : ''}`}
         initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
         whileInView={{ scaleX: 1, scaleY: 1, opacity: 1 }}
         viewport={{once: false, amount: 0.2}}
        >   
            <div className="heart-icon" onClick={() => handleFavorite(product, !isChecked)} style={{ cursor: 'pointer' }}>
                <FaHeart color={isChecked ? 'red' : 'gray'} size={24} />
            </div>
            <img className='image' src={product.imgSrc} alt='product'></img>
            <p className="title">{product.title}</p>
            <PriceTrend className="price" priceHistory={product.price_history}></PriceTrend>
            <button className="price-history" onClick={onShowPriceHistory}>Price History</button>
            <h4>SKU: {product.SKU}</h4>
        </motion.div>
    )
}