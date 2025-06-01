import './PriceTrend.css'

export default function PriceTrend({priceHistory}) {
    
    const newPrice = Number(priceHistory[0].split('=')[1]).toFixed(2)

    //If price has been scraped multiple times:
    if (priceHistory.length > 1) {
        const oldPrice = Number(priceHistory[1].split('=')[1]).toFixed(2)


        //if price has increased:
        if (newPrice > oldPrice) {
            return (
                <>
                    <h3 className="price-increased" color='red'>
                        <img src="/priceChange.webp" style={{ color: 'yellow', height: '50px', rotate: '180deg'}} alt="logo"></img>
                        {'$' + newPrice}
                        <img src="/priceChange.webp" style={{ color: 'yellow', height: '50px', rotate: '180deg'}} alt="logo"></img>
                    </h3>
                    
                </>
            )
        }
        //if price has decreased:
        else if (newPrice < oldPrice) {
            return (
                <>  
                    <h3 className='price-decreased'>
                        <img src="/priceChange.webp" style={{ color: 'yellow', height: '50px'}} alt="logo"></img>
                        {'$' + newPrice}
                        <img src="/priceChange.webp" style={{ color: 'yellow', height: '50px'}} alt="logo"></img>
                    </h3>
                </>
            )
        }
    }
    else {
        return (
            <>
                <h3 className="price">{'$' + newPrice}</h3>
            </>
        )
    }
}