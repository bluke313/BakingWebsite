import { Admin } from './Admin.js';
import { useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
    const [authorized, setAuthorized] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const passkey = "$2a$10$uha4oDS/vBY2hCx73Y3gWOTvnrQjg.4CaJLAMyg/pTuUCz/avULIq";
    const userkey = "$2a$10$U8gbiB3FYkU5WAriMjeeruCcL6AwAa.xbz75y5dsRWO9ECeKHHRYW";

    const bcrypt = require('bcryptjs');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const handleLogin = () => {
        bcrypt.compare(password, passkey, function (err, result) {
            if (result) {
                bcrypt.compare(username, userkey, function (err, result) {
                    if (result) {
                        setAuthorized(true);
                    }
                    else {
                        setError("Error");
                    }
                })
            }
            else {
                setError("Error");
            }
        })
    };

    return (
        <div>
            {authorized ? <Admin /> :
                <div id="Login">
                    <h1>Login</h1>
                    <div className="Input-line"><p>Username</p><input onChange={handleUsernameChange} /></div>
                    <div className="Input-line"><p>Password</p><input type="password" onKeyDown={handleKeyPress} onChange={handlePasswordChange}/></div>
                    <button type="submit" onClick={handleLogin}>Sign In</button>
                    <p style={{ color: 'maroon' }}>{error}</p>
                </div>
            }
        </div>
    );
};

export default AdminPage;