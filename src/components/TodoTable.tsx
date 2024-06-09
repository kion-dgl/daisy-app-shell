import { useState } from 'react';

type TodoRowProps = {
    id: number;
    task: string;
    complete: boolean;
};

const TodoTable = (props: { tasks: TodoRowProps[] }) => {

    const [tasks, setTasks] = useState(props.tasks);
    console.log(tasks);

    const handleSetComplete = async (id: number) => {
        console.log('set complete');
        await fetch('/api/todo', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        setTasks(tasks.map((t) => (t.id === id ? { ...t, complete: true } : t)));
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                    </th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(({ task, complete }, index) => (
                        <tr key={`task-${index}`}>
                            <th>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                    />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="font-bold">
                                            {task}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <th>
                                {complete ? (
                                    <button
                                        className="btn btn-ghost btn-xs disabled:opacity-50"
                                        disabled
                                    >
                                        Completed
                                    </button>
                                ) : (
                                    <button className="btn btn-primary btn-xs" onClick={() => handleSetComplete(id)}>
                                        Set Complete
                                    </button>
                                )}
                            </th>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default TodoTable;