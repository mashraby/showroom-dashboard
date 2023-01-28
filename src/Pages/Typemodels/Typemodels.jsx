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

  // comment

  const ModelCost = (confs) => {
    let modelCost = 0 ;

    // if()
    confs?.map(e => {
      return modelCost = modelCost + (e.cost*e.running_qty);
    })

    return modelCost;
  }

  const [model , setModel ] = useState()

  useEffect(() => {
    axios
      .get(`/model/${id}`)
      .then((res) => {

         console.log(res.data)
    
         setModel(res.data)

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
                <div className="conf-boxes">
                 <div className="head-conf-box">
                    <p>Name: {e.name}</p>
                    <p>Cost: <b>{accounting.formatNumber(e.cost,0," ")}</b> so'm</p>
                    <p>Count: {e.running_qty}</p>
                 </div>
                 <button>Edit conf</button>
                </div>
              );
            })
          }
        </div>
        {/* <div className='shelf'>
         <table>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Cost</th>
                  <th>Quantity</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Settings</th>
               </tr>
            </thead>
            <tbody>
               {model?.configurations?.map((model,index) => {
                  return(
                     <tr key={index}>
                        <td>{index+1}</td>
                        <td className='titleBook'>{model.cost ? accounting.formatNumber(model.cost,0," ") : "undefined"} so'm</td>
                        <td> <button>-</button> {model.running_qty} <button>+</button></td>
                        <td>{model.title ? model.title : "undefined"}</td>
                        <td>active</td>
                        <td>
                           <button 
                              data-id = {model.id}
                              // onClick={editBtnHandler}
                              className='editbtn'>Edit</button>
                           <button 
                              data-isbn = {model.id}
                              // onClick={deleteBtnHandler}
                              className='delbtn'>
                              Delete
                           </button>
                        </td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
         </div> */}

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
