import React, { useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Col, Row } from "reactstrap";
// import products from "../assets/data/products";
import "../styles/shop.scss";
import ProductsList from "../components/UI/ProductsList";
import useGetData from "../custom-hooks/useGetData";
import Loader from "../components/Loader/Loader";

const Shop = () => {
  const { data: products, loading } = useGetData("products");
  const [filterValue, setFilterValue] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
  };

  const filterProductsByCategory = () => {
    if (filterValue === "all") {
      return products;
    } else {
      return products.filter((product) => product.category === filterValue);
    }
  };

  const searchProducts = () => {
    if (searchTerm === "") {
      return filterProductsByCategory();
    } else {
      return filterProductsByCategory().filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const sortProducts = () => {
    let sortedProducts;
    if (sortOrder === "ascending") {
      sortedProducts = searchProducts().sort((a, b) => a.price - b.price);
    } else if (sortOrder === "descending") {
      sortedProducts = searchProducts().sort((a, b) => b.price - a.price);
    } else {
      sortedProducts = searchProducts();
    }
    return sortedProducts;
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products"></CommonSection>
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6" sm="6" xs="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option value="all">Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="table">Table</option>
                  <option value="desk">Desk</option>
                  <option value="chair">Chair</option>
                  <option value="bed">Bed</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" sm="6" xs="6" className="text-end">
              <div className="filter__widget">
                <select onChange={handleSortChange}>
                  <option>Sort By ⇅</option>
                  <option value="ascending">Ascending ↑</option>
                  <option value="descending">Descending ↓</option>
                </select>
              </div>
            </Col>

            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {loading ? (
              <Loader />
            ) : (sortProducts().length === 0 && searchTerm !== "") ||
              filterProductsByCategory().length === 0 ? (
              <h1 className="text-center fs-4">No products are found</h1>
            ) : (
              <ProductsList data={sortProducts()}></ProductsList>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
