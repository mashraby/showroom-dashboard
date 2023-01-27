import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import "./Typemodel.css"

export default function Typemodels() {
  const { id } = useParams();

  const { isOpen, setIsOpen } = useContext(OpenModal)

  // comment

  const [model, setModel] = useState();

  useEffect(() => {
    axios
      .get(`/model/${id}`)
      .then((res) => {
        console.log(res.data);
        setModel(res.data);
      })
      .catch((err) => console.log(err));
  }, []);



  const OpenEditModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <div className="type_model_list">
          <div className="type_model_card">
            <h1 className="type_model_heading"><span>Name:</span>{model?.name}</h1>
            <div className="type_model_prices">
              <p>
                <span>Price 1:</span>
                {model?.price1}
              </p>
              <p>
                <span>Price 2:</span> {model?.price2}
              </p>
              <p>
                <span>Price 3:</span> {model?.price3}
              </p>
            </div>
            <button onClick={() => OpenEditModal()} className="type_model_editbtn">
              Edit
            </button>
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
        <h1 className="add_modal_title">Edit</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Edit Name</span>
            <input
              defaultValue={model?.name}
              required={true}
              type="text"
              placeholder="Edit name"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Edit Price 1</span>
            <input  
              defaultValue={model?.price1}
              required={true}
              type="text"
              placeholder="Edit Price 1"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Edit Price 2</span>
            <input
              defaultValue={model?.price2}
              required={true}
              type="text"
              placeholder="Edit Price 2"
            />
          <div className="input-box">
            <span className="input-label">Edit Price 3</span>
            <input
              defaultValue={model?.price3}
              required={true}
              type="text"
              placeholder="Edit Price 3"
            />
          </div>
          </div>
        </div>
        <button className="add_modal_submit_btn">
            edit
        </button>
      </form>
    </div>
  );
}
