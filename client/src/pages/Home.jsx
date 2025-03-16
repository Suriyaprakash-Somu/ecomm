import React from "react";
import { Link } from "react-router";
import {
  FaArrowRight,
  FaShippingFast,
  FaLock,
  FaHeadset,
  FaTags,
} from "react-icons/fa";
import Products from "../components/Public/Products/Products";
import Categories from "../components/Public/Categories/Categories";

const Home = () => {
  // Hero slider images
  const heroSlides = [
    {
      id: 1,
      imageUrl: "/placeholder_1.svg",
      title: "New Arrivals For Summer",
      subtitle: "Up to 30% off on selected items",
      buttonText: "Shop Now",
      buttonLink: "/products",
    },
    {
      id: 2,
      imageUrl: "/placeholder_2.svg",
      title: "Exclusive Collection",
      subtitle: "Discover unique products",
      buttonText: "Explore",
      buttonLink: "/categories",
    },
  ];

  const features = [
    {
      icon: <FaShippingFast />,
      title: "Free Shipping",
      text: "On all orders over ₹1000",
    },
    { icon: <FaLock />, title: "Secure Payment", text: "100% secure payment" },
    {
      icon: <FaTags />,
      title: "Special Discounts",
      text: "Save up to 50% on sales",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      text: "Dedicated support team",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div
        id="heroCarousel"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner rounded-4 overflow-hidden shadow">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={slide.imageUrl}
                className="d-block w-100"
                alt={slide.title}
                width={1200}
                height={500}
              />
              <div className="carousel-caption d-none d-md-block text-start p-4 rounded bg-dark bg-opacity-50">
                <h1 className="display-4 fw-bold">{slide.title}</h1>
                <p className="lead">{slide.subtitle}</p>
                <Link to={slide.buttonLink} className="btn btn-primary btn-lg">
                  {slide.buttonText} <FaArrowRight className="ms-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Features Section */}
      <div className="container mb-5">
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div
                    className="text-primary mb-3"
                    style={{ fontSize: "2rem" }}
                  >
                    {feature.icon}
                  </div>
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Featured Categories</h2>
          <Link to="/categories" className="btn btn-outline-primary">
            View All <FaArrowRight className="ms-1" />
          </Link>
        </div>
        <Categories page="home" />
      </div>

      {/* Featured Products Section */}
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Featured Products</h2>
          <Link to="/products" className="btn btn-outline-primary">
            View All <FaArrowRight className="ms-1" />
          </Link>
        </div>
        <Products page="home" />
      </div>

      {/* Newsletter Subscription */}
      <div className="container mb-5">
        <div className="card bg-primary text-white p-4">
          <div className="card-body text-center">
            <h2 className="card-title mb-3">Subscribe to Our Newsletter</h2>
            <p className="card-text mb-4">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="row g-3 justify-content-center">
              <div className="col-auto">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-light btn-lg">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
