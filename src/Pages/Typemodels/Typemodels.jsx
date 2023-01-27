import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import accounting from "accounting";

export default function Typemodels() {
  const { id } = useParams();

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

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <h1 style={{color:"white",textAlign:'center',padding:25}}>{model?.name}</h1>
          {/* <p>Name: {model?.name}</p>
          <p>price 1: <b>{model?.price1}</b> %</p>
          <p>price 2: <b>{model?.price2}</b> %</p>
          <p>price 3: <b>{model?.price3}</b> %</p> */}
        <div className="edit-price-section">
          <div>
            <h3>Factory</h3>
            <p>Cost: <b>{accounting.formatNumber(ModelCost(model?.configurations ? model.configurations : []),0," ")}</b> So'm</p>
            <p>Percent: {model.price1} %</p>
            <p>Avarage: {5992000}</p>
          </div>
          <div>
            <h3>Showroom</h3>
            <p>Cost: <b>{588246000}</b></p>
            <p>percent: {model.price2} %</p>
            <p>Avarage: 547893000</p>
          </div>
          <div>
            <h3>Lorem, ipsum.</h3>
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div>
            <h3>Aksiya</h3>
            <p>Cost: <b>458752000</b></p>
          </div>
        </div>

        <h1 style={{color:'white',textAlign:'center',padding:25}}>Configuration</h1>
        <div className='shelf'>
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
         </div>
      </div>
    </div>
  );
}
