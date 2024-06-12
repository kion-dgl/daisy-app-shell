import { useState, useEffect } from 'react';

const THEMES = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"];

export default function Header() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <header className='bg-base-100 py-2 sticky top-0 z-50 shadow'>
            <div className='container mx-auto'>
                <div className="navbar px-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-circle btn-primary lg:hidden mr-1">
                                <i className='bi bi-list text-2xl'></i>
                            </label>
                            <ul tabIndex={0} className="dropdown-content mt-1 w-52 menu menu-compact p-2 bg-base-200 shadow rounded-box">
                                <li><a href="#!">Home</a></li>
                                <li><a href="#!">Services</a></li>
                                <li><a href="#!">About</a></li>
                                <li><a href="#!">Work</a></li>
                                <li><a href="#!">Case Study</a></li>
                            </ul>
                        </div>
                        <a className="btn btn-ghost normal-case text-2xl">daisyUI</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0 font-medium">
                            <li><a href="#!">Home</a></li>
                            <li><a href="#!">Services</a></li>
                            <li><a href="#!">About</a></li>
                            <li><a href="#!">Work</a></li>
                            <li><a href="#!">Case Study</a></li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn">
                                {THEMES.length} Themes
                            </label>
                            <ul tabIndex={0} className="dropdown-content mt-1 w-52 max-h-96 overflow-y-auto menu menu-compact p-2  bg-base-200 shadow rounded-box">
                                {
                                    THEMES.map((theme, i) => <li key={theme + i}><button data-set-theme={theme} onClick={
                                        () => {
                                            setTheme(theme)
                                        }
                                    } className="font-medium capitalize">{i + 1 + '. ' + theme}</button></li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}