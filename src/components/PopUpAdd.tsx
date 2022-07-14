import React, { ChangeEvent, useState } from "react";
import { IPopUpProps } from "../interfaces/Interfaces";

/**
 * This PopUp component is created with the help of Bootstrap Modal
 * https://getbootstrap.com/docs/5.2/components/modal/#how-it-works
 *
 * @param IPopUpProps
 * @method handleOnChange
 * @method handleSubmit
 * @method resetInput
 * @returns Modal for user to create new record
 */
export default function PopUp({ handleAdd }: IPopUpProps) {
  //states to store users' inputs
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  /**
   * depends on which input field is changing data
   * specific setState will be called to update the related state
   * @param e : ChangeEvent<HTMLInputElement>
   */
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value.toString());
        break;
      default:
        break;
    }
  };

  /**
   * When users click to save the new record to datalist
   */
  const handleSubmit = () => {
    const newRecord = { name, email, phone };
    handleAdd(newRecord);

    resetInput();
  };

  /**
   * Helper functions
   */
  //reset/clear all input fields
  const resetInput = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add New Record
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {/* BODY of Modal
          this is where HTML Form will get users' inputs */}
          <div className="modal-body">
            <form>
              {/* Full Name Field */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={(e) => handleOnChange(e)}
                  value={name}
                />
              </div>
              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => handleOnChange(e)}
                  value={email.toString()}
                />
              </div>
              {/* Phone Field */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  onChange={(e) => handleOnChange(e)}
                  value={phone.toString()}
                />
              </div>
            </form>
          </div>
          {/* Footer of Modal
          this area will have buttons to control what action users can perform in this Modal */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => resetInput()}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
              onClick={() => handleSubmit()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
