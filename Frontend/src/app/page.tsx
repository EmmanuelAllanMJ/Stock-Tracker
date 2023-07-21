import Table from '@/components/Table';
import Upload from '@/components/Upload';

export default function Home() {
  return (
<div className="min-h-screen bg-gray-100">
<div className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">Stock Tracker</a>
      </div>
  <div className="flex flex-col md:flex-row">
    <div className="w-full md:w-1/4 p-4">
      <Upload />
    </div>
    <div className="w-full md:w-3/4 p-4">
      <Table />
    </div>
  </div>
</div>


  )
}
