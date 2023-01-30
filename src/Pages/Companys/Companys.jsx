import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Spinner from "../../Components/Spinner/Spinner";
import Toast from "../../Components/Toast/Toast";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";

export default function Companys() {
  const {
    isOpen,
    setIsOpen,
    isToastOpen,
    setIsToastOpen,
    isSpinner,
    setIsSpinner,
  } = useContext(OpenModal);

  const [companys, setCompanys] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyStatus, setCompanyStatus] = useState("");
  const [sendCompLoad, setSendCompLoad] = useState(false);
  const [resStatus, setResStatus] = useState(null);
  const [resMessage, setResMessage] = useState("");
  const access_token = localStorage.getItem("token");

  const data = {
    headerInfos: {
      title: "Companys",
      btnTitle: "Add Company",
    },
  };

  const sendCompany = (e) => {
    e.preventDefault();
    setSendCompLoad(true);
    setIsSpinner(true);

    axios
      .post("/company", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        name: companyName,
        status: companyStatus,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setSendCompLoad(false);
        setIsOpen(false)
        axios.get("company", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(res => setCompanys(res.data))
      });
  };

  useEffect(() => {
    axios
      .get("/company", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => setCompanys(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Header headerInfos={data} />
        <Actions />
        <div className="products-area-wrapper tableView">
          <div className="products-header">
            <div className="product-cell image">
              Company ID
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
              Company Name
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
              Company Status
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
          {companys &&
            companys.map((item, index) => {
              return (
                <div key={index + 1} className="products-row">
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
                    <span>{index + 1}</span>
                  </div>
                  <div className="product-cell category">
                    <span className="cell-label">Company Name:</span>
                    {item.name}
                  </div>
                  <div className="product-cell category">
                    <span className="cell-label">Company Status:</span>
                    {item.status}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { display: "block" } : { display: "none" }}
        className="add_modal"
      ></div>
      <form
        onSubmit={(e) => sendCompany(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add Company</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a company name</span>
            <input
              required={true}
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="company name"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Choose a company status</span>
            <select
              defaultValue="Chose a status"
              required={true}
              onChange={(e) => setCompanyStatus(e.target.value)}
            >
              <option value="Chose a status" disabled hidden>
                Choose a status
              </option>
              <option value="FACTORY">FACTORY</option>
              <option value="SHOWROOM">SHOWROOM</option>
              <option value="PARTNER_FACTORY">PARTNER FACTORY</option>
              <option value="PARTNER_SHOWROOM">PARTNER SHOWROOM</option>
            </select>
          </div>
        </div>
        <button className="add_modal_submit_btn">
          Add Company
          <Spinner />
        </button>
      </form>

      {/* <Toast res={{ status: resStatus, message: resMessage }} /> */}
    </div>
  );
}
