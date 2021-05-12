/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-12 18:35:54
 * @modify date 2021-05-12 18:35:54
 * @desc [description]
 */
import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function Nav() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');

        try {
            await logout();
            history.push('/login');
        } catch {
            setError('Failed to log out');
        }
    }
    return (
        <header>
            <nav>
                <ul className="nav-area">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {currentUser && (
                        <>
                            <li>
                                <Link to="/patients">Patients</Link>
                            </li>
                            <li>
                                <Link to="/reports">Reports</Link>
                            </li>
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            {currentUser && (
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            )}
        </header>
    );
}

export default Nav;
