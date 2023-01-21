import React, { useContext, useEffect, useState } from "react";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import fetchFunction, { getFetch } from "../../Utils/fetchFunction";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { isOpen, setIsOpen } = useContext(OpenModal);

  useEffect(() => {
    fetch("http://localhost:9000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // console.log(users);



  console.log(fetchFunction("http://localhost:9000/roles"), "my func");

  const data = {
    headerInfos: {
      title: "Users",
      btnTitle: "Add User",
    },
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Header headerInfos={data} />
        <Actions />
        <div className="products-area-wrapper tableView">
          <div className="products-header">
            <div className="product-cell image">
              Items
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell category">
              Category
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell status-cell">
              Status
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell sales">
              Sales
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell stock">
              Stock
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
            <div className="product-cell price">
              Price
              <button className="sort-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="product"
              />
              <span>Ocean</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Furniture
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status active">Active</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>11
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>36
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$560
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8a2l0Y2hlbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Lou</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Kitchen
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status disabled">Disabled</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>6
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>46
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$710
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Yellow</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Decoration
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status active">Active</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>61
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>56
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$360
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmVkcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Dreamy</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Bedroom
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status disabled">Disabled</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>41
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>66
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$260
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Boheme</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Furniture
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status active">Active</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>32
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>40
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$350
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Sky</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Bathroom
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status disabled">Disabled</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>22
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>44
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$160
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Midnight</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Furniture
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status active">Active</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>23
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>45
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$340
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Boheme</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Furniture
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status active">Active</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>32
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>40
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$350
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1511389026070-a14ae610a1be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGludGVyaW9yfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Palm</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Decoration
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status active">Active</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>24
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>46
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$60
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Forest</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Living Room
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status active">Active</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>41
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>16
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$270
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fGludGVyaW9yfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Sand</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Living Room
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status disabled">Disabled</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>52
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>16
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$230
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODd8fGludGVyaW9yfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Autumn</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Decoration
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status active">Active</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>21
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>46
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$252
            </div>
          </div>
          <div className="products-row">
            <button className="cell-more-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <div className="product-cell image">
              <img
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="product"
              />
              <span>Boheme</span>
            </div>
            <div className="product-cell category">
              <span className="cell-label">Category:</span>Furniture
            </div>
            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              <span className="status active">Active</span>
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Sales:</span>32
            </div>
            <div className="product-cell stock">
              <span className="cell-label">Stock:</span>40
            </div>
            <div className="product-cell price">
              <span className="cell-label">Price:</span>$350
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { display: "block" } : { display: "none" }}
        className="add_modal"
      ></div>
      <form
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add User</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a username</span>
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a password</span>
            <input type="password" placeholder="password" />
          </div>
          <div className="input-box">
            <span className="input-label">Choose a status</span>
            <select name="" id="">
              <option value={true}>active</option>
              <option value={false}>not active</option>
            </select>
          </div>
          <div className="input-box">
            <span className="input-label">Choose a role</span>
            <select name="" id="">
              <option value={true}>active</option>
              <option value={false}>not active</option>
            </select>
          </div>
        </div>

        <button className="add_modal_submit_btn">Add User</button>
      </form>
    </div>
  );
}