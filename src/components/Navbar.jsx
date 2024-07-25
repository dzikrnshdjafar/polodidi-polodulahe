import React, { useState, useEffect } from 'react';
import { NavLogo } from '../utils/Logo';

export const CompoNav = () => {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="navbar bg-base-100 content">
  <div className="flex-1 flex items-center">
    <a href="/" className="flex items-center">
      <h1 className="text-secondary text-xl mr-2">CuacaGTO</h1>
      <img src={NavLogo} className='w-8' alt="" />
    </a>
  </div>
  <div className="dropdown flex-none">
    <div tabIndex={0} role="button" className="btn m-2">
      Tema
      <svg
        className="inline-block h-2 w-2 fill-current opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048">
        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
      </svg>
    </div>
    <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] p-1 shadow-2xl">
      <li>
        <label>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Default"
            value="default"
            checked={theme === 'default'}
            onChange={handleThemeChange}
          />
        </label>
      </li>
      <li>
        <label>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Retro"
            value="retro"
            checked={theme === 'retro'}
            onChange={handleThemeChange}
          />
        </label>
      </li>
      <li>
        <label>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Cyberpunk"
            value="cyberpunk"
            checked={theme === 'cyberpunk'}
            onChange={handleThemeChange}
          />
        </label>
      </li>
      <li>
        <label>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Valentine"
            value="valentine"
            checked={theme === 'valentine'}
            onChange={handleThemeChange}
          />
        </label>
      </li>
      <li>
        <label>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Aqua"
            value="aqua"
            checked={theme === 'aqua'}
            onChange={handleThemeChange}
          />
        </label>
      </li>
    </ul>
  </div>
</div>

  );
};

