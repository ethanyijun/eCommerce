import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
  isProductList
}) => {
  return (
    pages > 1 && (
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
    )
  );
};

export default Paginate;
