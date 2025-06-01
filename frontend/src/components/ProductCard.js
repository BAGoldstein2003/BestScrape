import './ProductCard.css'
import {useState} from 'react'
import {motion} from 'framer-motion'
import PriceTrend from './PriceTrend'


export default function ProductCard({product, onShowPriceHistory, setFavorites}) {


    const handleFavorite = (event) => {
        if (event.target.checked) {
            setFavorites((prev) => [...prev, product]);
        } 
        else {
            setFavorites((prev) => prev.filter((product) => product !== product));
        }
    }

    return (
        
        <motion.div
         className={`product-card ${product.direction}`}
         initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
         animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
        >   
            <input type="checkbox"></input>
            <img className='image' src={product.imgSrc} alt='product'></img>
            <p className="title">{product.title}</p>
            <PriceTrend className="price" priceHistory={product.price_history}></PriceTrend>
            <button className="price-history" onClick={onShowPriceHistory}>Price History</button>
            <h4>SKU: {product.SKU}</h4>
        </motion.div>
    )
}