import React, { useContext } from "react";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";

export default function Legs() {
  const { isOpen, setIsOpen } = useContext(OpenModal);

  const data = {
    headerInfos: {
      title: "Legs",
      btnTitle: "Add Leg",
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
        </div>
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { display: "block" } : { display: "none" }}
        className="add_modal"
      ></div>
      <form
        // onSubmit={(e) => sendTissue(e)}
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
            //   onChange={(e) => setTissueName(e.target.value)}
              placeholder="leg name"
            />
          </div>
          {/* <div className="input-box">
            <span className="input-label">Enter a tissue cost</span>
            <input
              required={true}
              value={accounting.formatNumber(tissueCost, 0, " ")}
              type="text"
              onChange={(e) => setTissueCost(accounting.unformat(e.target.value))}
              placeholder="tissue cost"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a tissue price 1</span>
            <input
              required={true}
              value={accounting.formatNumber(tissuePrice1, 0, " ")}
              type="text"
              onChange={(e) => setTissuePrice1(accounting.unformat(e.target.value))}
              placeholder="tissue price 1"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a tissue price 2</span>
            <input
              required={true}
              value={accounting.formatNumber(tissuePrice2, 0, " ")}
              type="text"
              onChange={(e) => setTissuePrice2(accounting.unformat(e.target.value))}
              placeholder="tissue price 2"
            />
          </div> */}
        </div>
        <button className="add_modal_submit_btn">
            add
        </button>
      </form>
    </div>
  );
}
