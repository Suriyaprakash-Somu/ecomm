import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCustomerCategories } from "../../../api/public/category";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const lastElementRef = useRef(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ["customerCategories"],
      queryFn: async ({ pageParam = 0 }) =>
        getCustomerCategories({ pageIndex: pageParam, pageSize: 10 }),
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
    return <div>Error loading categories</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Categories</h1>
      <div className="row">
        {data?.pages
          .flatMap((page) => page.pages)
          .map((category, index, array) => (
            <div
              key={category.category_id}
              className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3"
              ref={index === array.length - 1 ? lastElementRef : null}
            >
              <CategoryCard category={category} />
            </div>
          ))}
      </div>

      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default Categories;
