import React, { useEffect, useState } from "react";

export default function App() {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products/");
      const data = await response.json();
      setProducts(data);
      setOriginalProducts(data); // Store original products
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  const handleRatingChange = (e) => {
    setMinRating(parseInt(e.target.value));
  };

  const applyFilter = () => {
    let filteredProducts = [...originalProducts]; // Use original products

    if (category !== "all") {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    filteredProducts = filteredProducts.filter(product => product.price <= priceRange);

    if (minRating > 0) {
      filteredProducts = filteredProducts.filter(product => product.rating.rate >= minRating);
    }

    setProducts(filteredProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilter();
  };

  return (
    <div className="product-filter">
      <h2>Filter Products</h2>
      <form onSubmit={handleSubmit}>
        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange}>
            <option value="all">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="price-range">Price Range:</label>
          <input type="range" id="price-range" min="0" max="1000" value={priceRange} onChange={handlePriceRangeChange} />
          <span id="price-range-value">${priceRange}</span>
        </div>
        <div className="filter-group">
          <label htmlFor="ratings">Minimum Ratings:</label>
          <select id="ratings" value={minRating} onChange={handleRatingChange}>
            <option value="0">Any Rating</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </div>
        <button type="submit">Apply Filters</button>
      </form>
      <div className="product-list">
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <img style={{ width: "100px" }} src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <p>${product.price}</p>
              <p>Rating: {product.rating.rate} stars</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
