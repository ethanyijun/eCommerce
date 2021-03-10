import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postcode, country }));
    history.push("/payment");
  };
  useEffect(() => {
    if (shippingAddress && shippingAddress.address) {
      setAddress(shippingAddress.address);
    }
    if (shippingAddress && shippingAddress.city) {
      setCity(shippingAddress.city);
    }
    if (shippingAddress && shippingAddress.postcode) {
      setPostcode(shippingAddress.postcode);
    }
    if (shippingAddress && shippingAddress.country) {
      setCountry(shippingAddress.country);
    }
  }, [shippingAddress]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
        </Form.Group>

        <Form.Group controlId="postcode">
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type="text"
            value={postcode}
            required
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter postcode"
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
