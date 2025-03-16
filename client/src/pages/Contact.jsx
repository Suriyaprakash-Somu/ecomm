import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="display-4 mb-4">Contact Us</h1>
          <p className="lead mb-4">We'd Love to Hear From You</p>
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

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="mb-4">Get in Touch</h2>

              <div className="d-flex mb-4">
                <div className="me-3">
                  <FaMapMarkerAlt size={24} color="#FF9933" />
                </div>
                <div>
                  <h5>Visit Us</h5>
                  <p className="mb-0">
                    MyShop Headquarters
                    <br />
                    12th Floor, Prestige Tech Park
                    <br />
                    Outer Ring Road, Bengaluru - 560103
                    <br />
                    Karnataka, India
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3">
                  <FaPhoneAlt size={24} color="#FF9933" />
                </div>
                <div>
                  <h5>Call Us</h5>
                  <p className="mb-0">
                    Customer Support: 1800-123-4567 (Toll Free)
                    <br />
                    Seller Support: 1800-987-6543 (Toll Free)
                    <br />
                    International: +91-80-12345678
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3">
                  <FaEnvelope size={24} color="#FF9933" />
                </div>
                <div>
                  <h5>Email Us</h5>
                  <p className="mb-0">
                    Customer Support: support@MyShop.in
                    <br />
                    Seller Onboarding: sellers@MyShop.in
                    <br />
                    Media Inquiries: media@MyShop.in
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="me-3">
                  <FaWhatsapp size={24} color="#FF9933" />
                </div>
                <div>
                  <h5>WhatsApp</h5>
                  <p className="mb-0">
                    Send a message: +91 98765 43210
                    <br />
                    Available 9 AM - 9 PM IST, all days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="mb-4">Send a Message</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <select className="form-select" id="subject">
                    <option selected>Select a topic</option>
                    <option value="order">Order Related</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="seller">Become a Seller</option>
                    <option value="feedback">General Feedback</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    placeholder="Please provide details about your inquiry"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary px-4 py-2">
                  Submit Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8294970933604!2d77.69356961466624!3d12.920428219435723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae135aeb7f340f%3A0xc9c6dfb48a7eeadd!2sPrestige%20Tech%20Park!5e0!3m2!1sen!2sin!4v1616138301708!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="MyShop Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
