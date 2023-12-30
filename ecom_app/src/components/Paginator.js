import React from 'react'
/* REACT BOOTSTRAP */
import { Pagination } from "react-bootstrap";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

function Paginator({ page, pages, keyword = "", isAdmin = false }) {
  /* isAdmin IS SET TO FALSE BY DEFAULT, ONLY IN ADMIN ProductList PAGE IS WILL BE SET TO TRUE */

  // Check if keyword is a string before using split
  if (typeof keyword === 'string') {
    keyword = keyword.split("?keyword=")[1]?.split("&")[0] || '';
  } else {
    keyword = '';
  }


  return (
    pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                ? {
                    pathname: '/',
                    search: `?keyword=${encodeURIComponent(keyword)}&page=${x + 1}`,
                  }
                : {
                    pathname: '/admin/productlist/',
                    search: `?keyword=${encodeURIComponent(keyword)}&page=${x + 1}`,
                  }
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )
  )
}

export default Paginator
