import {motion} from 'framer-motion'
import PriceTrend from './PriceTrend.jsx'
import './FavoriteCard.css'

export default function FavoriteCard({product, handleDelete, onShowPriceHistory}) {
    const onDelete = () => {
        handleDelete(product)
    }

    return (
        <motion.div
         className={`favorite-card ${product.direction}`}
         initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
         animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}>   
            <img className='image' src={product.imgSrc} alt='product'></img>
            <p className="title">{product.title}</p>
            <PriceTrend className="price" priceHistory={product.price_history}></PriceTrend>
            <button className="price-history" onClick={onShowPriceHistory}>Price History</button>
            <button className="delete-btn" onClick={() => handleDelete(product)}>Delete Favorite</button>
            <h4>SKU: {product.SKU}</h4>
        </motion.div>
    )
}