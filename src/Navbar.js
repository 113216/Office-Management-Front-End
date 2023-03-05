import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    return (
        <nav class="navbar navbar-expand-md navbar-light bg-light">
            <a class="navbar-brand" href="https://www.logic-square.com" target="_blank">
                <img src=""
                />
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active" onClick={() => { navigate('/') }} style={{ cursor: 'pointer' }}>
                        <button className='btn btn-light'> <i class="fa fa-arrow-right-from-bracket"></i>   Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar