import './ProductCard.css'

export default function ProductCard({product}) {
    return (
        <div className='product-card'>
            <input type="checkbox"></input>
            <img className='image' src={product.imgSrc}></img>
            <p className="title">{product.title}</p>
            <h3 className="price">{product.price}</h3>
            <h4>SKU: {product.SKU}</h4>
        </div>
    )
}