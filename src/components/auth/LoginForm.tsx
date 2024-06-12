import { useState, type FormEvent } from 'react'
import { actions } from 'astro:actions';

const LoginForm = () => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('password');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await actions.signIn({ username, password });
        setUsername('');
        setPassword('');
        window.location.href = '/app';
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">

            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input name="username" id="username" type="text" className="grow" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type="password" className="grow" name="password" value="password" onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button className='btn btn-primary w-full'>Continue</button>
            <p id="form-error"></p>
        </form>
    );
};

export default LoginForm;