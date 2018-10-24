// Core
import React, { Component } from 'react';

//Insruments
import { object } from 'prop-types';
import Styles from './styles.m.css';

export default class Catcher extends Component {
    render () {
        console.log('-> catcher');
        
        return this.props.children;
    }
}
