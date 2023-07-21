"use client"
import React, { useState } from "react";

export default function Home() {
  const [error, setError] = useState({status: false, message: ""});

  const onSubmitHandler = (e :any) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const formData = new FormData();
    formData.append('file', file);
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        
      })
      .catch(error => {
        setError({status:true, message: "Something went wrong!"})
        console.error(error);
      })
  }
  return (
    <>
      <div className="navbar bg-base-100 fixed">
        <a className="btn btn-ghost normal-case text-xl">Stock Tracker</a>
      </div>
      {error.status && <div className="alert alert-error">
        <div className="flex-1">
          <label>{error.message}</label>
        </div>
      </div>}
      <div className="hero min-h-screen bg-base-200">
        <div className="card shadow-lg compact side bg-base-100">
          <div className="card-body">
            <h2 className="card-title mb-5">Upload</h2>
            <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
              <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
              <button className="btn btn-neutral">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
