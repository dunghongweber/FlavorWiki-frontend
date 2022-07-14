import React, { ChangeEvent, FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

/**
 * Edit Row component serves as a page for users to edit the selected record
 *
 * @method handleOnChange
 * @method handleSubmit
 * @method handleCancel
 * @method resetInput
 */
export default function EditRow() {
  const { id } = useParams();
  const navigate = useNavigate();

  //getting data with url and id
  const { singleData, isPending, error } = useFetch(
    "https://dh-interviewbe.herokuapp.com/api/records/" + id
  );

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
        setEmail(e.target.value.toString());
        break;
      case "phone":
        setPhone(e.target.value.toString());
        break;
      default:
        break;
    }
  };

  /**
   * When users want to save change to data list
   * @param e : form submit event
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const editRecord = {
      id: id,
      name: name || singleData.name,
      email: email || singleData.email,
      phone: phone || singleData.phone,
    };

    fetch(`https://dh-interviewbe.herokuapp.com/api/records/${id}`, {
      method: "PATCH",
      body: JSON.stringify(editRecord),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not update record.");
        }
        return response.json();
      })
      .then(() => {
        navigate("/");
        resetInput();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  /**
   * Helper functions
   */
  //take users back to Table List
  const handleCancel = () => {
    navigate("/");
  };
  //reset/clear all input fields
  const resetInput = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="edit-row container my-5 p-3 border border-dark rounded shadow-lg">
      <h1 className="text-center">Edit Record</h1>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
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
            value={name || singleData.name}
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
            value={email || singleData.email}
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
            value={phone || singleData.phone}
          />
        </div>

        <button className="btn btn-danger" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mx-3">
          Submit
        </button>
      </form>
    </div>
  );
}
