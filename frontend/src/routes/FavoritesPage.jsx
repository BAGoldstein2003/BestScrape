import './FavoritesPage.css'
import {AnimatePresence} from 'framer-motion'
import FavoriteCard from '../components/FavoriteCard.jsx'
import PriceHistory from '../components/PriceHistory.jsx'

export default function FavoritesPage({favorites, handleDeleteFavorite, priceHistory, setIsPriceHistory, priceHistoryProduct, setPriceHistoryProduct}) {
    return (
        <>
            <AnimatePresence mode='wait'>
                {priceHistoryProduct && (
                    <PriceHistory
                        priceHistory={priceHistoryProduct.price_history}
                        setIsPriceHistory={() => setPriceHistoryProduct(null)}
                    />
                )}
            </AnimatePresence>
            <div>
                <h1 className="favorites-title"><span>Your </span><span>Tracked </span> <span>Products:</span></h1>
                {
                    favorites.map(product => (
                        <FavoriteCard
                        product={product}
                        handleDelete={handleDeleteFavorite}
                        onShowPriceHistory={() => setPriceHistoryProduct(product)}
                        />
                    ))
                }
            </div>
        </>
    )
}