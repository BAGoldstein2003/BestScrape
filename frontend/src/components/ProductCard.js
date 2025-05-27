import './ProductCard.css'
import {useState} from 'react'
import {motion} from 'framer-motion'
import PriceTrend from './PriceTrend'



export default function ProductCard({product, onShowPriceHistory}) {

    return (
        
        <motion.div
         className="product-card"
         initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
         animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
        >   
            <input type="checkbox"></input>
            <img className='image' src={product.imgSrc} alt='product'></img>
            <p className="title">{product.title}</p>
            <button className="price-history" onClick={onShowPriceHistory}>Price History</button>
            <PriceTrend className="price" priceHistory={product.price_history}></PriceTrend>
            <h4>SKU: {product.SKU}</h4>
        </motion.div>
    )
}