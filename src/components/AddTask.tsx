import { useState, type FormEvent } from 'react'

const TodoForm = () => {
    const [task, setTask] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (task.trim() === '') return;

        const response = await fetch('/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });

        if (response.ok) {
            setTask(''); // Clear the input after submission
        } else {
            console.error('Failed to add user');
        }
    }

    return (
        <form className='space-y-4' onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
                Task
                <input
                    type="text"
                    className="grow"
                    placeholder="Do Something"
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