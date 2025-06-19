import ProductCard from '../components/ProductCard.jsx'
import {useState, useEffect} from 'react'
import {AnimatePresence} from 'framer-motion'
import PriceHistory from '../components/PriceHistory.jsx'
import FavoriteCard from '../components/FavoriteCard.jsx'
import './MyProductsPage.css'

export default function MyProductsPage({products, favorites, handleFavorite, handleDeleteFavorite, getProducts, priceHistoryProduct, setPriceHistoryProduct}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortType, setSortType] = useState('name');
    

    //handles 
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase())
    }

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    }

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [])

    const trendOrder = {
        decrease: 0,
        increase: 1,
        null: 2,
    };
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery)
    )
    .sort((a, b) => {
        if (sortType === 'name') {
            return a.title.localeCompare(b.title);
        }
        else if (sortType === 'price') {
            return a.price - b.price
        }
        else if (sortType === 'trend') {
            const aTrend = a.direction ?? null;
            const bTrend = b.direction ?? null;
            return trendOrder[aTrend] - trendOrder[bTrend];
        }
    });

    return (
        <>  <div className="products-page">
                <div className="products-col">
                    <div className="search-container">
                        <input className="search-bar"
                            onChange={handleSearch} 
                            type="search"
                            placeholder="Search products...">
                        </input>
                    </div>
                    <div className="sort-options">
                        <label>Sort By Name </label>
                        <input type="radio" name="sort" value="name" checked={sortType === 'name'} onChange={handleSortChange} />

                        <label>Sort By Price</label>
                        <input type="radio" name="sort" value="price" checked={sortType === 'price'} onChange={handleSortChange} />

                        <label>Sort By Trend</label>
                        <input type="radio" name="sort" value="trend" checked={sortType == 'trend'} onChange={handleSortChange} />
                    </div>
                    <div className="products-list">
                        {
                            filteredProducts.map((product, idx) => (
                                <ProductCard
                                    key={idx}
                                    product={product}
                                    handleFavorite={handleFavorite}
                                    favorites={favorites}
                                    isChecked={favorites.includes(product)}
                                    onShowPriceHistory={() => setPriceHistoryProduct(product)}
                                    
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <AnimatePresence mode='wait'>
                {priceHistoryProduct && (
                    <PriceHistory
                        priceHistory={priceHistoryProduct.price_history}
                        setIsPriceHistory={() => setPriceHistoryProduct(null)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}