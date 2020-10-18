import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/ShelterMap';
import CreateShelter from './pages/CreateShelter';
import Shelter from './pages/Shelter';

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={OrphanagesMap}/>

                <Route path="/shelters/create" component={CreateShelter}/>
                <Route path="/shelters/:id" component={Shelter}/>
            </Switch>   
        </BrowserRouter>
    );
}

export default Routes;