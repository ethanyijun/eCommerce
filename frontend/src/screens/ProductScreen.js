import React, { useState, useEffect }  from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Link,
    useParams
  } from "react-router-dom";

const ProductScreen = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({});
    useEffect(()=>{

        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data)
            return data;
        }
        fetchProduct()
    }, [])

    return (
        <div>
            <Link className="btn btn-light my-3" to={`/`}>
               GO BACK
           </Link>
           { product &&
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
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
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
                                        {product.countInStock>0?'In Stock':'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={product.countInStock===0}>Add To Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            }
        </div>
    )
}

export default ProductScreen