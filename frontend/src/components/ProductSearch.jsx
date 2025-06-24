import './ProductSearch.css'

export default function ProductSearch({searchProducts, searchQuery, setSearchQuery}) {

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
        console.log(searchQuery)

    }

    const handleSubmit =(e) => {
        if (e.key === 'Enter')
       searchProducts()
    }
    return (
        <>
            <input className="searchbar" type="search" value={searchQuery} onChange={handleChange} onKeyDown = {handleSubmit} placeholder="Ex. Headphones, Laptops"></input>
        </>
    )
}