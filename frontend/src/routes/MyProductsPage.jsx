import ProductCard from '../components/ProductCard.jsx'
import {useState, useEffect} from 'react'
import {AnimatePresence} from 'framer-motion'
import PriceHistory from '../components/PriceHistory.jsx'
import FavoriteCard from '../components/FavoriteCard.jsx'
import './MyProductsPage.css'

export default function MyProductsPage(
                                        {products, pageNum, setPageNum, 
                                         itemsPerPage, setItemsPerPage, sortType, 
                                         setSortType, favorites, handleFavorite, 
                                         handleDeleteFavorite, getProducts, priceHistoryProduct, 
                                         setPriceHistoryProduct}
                                      ) {
    const [searchQuery, setSearchQuery] = useState('');
    

    //handles 
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase())
    }

    function updateTextInput(val) {
        document.getElementById('range').value=val; 
    }

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    }

    const handlePageNumChange = (e) => {
        setPageNum(Number(e.target.value))
    }

    useEffect(() => {
        getProducts()
    }, [sortType, pageNum, itemsPerPage])

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
                        <div className="sort-option">
                            <label>Sort By Name </label>
                            <input type="radio" name="sort" value="name" checked={sortType === 'name'} onChange={handleSortChange} />
                        </div>
                        <div className="sort-option">
                            <label>Sort By Price</label>
                            <input type="radio" name="sort" value="price" checked={sortType === 'price'} onChange={handleSortChange} />
                        </div>
                        <div className="sort-option">
                            <label>Sort By Trend</label>
                            <input type="radio" name="sort" value="trend" checked={sortType == 'trend'} onChange={handleSortChange} />
                        </div>
                        <div className="sort-option">
                            <label>Items Per Page</label>
                            <select className="items-per-page" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                    <div className='page-btns'>
                        {pageNum > 1 && (
                        <button className='page-button' onClick={handlePageNumChange} value={pageNum - 1}>Previous Page</button>
                        )
                        }
                        <button className='page-button' onClick={handlePageNumChange} value={pageNum + 1}>Next Page</button>
                    </div>

                    <div className="products-list">
                        {filteredProducts.length > 0 ? 
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
                                :
                                <h1 className="no-products">No products found</h1>
                           
                        }
                    </div>
                </div>
            </div>
            <AnimatePresence mode='wait'>
                {priceHistoryProduct && (
                    <PriceHistory className="price-history"
                        priceHistory={priceHistoryProduct.price_history}
                        setIsPriceHistory={() => setPriceHistoryProduct(null)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}