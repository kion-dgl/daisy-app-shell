import { useState, type FormEvent } from 'react'
import { actions } from 'astro:actions';

const TodoForm = () => {
    const [task, setTask] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (task.trim() === '')
            return;
        await actions.addTask({ task });
    }

    return (
        <form className='space-y-4' onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
                Task
                <input
                    type="text"
                    className="grow"
                    placeholder="Do Something"
                    name='task'
                    value={task}
                    onInput={(e) => setTask(e.currentTarget.value)}
                />
            </label>
            <button type="submit" className="btn btn-primary w-full">
                Add Task
            </button>
        </form>
    );
};

export default TodoForm;