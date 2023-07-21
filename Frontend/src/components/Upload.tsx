"use client"
import { FC } from 'react'
import { Toaster, toast } from 'react-hot-toast'


const Upload: FC = () => {

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        // check whether file is selected or not
        if (!file) {
            toast.error('Please select a file!')
            return;
        }

        // check whether file is csv or not
        if (file.type !== 'text/csv') {
            toast.error('Please upload a csv file!')
            return;
        }
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
                // reload page after 2 sec
                setTimeout(() => {
                    window.location.reload();
                }
                    , 2000);
            })
            .catch(error => {
                toast.error('Something went wrong!')
                console.error(error);

            })
    }

    const deleteHandler = () => {
        fetch('http://127.0.0.1:8000/stocks', {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                toast.success('Successfully Deleted all data!')
                console.log(data);
                // reload page after 2 sec
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(error => {
                toast.error('Something went wrong!')
                console.error(error);
            })
    }

    return <div>
        <div><Toaster /></div>
        <div className="hero py-24 bg-base-200">
            <div className="card shadow-lg compact side bg-base-100">
                <div className="card-body">
                    <h2 className="card-title mb-5">Upload</h2>
                    <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
                        <input type="file" accept=".csv" className="file-input file-input-bordered w-full max-w-xs" />

                        <button className="btn btn-outline" type="submit">Upload</button>

                    </form>
                    <button className="btn btn-outline" onClick={deleteHandler}>Delete All</button>
                </div>
            </div>
        </div>
    </div>
}

export default Upload