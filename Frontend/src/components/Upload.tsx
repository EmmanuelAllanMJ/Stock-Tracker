"use client"
import { FC } from 'react'
import { Toaster, toast } from 'react-hot-toast'

interface UploadProps {
  
}

const Upload: FC<UploadProps> = ({}) => {

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
  return <div>
    <div><Toaster/></div>
      <div className="hero py-24 bg-base-200">
        <div className="card shadow-lg compact side bg-base-100">
          <div className="card-body">
            <h2 className="card-title mb-5">Upload</h2>
            <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
              <input type="file"  accept=".csv"  className="file-input file-input-bordered w-full max-w-xs" />
              
              <button className="btn btn-outline" type="submit">Upload</button>

            </form>
              {/* <button   className="btn btn-outline" onClick={testFetch}>Test DB</button> */}
          </div>
        </div>
      </div>
  </div>
}

export default Upload