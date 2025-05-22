import ProductSearch from '../components/ProductSearch.js'
import './SearchPage.css'
import {motion} from 'framer-motion'
import {useState} from 'react'

export default function SearchPage({searchProducts, searchQuery, setSearchQuery}) {

    return (
        <>
            
                <div className='search-page'>
                    <motion.div
                    initial={{ scaleX: 0, opacity: 0, x: -300 }}
                    animate={{ scaleX: 1, opacity: 1, x: 0}}
                    transition={{ duration: 0.3 }}
                    style={{
                    originX: 0.5,
                    }}
                    >
                    <h1>Search for a Product Below:</h1>
                    </motion.div>
                    <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                    originX: 0.5,
                    }}
                    >
                        <ProductSearch className='searchbar' searchProducts={searchProducts} setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
                    </motion.div>
                </div>
            
        </>
    )
}