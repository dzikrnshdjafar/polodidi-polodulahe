import React from 'react';
import { ReactLogo, TwitterLogo, InstagramLogo, FacebookLogo, GitHubLogo } from '../utils/Logo';

export default function CompoFoot() {
  return (
    <footer className="footer footer-center bg-neutral text-neutral-content p-10">
  <aside>
  <div className='logo'>
         <img src={ReactLogo} className='rotate-animation w-20 mb-2' alt="React Logo" />
       </div>
    <p className="font-bold">
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
    <a href="https://web.facebook.com/dzikriansah.djafar/" target="_blank" rel="noopener noreferrer">
       <img src={FacebookLogo} className="w-7" width="24" height="24" alt="Facebook" />
     </a>
     <a href="https://www.instagram.com/dzikrnshdjafar/" target="_blank" rel="noopener noreferrer">
       <img src={InstagramLogo} className="w-7" width="24" height="24" alt="Instagram" />
     </a>
     <a href="https://github.com/dzikrnshdjafar/" target="_blank" rel="noopener noreferrer">
       <img src={GitHubLogo} className="w-7" width="24" height="24" alt="GitHub" />
     </a>
    </div>
  </nav>
</footer>
  );
}
