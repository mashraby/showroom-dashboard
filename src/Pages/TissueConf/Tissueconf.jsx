import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";




const TissueConf = () => {

   const { id } =  useParams();


   const [tissue , setTissue ] = useState()




   useEffect(() => {
      axios.get(`tissue/${id}`)
         .then(data => {
            setTissue(data.data)
         })
         .catch(err => {
            console.log(err)
         })
   },[])


   const data = {
      headerInfos: {
        title: "Tissues Configuration",
        btnTitle: "Add Config",
      },
   };

    
   return(
      <div className="app-container">
         <Navbar/>
         <div className="app-content">
            <Header headerInfos={data} />
            <Actions/>
            <h3 style={{color:'white'}}>{tissue?.name}</h3>
            
            

         </div>
      </div>
   );
}

export default TissueConf;