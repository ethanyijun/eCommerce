import React from "react";
import {
  Pagination,
  DropdownButton,
  Dropdown,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
  isProductList,
  history
}) => {
  const productList = useSelector((state) => state.productList);
  const { pagesize } = productList;
  const handleSelect = (e) => {
    const redirectTo =
      isProductList && isAdmin
        ? `/admin/productlist/page/1/pagesize/${Number(e)}`
        : keyword
        ? `/search/${keyword}/page/1/pagesize/${Number(e)}`
        : `/page/1/pagesize/${Number(e)}`;
    history.push(redirectTo);
  };
  const selected = {
    color: "white",
    backgroundColor: "black"
  };

  return (
    <Container>
      <Row>
        {pages > 1 && (
          <Col md={10}>
            <Pagination>
              {[...Array(pages).keys()].map((number) => (
                <LinkContainer
                  key={number + 1}
                  to={
                    isProductList && isAdmin
                      ? `/admin/productlist/page/${
                          number + 1
                        }/pagesize/${pagesize}`
                      : keyword
                      ? `/search/${keyword}/page/${
                          number + 1
                        }/pagesize/${pagesize}`
                      : `/page/${number + 1}/pagesize/${pagesize}`
                  }
                >
                  <Pagination.Item active={number + 1 === page}>
                    {number + 1}
                  </Pagination.Item>
                </LinkContainer>
              ))}
            </Pagination>
          </Col>
        )}
        {productList?.products.length * productList?.pages > 2 && (
          <Col md={2}>
            <DropdownButton
              alignRight
              title="Select Page Size"
              id="dropdown-menu-align-right"
              onSelect={handleSelect}
              size="md"
              className="my-3"
            >
              <Dropdown.Item
                style={pagesize === 2 ? selected : {}}
                eventKey="2"
              >
                2
              </Dropdown.Item>
              <Dropdown.Item
                style={pagesize === 4 ? selected : {}}
                eventKey="4"
              >
                4
              </Dropdown.Item>
              <Dropdown.Item
                style={pagesize === 8 ? selected : {}}
                eventKey="8"
              >
                8
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Paginate;
