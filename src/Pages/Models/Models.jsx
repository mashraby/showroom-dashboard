import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Spinner from "../../Components/Spinner/Spinner";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";

export default function Models() {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [sendModelLoad, setSendModelLoad] = useState(false);
  const [getLoading, setGetLoading] = useState(true);
  const [modelName, setModelName] = useState("");
  const [models, setModels] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectType, setSelectType] = useState("");

  const data = {
    headerInfos: {
      title: "Models",
      btnTitle: "Add Model",
    },
  };

  const sendModel = (e) => {
    e.preventDefault();
    setSendModelLoad(true);

    axios
      .post("/model", {
        name: modelName,
        type: selectType,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Added new model");
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Model qo'shilmadi qayta urinib ko'ring");
        }
      })
      .finally(() => {
        setSendModelLoad(false);
        setIsOpen(false);
        axios.get("/models").then((res) => setModels(res.data));
      });
  };

  useEffect(() => {
    axios
      .get("/types")
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("/models")
      .then((res) => {
        setModels(res.data);
      })
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
              <div className="product-cell image">Model ID</div>
              <div className="product-cell category">Model Name</div>
            </div>
            {models &&
              models.map((item, index) => {
                return (
                  <Link
                    to={`/typemodels/${item.id}`}
                    id={item.id}
                    key={index + 1}
                    className="products-row"
                  >
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
                      <span className="cell-label">Model Name:</span>
                      {item.name}
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
        onSubmit={(e) => sendModel(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add Model</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a model name</span>
            <input
              required={true}
              type="text"
              onChange={(e) => setModelName(e.target.value)}
              placeholder="model name"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Choose a type</span>
            <select
              defaultValue="Choose ..."
              onChange={(e) => setSelectType(e.target.value)}
              name=""
              id=""
            >
              <option value="Choose ..." disabled hidden>
                Choose ...
              </option>
              {types &&
                types.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <button className="add_modal_submit_btn">
          {sendModelLoad ? "loading..." : "Add Model"}
        </button>
      </form>
    </div>
  );
}
