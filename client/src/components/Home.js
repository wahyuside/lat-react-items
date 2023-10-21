/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  MdDeleteOutline,
  MdOutlineModeEdit,
  MdLibraryAdd,
  MdRemoveRedEye,
} from "react-icons/md";

const Home = () => {
  // const buttonHandler = () => {
  //     console.log("Button handler")
  //     Swal.fire(
  //         "Good Job!",
  //         "This is button handler",
  //         "success"
  //     )
  // }
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const getItems = () => {
    axios({
      method: "GET",
      url: "http://localhost:3500/items",
    })
      .then((result) => {
        setItems(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios({
            method: "DELETE",
            url: `http://localhost:3500/deleteitem/${id}`,
          });
          getItems();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  // getItems();

  return (
    <div className="container">
      <h3>Home Page Items</h3>
      <button
        onClick={() => navigate("/additem")}
        className="btn btn-sm btn-success"
      >
        <MdLibraryAdd />
        New Data
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>User Id</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const { id, name, user_id, category, price, stock, image } = item;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{user_id}</td>
                <td>{category}</td>
                <td>Rp. {price}</td>
                <td>{stock} pcs</td>
                <td>{image}</td>
                <td>
                  <button
                    onClick={() => deleteHandler(id)}
                    className="btn btn-sm btn-danger"
                  >
                    <MdDeleteOutline className="me-1" />
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/updateitem/${id}`)}
                    className="btn btn-sm btn-primary"
                  >
                    <MdOutlineModeEdit className="me-1" />
                    Update
                  </button>
                  <button className="btn btn-sm btn-info">
                    <MdRemoveRedEye className="me-1" />
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
