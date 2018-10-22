import React, { Component } from 'react';

import Composer from 'components/Composer';
import Post from 'components/Post';

// instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    render () {
        return (
            <section className= { Styles.feed }>
                <Composer />
                <Post /> 
            </section>  
        );
    }
}