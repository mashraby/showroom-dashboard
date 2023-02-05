import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";

export default function Companys() {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [companys, setCompanys] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyStatus, setCompanyStatus] = useState("");
  const [sendCompLoad, setSendCompLoad] = useState(false);

  const data = {
    headerInfos: {
      title: "Companys",
      btnTitle: "Add Company",
    },
  };

  const sendCompany = (e) => {
    e.preventDefault();
    setSendCompLoad(true);
    axios
      .post("/company", {
        name: companyName,
        status: companyStatus,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Added new company");
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Company qo'shilmadi qayta urinib ko'ring");
        }
      })
      .finally(() => {
        setSendCompLoad(false);
        setIsOpen(false);
        axios.get("company").then((res) => setCompanys(res.data));
      });
  };

  useEffect(() => {
    axios
      .get("/company", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
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
            <div className="product-cell image">Company ID</div>
            <div className="product-cell category">Company Name</div>
            <div className="product-cell category">Company Status</div>
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
          {sendCompLoad ? "loading..." : "Add Company"}
        </button>
      </form>
    </div>
  );
}
