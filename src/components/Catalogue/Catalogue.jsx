/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect, useState } from "react";
import useGetAllProducts from "../../hooks/useGetAllProducts";
import useGetCategories from "../../hooks/useGetCategories";
import useGetByCategory from "../../hooks/useGetByCategory";
import styles from "./Catalogue.module.css";
import Navbar from "./../Navbar/Navbar";
import ProductCard from "./../ProductCard/ProductCard";

const Catalogue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedFor, setSearchedFor] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const getAllCategories = useGetCategories();

  const getByCategory = useGetByCategory();

  const [productsDatabase, setProductsDatabase] = useState([]);
  const getAllProducts = useGetAllProducts();

  useEffect(() => {
    getAllProducts().then((data) => {
      setProductsDatabase(data);
      setDisplayedProducts(data);
    });
    getAllCategories().then((response) => {
      let temp = response.data;
      temp = temp.map((category, index) => (temp[index] = category[0].toUpperCase() + category.slice(1)));
      setCategories(temp);
    });
  }, []);

  useEffect(() => {
    displayedProducts.length == 0 ? (document.body.style.backgroundColor = "whitesmoke") : null;
  }, [displayedProducts]);

  const handleSearch = () => {
    setSearchedFor(searchQuery);
    setSelectedCategory("");
    let temp = productsDatabase.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    temp ? setDisplayedProducts(temp) : setDisplayedProducts(null);
    if (!temp.length) document.body.style.backgroundColor = "whitesmoke";
  };

  const handleCategoriesReset = () => {
    setSelectedCategory("");
    setSearchedFor("");
    setDisplayedProducts(productsDatabase);
  };

  const handleGetByCategory = (category) => {
    setSelectedCategory(category);
    setSearchedFor("");
    getByCategory(category[0].toLowerCase() + category.slice(1)).then((response) => {
      setDisplayedProducts(response.data);
    });
  };

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchProducts={handleSearch} />
      <div className={styles.divContainer}>
        <div className={styles.catalogueHeaderContainer}>
          <div className={styles.catalogueTitle}>Our Products</div>
          {searchedFor ? <div>Results for: {searchedFor}</div> : null}
          {selectedCategory ? <div>Category: {selectedCategory}</div> : null}
        </div>

        <div className={styles.catalogueContainer}>
          <div className={styles.categoriesContainer}>
            <span className={styles.categoriesTitle}>Categories</span>
            <span className={styles.categoriesReset} onClick={handleCategoriesReset}>
              Reset
            </span>
            <div className={styles.categoriesContent}>
              {categories.map((category, index) => (
                <div key={index}>
                  <label className={styles.category} onClick={() => handleGetByCategory(category)}>
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.productList}>
            {displayedProducts && displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <ProductCard className={styles.productCard} key={product.id} product={product} />
              ))
            ) : (
              <div>No products found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalogue;
