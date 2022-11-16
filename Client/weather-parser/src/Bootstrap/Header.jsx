
import React from 'react';

export default function Header() {
    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <a href="index.html" className="logo d-flex align-items-center">
                    <img src="./assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">Web Parser</span>
                </a>
                <i
                    className="bi bi-list toggle-sidebar-btn"
                    onClick={() => {
                        if (document.body.className) {
                            document.body.className = '';
                        } else {
                            document.body.className = 'toggle-sidebar';
                        }
                    }}></i>
            </div>
        </header>
    );
}


