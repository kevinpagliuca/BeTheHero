
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import MyIncidents from './pages/MyIncidents';
import NewIncident from './pages/NewIncident';
import MyAccount from './pages/MyAccount';
import Home from './pages/Home';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />

                <Route path="/myincidents" component={MyIncidents} />
                <Route path="/incidents/new" component={NewIncident} />

                <Route path="/myaccount" component={MyAccount} />

                <Route path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}