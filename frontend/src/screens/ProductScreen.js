import React, { useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProductDetails,
  createProductReview
} from "../actions/productActions";
import { Link, useParams } from "react-router-dom";
import "../index.css";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: productReviewCreateSuccess,
    error: productReviewCreateError
  } = productReviewCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showError, setShowError] = React.useState(false);

  const onChange = (event) => {
    setQty(event.target.value);
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
    if (product && product.countInStock < qty) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [dispatch, id, qty, product]);

  const ErrorInfo = () => <div>Insufficient stock</div>;

  const addToCartHandler = () => {
    dispatch(addToCart(id, Number(qty)));
    // history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to={`/`}>
        GO BACK
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col xs={12} md={6}>
              <Image src={product.image} fluid />
            </Col>
            <Col xs={12} md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xs={12} md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col xs={6}>Amount:</Col>
                        <Col xs={6}>
                          <input
                            className="amount-input"
                            value={qty}
                            onChange={onChange}
                          />
                          {showError ? <ErrorInfo /> : null}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={product.countInStock === 0 || showError}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reivews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
