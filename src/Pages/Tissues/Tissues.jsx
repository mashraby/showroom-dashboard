import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import accounting from "accounting";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner/Spinner";

export default function Tissues() {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [sendTissueLoad, setSendTissueLoad] = useState(false);
  const [getLoading, setGetLoading] = useState(true);
  const [tissueName, setTissueName] = useState("");
  const [tissueCost, setTissueCost] = useState("");
  const [tissuePrice1, setTissuePrice1] = useState("");
  const [tissuePrice2, setTissuePrice2] = useState("");
  const [tissues, setTissues] = useState([]);

  const data = {
    headerInfos: {
      title: "Tissues",
      btnTitle: "Add Tissue",
    },
  };

  const allInputs = document.querySelectorAll("input");

  const sendTissue = (e) => {
    e.preventDefault();
    setSendTissueLoad(true);

    axios
      .post("/tissue", {
        name: tissueName,
        cost: tissueCost,
        price1: tissuePrice1,
        price2: tissuePrice2,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Added new tissue");
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Tissue qo'shilmadi qayta urinib koring");
        }
      })
      .finally(() => {
        setSendTissueLoad(false);
        setIsOpen(false);
        axios.get("/tissue").then((res) => setTissues(res.data));
        allInputs.forEach((input) => {
          return (input.value = null);
        });
      });
  };

  useEffect(() => {
    axios
      .get("/tissue")
      .then((res) => setTissues(res.data))
      .finally(() => {
        setGetLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Header headerInfos={data} />
        <Actions />
        {getLoading ? (
          <Spinner />
        ) : (
          <div className="products-area-wrapper tableView">
            <div className="products-header">
              <div className="product-cell image">Tissue ID</div>
              <div className="product-cell category">Tissue Name</div>
              <div className="product-cell status-cell">Tissue Cost</div>
              <div className="product-cell sales">Tissue Price 1</div>
              <div className="product-cell stock">Tissue Price 2</div>
            </div>
            {tissues &&
              tissues.map((item, index) => {
                return (
                  <Link key={index + 1} to={`/tissue/${item.id}`}>
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
                        <span>{index + 1}</span>
                      </div>
                      <div className="product-cell category">
                        <span className="cell-label">Tissue Name:</span>
                        {item.name}
                      </div>

                      <div className="product-cell sales">
                        <span className="cell-label">Tissue Cost:</span>
                        {accounting.formatNumber(item.cost, 0, " ")}
                      </div>
                      <div className="product-cell stock">
                        <span className="cell-label">Tissue Price 1:</span>
                        {accounting.formatNumber(item.price1, 0, " ")}
                      </div>
                      <div className="product-cell price">
                        <span className="cell-label">Tissue Price 2:</span>
                        {accounting.formatNumber(item.price2, 0, " ")}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { display: "block" } : { display: "none" }}
        className="add_modal"
      ></div>
      <form
        onSubmit={(e) => sendTissue(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add Tissue</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a tissue name</span>
            <input
              required={true}
              type="text"
              onChange={(e) => setTissueName(e.target.value)}
              placeholder="tissue name"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a tissue cost</span>
            <input
              required={true}
              type="text"
              onChange={(e) => {
                e.target.value = accounting.formatNumber(
                  e.target.value,
                  0,
                  " "
                );
                setTissueCost(accounting.unformat(e.target.value));
              }}
              placeholder="tissue cost"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a tissue price 1</span>
            <input
              required={true}
              type="number"
              onChange={(e) => {
                accounting.formatNumber(e.target.value, 0, " ");
                setTissuePrice1(accounting.unformat(e.target.value));
              }}
              placeholder="tissue price 1"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a tissue price 2</span>
            <input
              required={true}
              type="number"
              onChange={(e) => {
                setTissuePrice2(accounting.unformat(e.target.value));
              }}
              placeholder="tissue price 2"
            />
          </div>
        </div>
        <button className="add_modal_submit_btn">
          {sendTissueLoad ? "loading..." : "Add Tissue"}
        </button>
      </form>
    </div>
  );
}
