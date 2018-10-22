import React, { Component } from 'react';


import avatar from 'theme/assets/lisa';
import Styles from './styles.m.css';

export default class Composer extends Component {
    render () {
        return (
            <section className= { Styles.composer }>
                <img src= { avatar } />
                <form>
                    <textarea placeholder = { `What's on your mind, Lisa?` } />
                    <input type='submit' value='Post' />   
                </form>
            </section>
        );
    }
}