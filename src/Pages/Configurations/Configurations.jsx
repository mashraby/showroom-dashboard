import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";

export default function Configurations() {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [sendConfigurationLoad, setSendConfigurationLoad] = useState(false);
  const [ConfigurationName, setConfigurationName] = useState("");
  const [configurations, setConfigurations] = useState([]);
  const [types, setTypes] = useState([])
  const [models, setModels] = useState([])
  const [running_qty , setRunningQty ] = useState()
  const [selectType, setSelectType] = useState("684ba7e9-7c95-4173-bfcf-3738116c8242")
  const [selectModel, setSelectModel] = useState("")

  const [ cost , setCost ] = useState()
  const [ title , setTitle ] = useState()

  const data = {
    headerInfos: {
      title: "Configurations",
      btnTitle: "Add Configuration",
    },
  };

  const sendConfiguration = (e) => {
    e.preventDefault();
    setSendConfigurationLoad(true);

    axios
      .post("/configuration", {
        name: ConfigurationName,
        model: selectModel,
        cost,
        title,
        running_qty
      })
      .then((res) => {
        if (res && res.status === 200) {
          setIsOpen(!isOpen);
        }
      })
      .finally(() => setSendConfigurationLoad(false));
  };

  useEffect(() => {
    axios
      .get(`/typemodels/${selectType}`)
      .then((res) => {
        console.log(res)
        setModels(res.data)
      })
      .catch((err) => console.log(err))
      
  }, [selectType])

  useEffect(() => {

    axios
      .get("/types")
      .then((res) => {
        console.log(res)
        setTypes(res.data)
      })
      .catch((err) => console.log(err))

    axios
      .get("/configurations")
      .then((res) => {
        console.log(res);
        setConfigurations(res.data);
      })
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
              Configuration ID
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
              Configuration Name
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
          {configurations && configurations.map((item, index) => {
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
                  <span className="cell-label">Model Name:</span>
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
        onSubmit={(e) => sendConfiguration(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add Configuration</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a configuration name</span>
            <input
              required={true}
              type="text"
              onChange={(e) => setConfigurationName(e.target.value)}
              placeholder="configuration name"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a configuration Cost</span>
            <input
              required={true}
              type="number"
              onChange={(e) => setCost(e.target.value)}
              placeholder="configuration Cost"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a configuration Title</span>
            <input
              required={true}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="configuration Tile"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a configuration Quantity</span>
            <input
              required={true}
              type="number"
              onChange={(e) => setRunningQty(e.target.value)}
              placeholder="configuration Tile"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Choose a type</span>
            <select onChange={(e) => setSelectType(e.target.value)} name="" id="">
              <option value="none" disabled selected hidden>Choose ...</option>
              {types &&
                types.map((el) => {
                  return <option key={el.id} value={el.id}>{el.name}</option>;
                })}
            </select>
          </div>
          <div className="input-box">
            <span className="input-label">Choose a model</span>
            <select onChange={(e) => setSelectModel(e.target.value)} name="" id="">
              <option value="none" disabled selected hidden>Choose ...</option>
              {models &&
                models.map((el) => {
                  return <option key={el.id} value={el.id}>{el.name}</option>;
                })}
            </select>
          </div>
        </div>
        <button className="add_modal_submit_btn">
          {sendConfigurationLoad ? "loading..." : "Add Configuration"}
        </button>
      </form>
    </div>
  );
}
