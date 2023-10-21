/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { MdClose, MdRefresh, MdSave } from "react-icons/md";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [datas, setData] = useState("");

  const onSubmit = async (data1) => {
    setData(data1);
    console.log(data1);
    await axios({
      method: "POST",
      url: `http://localhost:3500/additem/`,
      data: data1,
    });
    Swal.fire("Good job!", "Data item berhasil ditambahkan", "success");
  };

  const navigate = useNavigate();

  return (
    <div className="containers px-5">
      <h3>Form Add Items</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div classname="form-control" class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" {...register("name")} />
        </div>
        <div classname="form-control" class="mb-3">
          <label class="form-label">User Id</label>
          <input
            type="text"
            class="form-control"
            {...register("user_id", { valueAsNumber: true })}
          />
        </div>
        <div classname="form-control" class="mb-3">
          <label class="form-label">Category</label>
          <input type="text" class="form-control" {...register("category")} />
        </div>
        <div classname="form-control" class="mb-3">
          <label class="form-label">Price</label>
          <input
            type="text"
            class="form-control"
            {...register("price", { valueAsNumber: true })}
          />
        </div>
        <div classname="form-control" class="mb-3">
          <label class="form-label">Stock</label>
          <input
            type="text"
            class="form-control"
            {...register("stock", { valueAsNumber: true })}
          />
        </div>
        <div classname="form-control" class="mb-3">
          <label class="form-label">Image</label>
          <input type="text" class="form-control" {...register("image")} />
        </div>
        <button type="submit" class="btn btn-success" id="btnSubmit">
          <MdSave />
          Submit
        </button>
        <button
          onClick={() => navigate("/additem")}
          class="btn btn-primary"
          id="btnReset"
        >
          <MdRefresh />
          Reset
        </button>
        <button
          onClick={() => navigate("/")}
          class="btn btn-danger"
          id="btnBack"
        >
          <MdClose />
          Back
        </button>
      </form>
      <p>Data: {JSON.stringify(datas)}</p>
    </div>
  );
};

export default AddItem;
