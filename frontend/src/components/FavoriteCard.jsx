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
         initial={{ opacity: 0 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.7 }}
         whileInView={{ scaleX: 1, scaleY: 1, opacity: 1 }}
         viewport={{once: false, amount: 0.2}}>   
            <img className='image' src={product.imgSrc} alt='product'></img>
            <p className="title">{product.title}</p>
            <PriceTrend className="price" priceHistory={product.price_history}></PriceTrend>
            <button className="price-history" onClick={onShowPriceHistory}>Price History</button>
            <button className="delete-btn" onClick={() => handleDelete(product)}>Delete Favorite</button>
            <h4>SKU: {product.SKU}</h4>
        </motion.div>
    )
}