"use client"
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {

  const onSubmitHandler = (e :any) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const formData = new FormData();
    formData.append('file', file);
    fetch('http://127.0.0.1:8000/stocks', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        toast.success('Successfully Uploaded to db!')
        console.log(data);
      })
      .catch(error => {
        toast.error('Something went wrong!')
        console.error(error);
      })
  }
  const testFetch = () => {
    fetch('http://127.0.0.1:8000')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toast.success('Successfully fetched from db!')
      })
      .catch(error => {
        toast.error('Something went wrong!')
        console.error(error);
      })
  }
  


  return (
    <>
      <div className="navbar bg-base-100 fixed">
        <a className="btn btn-ghost normal-case text-xl">Stock Tracker</a>
      </div>
      <div><Toaster/></div>
      <div className="hero min-h-screen bg-base-200">
        <div className="card shadow-lg compact side bg-base-100">
          <div className="card-body">
            <h2 className="card-title mb-5">Upload</h2>
            <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
              <input type="file"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  className="file-input file-input-bordered w-full max-w-xs" />
              
              <button className="btn btn-neutral" type="submit">Upload</button>

            </form>
              <button   className="btn btn-neutral" onClick={testFetch}>Test</button>
          </div>
        </div>
      </div>
    </>
  )
}
