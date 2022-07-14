import React, { ChangeEvent, useEffect, useState } from "react";
import TableRow from "./TableRow";
import { IInfo, IInfoNoId } from "../interfaces/Interfaces";
import PopUp from "./PopUpAdd";
import useFetch from "../hooks/useFetch";
// import { useNavigate } from "react-router-dom";

/**
 * @desc Table component that can display/render table data from database/server
 * @method handleDelete
 * @method handleDeleteAll
 * @method handleAdd
 * @method handleCheckbox
 */
export default function Table() {
  const { data, isPending, error } = useFetch(
    "http://localhost:4000/api/records/"
  );

  //table data list
  const [tableData, setTableData] = useState<IInfo[]>([]);
  useEffect(() => {
    setTableData(data);
  }, [data]);

  //states that handle delete selected rows
  const [deleteIDs, setDeleteIDs] = useState<string[]>([]);
  const [displayDeleteAll, setDisplayDeleteAll] = useState<boolean>(false);

  //states that handle edit record
  // const [editRecord, setEditRecord] = useState<IInfo>();

  /**
   * Delete a record base on its ID
   * @param id
   */
  const handleDelete = (id: string) => {
    // const deletedTableData = tableData.filter(
    //   (data) => data.id !== parseInt(id)
    // );

    const deletedTableData = tableData.filter((data) => data._id !== id);
    setTableData(deletedTableData);

    fetch(`http://localhost:4000/api/records/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not delete data.");
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  };

  /**
   * Delete All Selected Rows/Records
   */
  const handleDeleteAll = () => {
    const tableDataAfterDeleteAll = tableData.filter((row) => {
      if (!deleteIDs.includes(row._id)) {
        return row;
      }
      return null;
    });

    fetch(`http://localhost:4000/api/records/`, {
      method: "DELETE",
      body: JSON.stringify({ deleteIDs }),
      // body: JSON.stringify(addRecord),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not delete data.");
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });

    setTableData(tableDataAfterDeleteAll);

    setDeleteIDs([]);
  };

  /**
   * add new record to data list
   * @param newRecord : contain properties defined in IInfo
   */
  const handleAdd = (newRecord: IInfoNoId) => {
    // const ids = tableData.map((e) => e._id);
    // const newId = Math.max(...ids) + 1;
    // const addRecord = { id: newId, ...newRecord };
    // const tableDataAfterAdd = [...tableData, addRecord];

    // setTableData(tableDataAfterAdd);

    fetch(`http://localhost:4000/api/records/create`, {
      method: "POST",
      body: JSON.stringify(newRecord),
      // body: JSON.stringify(addRecord),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not create new record.");
        }
        return response.json();
      })
      .then((data) => {
        const addRecord = { _id: data._id, ...newRecord };
        const tableDataAfterAdd = [...tableData, addRecord];
        setTableData(tableDataAfterAdd);
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  };

  /**
   * base on checkbox's check status, add/remove record id to/from deleteIDs list
   * @param e target the checkbox change event
   */
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      //if checkbox is checked, add new selected id to deleteIDs list
      const newDeletIDs = [...deleteIDs, e.target.value];
      setDeleteIDs(newDeletIDs);
    } else {
      //if checkbox is unchecked, remove existing selected id from deleteIDs list
      const newDeletIDs = deleteIDs.filter(
        (element) => element !== e.target.value
      );
      setDeleteIDs(newDeletIDs);
    }
  };

  /**
   * Using useEffect to control the display of "Delete All" button
   */
  useEffect(() => {
    if (deleteIDs.length === 0) {
      setDisplayDeleteAll(false);
    } else {
      setDisplayDeleteAll(true);
    }
  }, [deleteIDs]);

  return (
    <div className="container">
      <h3 className="text-center py-5">FlavorWiki Test</h3>
      <div id="button-group">
        <button
          type="button"
          className="btn btn-success mx-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add
        </button>
        <PopUp handleAdd={handleAdd} />
        {displayDeleteAll && (
          <button
            type="button"
            className="btn btn-danger mx-2"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone No.</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {isPending && (
            <tr>
              <td></td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td></td>
              <td></td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={6} className="text-center text-danger">
                {error}
              </td>
            </tr>
          )}
          {tableData &&
            tableData.map((d) => (
              <TableRow
                key={d._id}
                info={d}
                handleDelete={handleDelete}
                handleCheckbox={handleCheckbox}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
