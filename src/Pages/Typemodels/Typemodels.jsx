import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

export default function Typemodels() {
  const { id } = useParams();

  // comment

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
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div>
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div>
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div>
            <p>Lorem, ipsum dolor.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
