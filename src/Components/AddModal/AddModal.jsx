import React, { useContext } from "react";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import "./AddModal.css";

export default function AddModal({ modalInfos }) {
  const { isOpen, setIsOpen } = useContext(OpenModal);

  const addNewInfo = (e) => {
    e.preventDefault()
    // console.log(modalInfos.modalInputs);
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { display: "block" } : { display: "none" }}
        className="add_modal"
      ></div>
      <form
        onSubmit={(e) => addNewInfo(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">{modalInfos.modalTitle}</h1>
        <div className="input-groups">
          {modalInfos.modalInputs &&
            modalInfos.modalInputs.map((e, index) => {
              return (
                <div key={index + 1} className="input-box">
                  <span className="input-label">{e.title}</span>
                  <input onChange={(evt) => e.value = evt.target.value} type="text" />
                </div>
              );
            })}
        </div>

        <button className="add_modal_submit_btn">
          {modalInfos.modalTitle}
        </button>
      </form>
    </>
  );
}
