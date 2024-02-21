import { Route, Routes } from 'react-router-dom'
import './App.css'
import Task from './pages/Task'
import TaskForm from './pages/TaskForm'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import { TaskContextProvider } from './context/taskContext'

function App() {

  return (
    <div className='bg-slate-900 h-screen'>
      <Navbar/>
      <div className='container mx-auto py-4 px-10'>
        <TaskContextProvider>
          <Routes>
            <Route path='/' element={<Task/>}/>
            <Route path='/new' element={<TaskForm/>}/>
            <Route path='/edit/:id' element={<TaskForm/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  )
}

export default App
