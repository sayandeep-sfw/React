import { useState } from "react";
import './LoginForm.css'
export function LoginForm() {
        const [pswdShowHide, setPswdShowHide]=useState(false);
        function showHide(){
          setPswdShowHide(!pswdShowHide)
        }
        return (
          <>
            <div>
              <input
                placeholder="Email"
                className="login-input"
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type={pswdShowHide?'text':'password'}
                className="login-input"
              />
              <button className="show" onClick={showHide}>{!pswdShowHide?'Show':'Hide'}</button>
            </div>
            <button className="login-button">Login</button>
            <button className="login-button">Sign up</button>
          </>
        );
      }