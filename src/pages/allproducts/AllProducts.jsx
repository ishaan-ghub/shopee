import React, { useState, useEffect } from "react";
import styles from "./Allproducts.module.css";
import { Rating } from "@mui/material";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log(data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  let handleAddToCart = (product) => {
    console.log(product);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Products</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
            <h2 className={styles.productTitle}>
              {product.title.slice(0, 30)}...
            </h2>
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productDescription}>
              {product.description.slice(0, 50)}...
            </p>
            <Rating name="half-rating-read" value={product.rating.rate} precision={0.5} readOnly />
            <p className={styles.ratings}>{product.rating.rate}</p>
            <button
              className={styles.addToCartButton}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
