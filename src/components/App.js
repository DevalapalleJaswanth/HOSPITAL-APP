import React from 'react';
import Signup from './Signup';
// import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { Switch, Route, Link } from 'react-router-dom';
// import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Home from './Home';
import Nav from './Nav';

function App() {
    return (
        <AuthProvider>
            <div className="w-100">
                <Nav />
                <div>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute
                            path="/update-profile"
                            component={UpdateProfile}
                        />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route
                            path="/forgot-password"
                            component={ForgotPassword}
                        />
                    </Switch>
                </div>
            </div>
        </AuthProvider>
    );
}

export default App;
