function ProductCard ({ image, name, price, description}) {

    const handleBuyNow = () => {
        console.log (`You clicked Buy Now for ${name}`);
    };


    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-img" />
            <h2>{name}</h2>
            <p className="product-price">{price}</p>
            <p> {description} </p>
            <button className="buyNow-btn" onClick={handleBuyNow}>
                Buy Now
            </button>
        </div>
    );
}
export default ProductCard;