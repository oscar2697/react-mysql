import { useContext, useState } from "react";
import { 
    createTaskRequest, 
    deleteTaskRequest, 
    getTaskRequest, 
    getTasksRequest, 
    toggleTaskRequest, 
    updateTaskRequest 
} from "../api/task.api";
import { TaskContext } from "./Context";

export const useTasks = () => {
    const context = useContext(TaskContext)

    if(context === undefined){
        throw new Error('useTasks must be used whitin a TaskContextProvider')
    }
    return context
}

export const TaskContextProvider = ({children}) => {
    const [tasks, setTasks] = useState([])

    async function loadTasks() {
        const response = await getTasksRequest()
        setTasks(response.data)
    }

    const deleteTask = async (id) => {
        try {
            const response = await deleteTaskRequest(id)
            setTasks(tasks.filter((task) => task.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task) => {
        try{
            await createTaskRequest(task)
            //setTasks([...tasks, response.data])
        }catch(error){
            console.error(error)
        }
    }

    const getTask = async (id) => {
        try {
            const response = await getTaskRequest(id)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const updateTask = async(id, newFields) => {
        try {
            const response = await updateTaskRequest(id, newFields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const taskDoneToggle= async (id) => {
        try {
            const taskFound = tasks.find((task) => task.id === id)
            await toggleTaskRequest(id, taskFound.done === 0 ? true : false)

            setTasks(tasks.map((task) => (task.id === id ? {...task, done : !task.done} : task)))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks, 
            loadTasks, 
            deleteTask, 
            createTask, 
            getTask, 
            updateTask, 
            taskDoneToggle}}
        >
            {children}
        </TaskContext.Provider>
    )
}