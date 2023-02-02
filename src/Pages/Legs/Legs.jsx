import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import { toast } from "react-toastify";

export default function Legs() {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [legs, setlegs] = useState([]);
  const [legName, setLegName] = useState("");
  const [sendLegLoad, setSendLegLoad] = useState(false);

  const data = {
    headerInfos: {
      title: "Legs",
      btnTitle: "Add Leg",
    },
  };

  useEffect(() => {
    axios
      .get("/legs")
      .then((res) => setlegs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const sendLeg = (e) => {
    e.preventDefault();
    setSendLegLoad(true);

    axios
      .post("/leg", {
        name: legName,
      })
      .then((res) => {
        if(res.status===200) {
          toast.success("Added new leg")
        }
      })
      .finally(() => {
        setIsOpen(false);
        setSendLegLoad(false);
        axios.get("/legs")
          .then(res => setlegs(res.data))
      })
      .catch((err) => {
        if(err) {
          toast.error("Leg qo'shilmadi qayta urinib ko'ring")
        }
      })
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
              Leg ID
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
              Leg Name
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
          {legs?.map((item, index) => {
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
                  <span>{index + 1}</span>
                </div>
                <div className="product-cell category">
                  <span className="cell-label">Leg Name:</span>
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
        onSubmit={(e) => sendLeg(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add Leg</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a leg name</span>
            <input
              required={true}
              type="text"
              onChange={(e) => setLegName(e.target.value)}
              placeholder="leg name"
            />
          </div>
        </div>
        <button className="add_modal_submit_btn">
          {sendLegLoad ? "loading..." : "Add Leg"}
        </button>
      </form>
    </div>
  );
}
