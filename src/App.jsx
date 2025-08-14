import ProductCard from "./components/ProductCard"
function App() {
  const products= [
    {
      image: '/shirt.jpg',
      name: "Cool Shirt",
      price: "499.00",
      description : "A shirt for everyday wear."
    },
    {
      image: "/shoes.jpg",
      name: "Running Shoes",
      price: "₱2,199",
      description: "Comfortable shoes for your daily run."
    },
    {
      image: "/bag.jpg",
      name: "Backpack",
      price: "₱899",
      description: "Spacious backpack for travel and school."
    },
    {
      image: "/watch.jpg",
      name: "Smart Watch",
      price: "₱1,999",
      description: "Track your fitness and stay connected."
    },
    {
      image: "/cap.jpg",
      name: "Baseball Cap",
      price: "₱299",
      description: "Classic cap to match your outfit."
    },
    {
      image: "/hoodie.jpg",
      name: "Hoodie",
      price: "₱799",
      description: "Stay warm and stylish."
    }

  ]
 return(
  <>
    <h1>Seska's Store</h1>
    <div className="product-container">
      {products.map((item, index) => (
        <ProductCard
          key = {index}
          image = {item.image}
          name = {item.name}
          price = {item.price}
          description = {item.description}
        />
      ))}
    </div>
  </>
 );
}


export default App;