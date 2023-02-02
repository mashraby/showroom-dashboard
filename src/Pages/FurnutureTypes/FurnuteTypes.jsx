import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";

export default function Furnute_types() {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [types, setTypes] = useState([]);
  const [typeName, setTypeName] = useState("");
  const [sendTypeLoad, setSendTypeLoad] = useState(false);

  const sendType = (e) => {
    e.preventDefault();
    setSendTypeLoad(true);

    axios
      .post("/type", {
        name: typeName,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Added new furniture type");
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Furniture type qo'shilmadi qayta urinib ko'ring");
        }
      })
      .finally(() => {
        setSendTypeLoad(false);
        setIsOpen(false);
        axios.get("types").then((res) => setTypes(res.data));
      });
  };

  useEffect(() => {
    axios
      .get("/types")
      .then((res) => setTypes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const data = {
    headerInfos: {
      title: "Furniture Types",
      btnTitle: "Add Furniture Type",
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
            <div className="product-cell image">Type ID</div>
            <div className="product-cell category">Type Name</div>
          </div>
          {types &&
            types.map((item, index) => {
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
                    <span className="cell-label">Type Name:</span>
                    {item.name}
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
        onSubmit={(e) => sendType(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add Type</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a type name</span>
            <input
              required={true}
              type="text"
              onChange={(e) => setTypeName(e.target.value)}
              placeholder="type name"
            />
          </div>
        </div>
        <button className="add_modal_submit_btn">
          {sendTypeLoad ? "loading..." : "Add Type"}
        </button>
      </form>
    </div>
  );
}
