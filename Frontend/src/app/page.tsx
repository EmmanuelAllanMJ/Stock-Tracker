import Table from '@/components/Table';
import Upload from '@/components/Upload';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <div className="navbar bg-base-100 fixed">
        <a className="btn btn-ghost normal-case text-xl">Stock Tracker</a>
      </div>
      <Upload/>
      <Table/>
    </div>
  )
}
