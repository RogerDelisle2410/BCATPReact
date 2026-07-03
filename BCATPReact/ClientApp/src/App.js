import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home'; 
import { AddBcatp } from './components/AddBcatp';
import { FetchMap } from './components/FetchMap';
import { FetchBcatp } from './components/FetchBcatp';
import { FetchImage } from './components/FetchImage';
import { MaintBcatp } from './components/MaintBcatp';
import './custom.css'

export default class App extends Component {


    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route  path='/fetchbcatp/:tableName' component={FetchBcatp} />
                <Route  path='/fetchnavy/:tableName' component={FetchBcatp} />
                <Route  path='/fetchdewline/:tableName' component={FetchBcatp} />
                <Route  path='/fetchmidcanada/:tableName' component={FetchBcatp} />
                <Route  path='/fetchpinetree/:tableName' component={FetchBcatp} />
                <Route  path='/fetchairforce/:tableName' component={FetchBcatp} />
                <Route  path='/fetcharmy/:tableName' component={FetchBcatp} />
                <Route  path='/fetchdefunct/:tableName' component={FetchBcatp} />

                <Route  path='/fetchtanks/:tableName' component={FetchBcatp} />
                <Route  path='/fetchplanes/:tableName' component={FetchBcatp} />
                <Route  path='/fetchships/:tableName' component={FetchBcatp} />

                {/* Generic add route for any table (e.g. /bcatp/add, /ships/add) */}
                <Route path='/:tableName/add' component={AddBcatp} />
                {/* legacy specific add route kept for compatibility */}
                <Route path='/addbcatp' component={AddBcatp} />

                <Route path='/bcatp/maint/' component={MaintBcatp} />
                <Route path='/navy/maint/' component={MaintBcatp} />
                <Route path='/dewline/maint/' component={MaintBcatp} />
                <Route path='/midcanada/maint/' component={MaintBcatp} />
                <Route path='/pinetree/maint/' component={MaintBcatp} />
                <Route path='/airforce/maint/' component={MaintBcatp} />
                <Route path='/army/maint/' component={MaintBcatp} />
                <Route path='/defunct/maint/' component={MaintBcatp} />
                <Route path='/tanks/maint/' component={MaintBcatp} />
                <Route path='/planes/maint/' component={MaintBcatp} />
                <Route path='/ships/maint/' component={MaintBcatp} />

                <Route path='/bcatp/edit/:Id' component={AddBcatp} />
                <Route path='/navy/edit/:Id' component={AddBcatp} />
                <Route path='/dewline/edit/:Id' component={AddBcatp} />
                <Route path='/midcanada/edit/:Id' component={AddBcatp} />
                <Route path='/pinetree/edit/:Id' component={AddBcatp} />
                <Route path='/airforce/edit/:Id' component={AddBcatp} />
                <Route path='/army/edit/:Id' component={AddBcatp} />
                <Route path='/defunct/edit/:Id' component={AddBcatp} />
                <Route path='/tanks/edit/:Id' component={AddBcatp} />
                <Route path='/planes/edit/:Id' component={AddBcatp} />
                <Route path='/ships/edit/:Id' component={AddBcatp} />

                <Route path='/tanks/image/:Id' component={FetchImage} />
                <Route path='/planes/image/:Id' component={FetchImage} />
                <Route path='/ships/image/:Id' component={FetchImage} />

                <Route path='/bcatp/map/:Id' component={FetchMap} />
                <Route path='/navy/map/:Id' component={FetchMap} />
                <Route path='/dewline/map/:Id' component={FetchMap} />
                <Route path='/midcanada/map/:Id' component={FetchMap} />
                <Route path='/pinetree/map/:Id' component={FetchMap} />
                <Route path='/airforce/map/:Id' component={FetchMap} />
                <Route path='/army/map/:Id' component={FetchMap} />
                <Route path='/defunct/map/:Id' component={FetchMap} />

               {/* <Route path='/bcatp/search/:name' component={FetchSearch} />*/}
                {/* Catch-all: redirect unknown routes to Home */}
                <Route render={() => <Redirect to="/" />} />
            </Layout>
        );
    }
}
