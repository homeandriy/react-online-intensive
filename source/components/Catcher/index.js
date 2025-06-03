// Core
import React, { Component } from 'react';

export default class Catcher extends Component {
    render () {
        console.log('-> catcher');
        
        return this.props.children;
    }
}
