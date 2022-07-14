import React from "react";
import { ITableRowProps } from "../interfaces/Interfaces";

import { Link } from "react-router-dom";

/**
 * @desc Table Row component that can display/render data of a single row in a table
 * @param ITableRowProps
 * @method phoneFormat
 */
export default function TableRow({
  info,
  handleDelete,

  handleCheckbox,
}: ITableRowProps) {
  /**
   * Helper Function
   * format the phone number for better display
   * @param input : phone number
   * @returns
   */
  const phoneFormat = (input: string) => {
    const formatInput = input.toString();
    if (formatInput.length === 10) {
      return formatInput.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3");
    } else {
      return formatInput.replace(/(\d{4})(\d{3})(\d)/, "$1-$2-$3");
    }
  };

  return (
    <tr>
      {/* <th scope="row">{info.id}</th> */}
      <td>
        <input
          className="form-check-input mt-0"
          type="checkbox"
          value={info._id}
          aria-label="Checkbox for selection delete"
          onChange={(e) => handleCheckbox(e)}
        />
      </td>
      <td>{info.name}</td>
      <td>{info.email}</td>
      <td>{phoneFormat(info.phone)}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(info._id)}
        >
          <i className="bi bi-trash3-fill"></i>
        </button>
      </td>
      <td>
        <Link to={`/${info._id}`}>
          <button
            type="button"
            className="btn btn-primary"
            // onClick={() => handleEdit(info.id.toString())}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </Link>
      </td>
    </tr>
  );
}
