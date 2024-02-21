import { Form, Formik } from 'formik' 
import { useTasks } from '../context/taskContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function TaskForm() {
    const { createTask, getTask, updateTask } = useTasks()
    const [task, setTask] = useState({
        title: '',
        description: ''
    })
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const loadTask = async () => {
            if(params.id) {
                const taskData = await getTask(params.id)
                setTask({
                    title: taskData.title, // Fix the assignment here
                    description: taskData.description
                })
            }
        }
        loadTask()
    }, [params.id]) // Include params.id in the dependency array to trigger effect when params.id changes

    return (
        <div>
            <Formik 
                initialValues={task}
                enableReinitialize={true}

                onSubmit={async (values, actions) => {
                    console.log(values)

                    if(params.id) {
                        await updateTask(params.id, values)
                    } else {
                        await createTask(values)
                    }
                    navigate('/')
                    setTask({
                        title: '',
                        description: '',
                    })
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form 
                        onSubmit={handleSubmit} 
                        className='bg-slate-600 max-w-sm rounded-md p-4 mx-auto mt-10'
                    >
                        <h1 className='text-xl font-bold text-white uppercase text-center'>
                            {params.id ? 'Edit Task' : 'New Task'}
                        </h1> 
                        <label className='block text-white'>Title</label>
                        <input 
                            type='text' 
                            name='title' 
                            placeholder='Write a Title' 
                            className='px-2 py-1 rounded-sm w-full'
                            onChange={handleChange}
                            value={values.title}
                        />

                        <label className='block text-white'>Description</label>
                        <textarea 
                            name='description' 
                            rows='3' 
                            placeholder='Write a Description' 
                            className='px-2 py-1 rounded-sm w-full'
                            onChange={handleChange}
                            value={values.description}
                        ></textarea>

                        <button 
                            type='submit' 
                            disabled={isSubmitting} 
                            className='block bg-sky-600 text-white w-full rounded-md'
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default TaskForm
