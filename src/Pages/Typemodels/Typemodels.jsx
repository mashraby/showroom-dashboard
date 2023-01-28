import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import accounting from "accounting";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import "./Typemodel.css"


export default function Typemodels() {
  const { id } = useParams();

  const { isOpen, setIsOpen } = useContext(OpenModal)

  const [modalData, setModalData] = useState({})

  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    cost: null,
    running_qty: null
  })

  // comment

  const ModelCost = (confs) => {
    let modelCost = 0 ;

    // if()
    confs?.map(e => {
      return modelCost = modelCost + (e.cost*e.running_qty);
    })

    return modelCost;
  }

  const [model , setModel] = useState()

  useEffect(() => {
    axios
      .get(`/model/${id}`)
      .then((res) => {

         console.log(res.data)
    
         setModel(res.data)

      })
      .catch((err) => console.log(err));
  }, []);


  const updateConfig = (e) => {
    console.log(updateData);
    axios.put("/config", {
      id: updateData.id,
      name: updateData.name,
      cost: updateData.cost,
      running_qty: updateData.running_qty
    })
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  const OpenEditModal = (id) => {
    setIsOpen(!isOpen)
    setUpdateData({ ...updateData, id: id })
    const findConfigure = model?.configurations.find(e => e.id === id) 
    console.log(findConfigure);
    setModalData(findConfigure)
  }

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">

        <h2 style={{color:"white",textAlign:'center',padding:25}}>Model: {model?.name}</h2>
          {/* <p>Name: {model?.name}</p>
          <p>price 1: <b>{model?.price1}</b> %</p>
          <p>price 2: <b>{model?.price2}</b> %</p>
          <p>price 3: <b>{model?.price3}</b> %</p> */}
        <div className="edit-price-section">
          <div>
            <div>
              <h3>Factory</h3>
              <hr />
              <br />
              <p>Cost: <b>{accounting.formatNumber(ModelCost(model?.configurations ? model.configurations : []),0," ")}</b> So'm</p>
              <p>Percent: {model?.price1} %</p>
              <p>наценка: {accounting.formatNumber(54200,0," ")}</p>
              <br />
              <p>Avarage: <b>{accounting.formatNumber(452147000,0," ")}</b> so'm</p>
            </div>
            <button>Edit price</button>
          </div>
          <div>
            <div>
              <h3>Showroom</h3>
                <hr />
                <br />
                <p>Cost: <b>{588246000}</b></p>
                <p>percent: {model?.price2} %</p>
                <p>наценка: {accounting.formatNumber(54200,0," ")}</p>
                <br />
                <p>Avarage: <b>{accounting.formatNumber(452147000,0," ")}</b> so'm</p>
            </div>
            <button>Edit price</button>
          </div>
          <div>
            <div>
              <h3>Diller</h3>
              <hr />
              <br />
              <p>Cost: <b>{accounting.formatNumber(4523000,0," ")}</b></p>
              <p>percent:12 %</p>
              <p>наценка: {accounting.formatNumber(54200,0," ")}</p>
              <br />
              <p>Avarage: <b>{accounting.formatNumber(452147000,0," ")}</b> so'm</p>
            </div>
            <button>Edit price</button>
          </div>
          <div>
            <div className="head-price-box">
              <h3>Aksiya</h3>
              <hr />
              <br />
              <p>Cost: <b>458752000</b></p>
              <p>percent: {model?.price2} %</p>
              <p>наценка: {accounting.formatNumber(54200,0," ")}</p>
              <br />
              <p>Finally Price: <b>{accounting.formatNumber(452147000,0," ")}</b> so'm</p>
            </div>
            <button>Edit price</button>
          </div>
        </div>



        <h1 style={{color:'white',textAlign:'center',padding:25}}>Configuration</h1>

        <div className="edit-price-section">
          {
            model?.configurations?.map((e,i) => {
              return(
                <div key={i + 1} className="conf-boxes">
                 <div className="head-conf-box">
                    <p>Name: {e.name}</p>
                    <p>Cost: <b>{accounting.formatNumber(e.cost,0," ")}</b> so'm</p>
                    <p>Count: {e.running_qty}</p>
                 </div>
                 <button id={e.id} onClick={(e) => OpenEditModal(e.target.id)}>Edit conf</button>
                </div>
              );
            })
          }
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
        <h1 className="add_modal_title">Update {modalData?.name}</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Edit Name</span>
            <input
              onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
              defaultValue={modalData?.name}
              required={true}
              type="text"
              placeholder="Edit name"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Edit Cost</span>
            <input  
              onChange={(e) => setUpdateData({ ...updateData, cost: e.target.value })}
              defaultValue={model?.cost}
              required={true}
              type="text"
              placeholder="Edit cost"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Edit Count</span>
            <input
              onChange={(e) => setUpdateData({ ...updateData, running_qty: e.target.value })}
              defaultValue={modalData?.running_qty}
              required={true}
              type="text"
              placeholder="Edit count"
            />
          
          </div>
        </div>
        <button type="button" onClick={(e) => updateConfig(e)} className="add_modal_submit_btn">
            Update
        </button>
      </form>
    </div>
  );
}
