import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCustomerProducts } from "../../../api/public/product";
import ProductCard from "./ProductCard";

const Products = () => {
  const lastElementRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ["customerProducts"],
      queryFn: async ({ pageParam = 0 }) =>
        getCustomerProducts({ pageIndex: pageParam, pageSize: 10 }),
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage
          ? lastPage.totalPages - 1 > lastPage.pageIndex
            ? lastPage.pageIndex + 1
            : undefined
          : undefined;
      },
    });

  useEffect(() => {
    if (data?.pages.length === 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [data]);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Products</h1>
      <div className="row">
        {data?.pages
          .flatMap((page) => page.pages)
          .map((product, index, array) => (
            <div
              key={product.product_id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
              ref={index === array.length - 1 ? lastElementRef : null}
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>

      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default Products;
