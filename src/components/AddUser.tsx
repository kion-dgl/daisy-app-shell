import { useState } from 'preact/hooks';

const AddUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');

    const handleAddUser = async () => {

        console.log(username);
        if (username.trim() === '') {
            return;
        }

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username })
            });
            if (response.ok) {
                console.log('User added successfully');
                setIsOpen(false)
                setUsername('');
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }

        
    };

    return (
        <>
            <button class="btn btn-primary" onClick={() => setIsOpen(true)}
            >Add New</button
            >
            <dialog id="my_modal_5" class={`modal modal-bottom sm:modal-middle ${isOpen ? 'modal-open' : ''}`}>
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Add New User (b)</h3>
                    <p class="py-4 space-y-4">
                        <label class="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                class="w-4 h-4 opacity-70"
                            >
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                                ></path>
                            </svg>
                            <input
                                type="text"
                                class="grow"
                                placeholder="Username"
                                value={username}
                                onInput={(event) => setUsername((event.target as HTMLInputElement).value)}
                            />
                        </label>
                    </p>
                    <form class="w-full flex justify-between" method="dialog">
                        <button class="btn" onClick={() => setIsOpen(false)}> Close</button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            onClick={handleAddUser}
                        >
                            Add
                        </button>
                    </form>

                </div>
            </dialog >
        </>
    );
};

export default AddUser;