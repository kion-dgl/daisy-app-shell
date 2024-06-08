import { createSignal } from 'solid-js';

type TodoRowProps = {
    id: number;
    task: string;
    complete: boolean;
};

const TodoRow = (props: TodoRowProps) => {
    const { id, task, complete } = props;
    const [isCompleted, setIsCompleted] = createSignal(complete);

    const handleSetComplete = async () => {
        await fetch('/api/todo', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        setIsCompleted(true);
    };

    return (
        <tr>
            <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
            </th>
            <td>
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">{task}</div>
                    </div>
                </div>
            </td>
            <th>
                {isCompleted() ? (
                    <button class="btn btn-ghost btn-xs disabled:opacity-50" disabled>
                        Completed
                    </button>
                ) : (
                    <button class="btn btn-primary btn-xs" onClick={handleSetComplete}>
                        Set Complete
                    </button>
                )}
            </th>
        </tr>
    );
};

export default TodoRow;