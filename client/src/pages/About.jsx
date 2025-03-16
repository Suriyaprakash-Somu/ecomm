import React from "react";
import { FaShoppingCart, FaTruck, FaUsers, FaRegSmile } from "react-icons/fa";

const About = () => {
  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="display-4 mb-4">About MyShop</h1>
          <p className="lead mb-4">India's Trusted Marketplace Since 2015</p>
          <div className="d-flex justify-content-center">
            <div
              style={{
                height: "4px",
                width: "50px",
                backgroundColor: "#FF9933",
              }}
            ></div>
            <div
              style={{
                height: "4px",
                width: "50px",
                backgroundColor: "#FFFFFF",
              }}
            ></div>
            <div
              style={{
                height: "4px",
                width: "50px",
                backgroundColor: "#138808",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-6">
          <h2 className="mb-4">Our Story</h2>
          <p>
            Founded in 2015 in Bengaluru, MyShop began as a small startup
            with a vision to empower local artisans and businesses across India.
            What started with just 10 sellers from Karnataka has now grown into
            a nationwide marketplace with over 50,000 sellers from 28 states and
            8 union territories.
          </p>
          <p>
            Our journey reflects the spirit of India - diverse, resilient, and
            innovative. From handcrafted items from rural artisans to
            cutting-edge electronics from urban manufacturers, we bring
            authentic Indian products to your doorstep.
          </p>
        </div>
        <div className="col-md-6" style={{ backgroundColor: "#e0e0e0" }}></div>
      </div>

      <div className="row mb-5">
        <div className="col-12 text-center mb-4">
          <h2>Why Choose MyShop?</h2>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card h-100 border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="feature-icon mb-3">
                <FaShoppingCart size={40} color="#FF9933" />
              </div>
              <h5 className="card-title">50,000+ Sellers</h5>
              <p className="card-text">
                From Kashmir to Kanyakumari, explore products from all corners
                of India
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card h-100 border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="feature-icon mb-3">
                <FaRegSmile size={40} color="#FF9933" />
              </div>
              <h5 className="card-title">10M+ Happy Customers</h5>
              <p className="card-text">
                Trusted by customers across 700+ cities and towns
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card h-100 border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="feature-icon mb-3">
                <FaTruck size={40} color="#FF9933" />
              </div>
              <h5 className="card-title">Fast Delivery</h5>
              <p className="card-text">
                Same-day delivery in metros and 2-3 days across India
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card h-100 border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="feature-icon mb-3">
                <FaUsers size={40} color="#FF9933" />
              </div>
              <h5 className="card-title">Indian Customer Support</h5>
              <p className="card-text">
                24x7 support in Hindi, English, and 10 regional languages
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12 text-center mb-4">
          <h2>Our Mission</h2>
        </div>
        <div className="col-lg-8 mx-auto">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <p className="lead">
                "To showcase the best of Indian craftsmanship and innovation to
                the world while creating sustainable livelihoods for millions of
                Indian entrepreneurs, artisans, and small businesses."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Vocal for Local</h4>
              <p className="card-text">
                We've helped over 15,000 small businesses go digital during the
                pandemic, preserving traditional crafts and creating modern
                opportunities.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Quality Assurance</h4>
              <p className="card-text">
                Every product undergoes a 7-point quality check based on BIS
                standards before being listed on our platform.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Sustainability</h4>
              <p className="card-text">
                Our eco-friendly packaging uses recycled materials, and we've
                planted 50,000 trees across India through our "Each Order, One
                Tree" initiative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
