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

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
  isProductList,
  history
}) => {
  const handleSelect = (e) => {
    const redirectTo =
      isProductList && isAdmin
        ? `/admin/productlist/page/1/pagesize/${Number(e)}`
        : keyword
        ? `/search/${keyword}/page/1/pagesize/${Number(e)}`
        : `/page/1/pagesize/${Number(e)}`;
    history.push(redirectTo);
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
                      ? `/admin/productlist/page/${number + 1}`
                      : keyword
                      ? `/search/${keyword}/page/${number + 1}`
                      : `/page/${number + 1}`
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
        <Col md={2}>
          <DropdownButton
            alignRight
            title="Select Page Size"
            id="dropdown-menu-align-right"
            onSelect={handleSelect}
            size="md"
            className="my-3"
          >
            <Dropdown.Item eventKey="2">2</Dropdown.Item>
            <Dropdown.Item eventKey="4">4</Dropdown.Item>
            <Dropdown.Item eventKey="8">8</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    </Container>
  );
};

export default Paginate;
