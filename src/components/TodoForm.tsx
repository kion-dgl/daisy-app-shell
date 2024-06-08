import { createSignal } from 'solid-js';

const TodoForm = () => {
    const [task, setTask] = createSignal<string>('');

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (task().trim() === '') return;

        const response = await fetch('/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: task() })
        });

        if (response.ok) {
            setTask(''); // Clear the input after submission
        } else {
            console.error('Failed to add user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label class="input input-bordered flex items-center gap-2">
                Task
                <input
                    type="text"
                    class="grow"
                    placeholder="Do Something"
                    value={task()}
                    onInput={(e) => setTask(e.currentTarget.value)}
                />
            </label>
            <button type="submit" class="btn btn-primary">
                Add Task
            </button>
        </form>
    );
};

export default TodoForm;
