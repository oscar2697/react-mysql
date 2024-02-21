import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="bg-slate-800 flex justify-between px-20 py-4 text-white">
      <Link to='/' className='text-white font-bold'>
        <h1>React MySQL</h1>
      </Link>
        

      <ul className="flex gap-x-1">
        <li>
          <Link to='/' className="bg-slate-400 px-2 py-1">Home</Link>
        </li>

        <li>
          <Link to='/new' className="bg-slate-500 px-2 py-1">Create New Task</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar