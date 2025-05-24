import './PriceTrend.css'

export default function PriceTrend({oldPrice, newPrice}) {


    if (Number(newPrice.slice(1)) > Number(oldPrice.slice(1))) {
        return (
            <>
                <h3 className="price-increased" color='red'>
                    <img src="/priceChange.webp" style={{ color: 'yellow', height: '50px', rotate: '180deg'}} alt="logo"></img>
                    {newPrice}
                    <img src="/priceChange.webp" style={{ color: 'yellow', height: '50px', rotate: '180deg'}} alt="logo"></img>
                </h3>
                
            </>
        )
    }
    else if (Number(newPrice.slice(1)) < Number(oldPrice.slice(1))) {
        return (
            <>  
                <h3 className='price-decreased'>
                    <img src="/priceChange.webp" style={{ color: 'yellow', height: '50px'}} alt="logo"></img>
                    {newPrice}
                    <img src="/priceChange.webp" style={{ color: 'yellow', height: '50px'}} alt="logo"></img>
                </h3>
            </>
        )
    }
    else {
        return (
            <>
                <h3 className="price">{newPrice}</h3>
            </>
        )
    }
}