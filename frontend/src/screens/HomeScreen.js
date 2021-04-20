import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";
import ProductCarousel from "../components/ProductCarousel";
import { Helmet } from "react-helmet";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const pageSize = match.params.pageSize || 2;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, pageSize));
  }, [dispatch, keyword, pageNumber, pageSize]);

  return (
    <>
      <Meta></Meta>
      <Helmet>
        <title>Welcome To Proshop</title>
        <meta
          name="description"
          content="We sell the best products for cheap"
        />
        <meta
          name="kewords"
          content="electronics, buy electronics, cheap electronics"
        />
      </Helmet>
      {!keyword ? (
        <>
          <h1>Our top sellers</h1>
          <ProductCarousel />
        </>
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product, index) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            isAdmin={userInfo?.isAdmin}
            keyword={keyword ? keyword : ""}
            history={history}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
