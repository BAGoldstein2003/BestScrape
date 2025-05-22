import ProductCard from '../components/ProductCard.js'
import {useState, useEffect} from 'react'
import './MyProductsPage.css'


export default function MyProductsPage({products, getProducts}) {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortType, setSortType] = useState('name');
    
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase())
    }

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    }

    useEffect(() => {
        getProducts()
        console.log(`products: ${products}`)
    }, [])

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
        return 0;
    });
    
    if (sortType.value === 'name') {
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
                    <input type="radio" for="name" name="sort" value="name"></input>

                    <label>Sort By Price</label>
                    <input type="radio" for="price" name="sort" value="price"></input>
                </div>
                <div className="products-page">
                    
                {
                    filteredProducts.sort().map((product, idx) => (
                        <ProductCard key={idx} product={product}/>
                    ))
                }
                </div>
            </>
        )
    }

    else {
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
                    <input 
                        type="radio"
                        for="name"
                        name="sort"
                        value="name"
                        checked={sortType === 'name'}
                        onChange={handleSortChange}
                        />

                    <label>Sort By Price</label>
                    <input type="radio"
                        for="price"
                        name="sort"
                        value="price"
                        checked={sortType === 'price'}
                        onChange={handleSortChange}
                        />
                </div>
                <div className="products-page">
                    
                {
                    filteredProducts.sort().map((product, idx) => (
                        <ProductCard className='product-card' key={idx} product={product}/>
                    ))
                }
                </div>
            </>
        )
    }
}