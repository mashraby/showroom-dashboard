import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

export default function Typemodels() {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/typesmodel/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <h1 style={{ color: "white" }}>
          Hello World! <br />
          {id}
        </h1>
      </div>
    </div>
  );
}
