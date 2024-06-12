import { useState, type FormEvent } from 'react'
import { actions } from 'astro:actions';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await actions.signUp({ username, password });
        setUsername('');
        setPassword('');
        window.location.href = '/app';
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input name="username" id="username" onChange={(e) => setUsername(e.target.value)} /><br />
            <label>Password</label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button>Continue</button>
            <p id="form-error"></p>
        </form>
    );
};

export default LoginForm;