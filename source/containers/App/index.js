// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Component
import Catcher from './../../components/Catcher/index.js';
import Feed from '../../components/Feed/index.js';
import { Provider } from '../../components/HOC/withProfile.js';

//Instruments
import avatar from './../../theme/assets/lisa.png';

const options = {
    avatar,
    currentUserFirstName : 'Lisa',
    currentUserLastName : 'Simpson',
}

// @hot( module )
export default class App extends Component {
    render () {
        return (
            <Catcher>
                <Provider value = { options } >
                    <Feed />
                </Provider>
            </Catcher>
        );
    }
}
