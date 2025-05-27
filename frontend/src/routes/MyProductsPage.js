import ProductCard from '../components/ProductCard.js'
import {useState, useEffect} from 'react'
import {AnimatePresence} from 'framer-motion'
import './MyProductsPage.css'
import PriceHistory from '../components/PriceHistory.js'

export default function MyProductsPage({products, getProducts}) {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortType, setSortType] = useState('name');
    const [priceHistoryProduct, setPriceHistoryProduct] = useState(null);

    //handles 
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase())
    }

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    }

    useEffect(() => {
        getProducts()
    }, [getProducts])

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery)
    )
    .sort((a, b) => {
        if (sortType === 'name') {
            return a.title.localeCompare(b.title);
        }
        else {
            return a.price - b.price
        }
    });

    return (
        <>  
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
            </div>
            <div className="products-page">
                {
                    filteredProducts.map((product, idx) => (
                        <ProductCard
                            key={product.SKU || idx}
                            product={product}
                            onShowPriceHistory={() => setPriceHistoryProduct(product)}
                        />
                    ))
                }
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