import './FavoritesPage.css'
import {AnimatePresence, motion} from 'framer-motion'
import FavoriteCard from '../components/FavoriteCard.jsx'
import PriceHistory from '../components/PriceHistory.jsx'

export default function FavoritesPage({favorites, handleDeleteFavorite, priceHistory, setIsPriceHistory, priceHistoryProduct, setPriceHistoryProduct}) {
    return (
        <>
            <AnimatePresence mode='wait'>
                {priceHistoryProduct && (
                    <PriceHistory className="price-history"
                        priceHistory={priceHistoryProduct.price_history}
                        setIsPriceHistory={() => setPriceHistoryProduct(null)}
                    />
                )}
            </AnimatePresence>
            <motion.h1 className="favorites-title"
             initial={{ scaleX: 0, opacity: 0, x: -300 }}
             animate={{ scaleX: 1, opacity: 1, x: 0}}
             transition={{ duration: 0.3 }}
             style={{originX: 0.5}}
            ><span>Your </span><span>Tracked </span> <span>Products:</span></motion.h1>
            {
                favorites.map(product => (
                    <FavoriteCard
                    product={product}
                    handleDelete={handleDeleteFavorite}
                    onShowPriceHistory={() => setPriceHistoryProduct(product)}
                    />
                ))
            }
        </>
    )
}