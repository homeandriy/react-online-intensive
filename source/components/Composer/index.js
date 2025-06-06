//Core
import React, { Component } from 'react';
import propTypes from 'prop-types';

//Instruments
import { withProfile } from './../HOC/withProfile.js';
import Styles from './styles.m.css';

class Composer extends Component {
    static propTypes = {
        _createPost: propTypes.func.isRequired,
    };


    state = {
        comment: '',
    };

    _updateComment =  (event) => {
        this.setState({
            comment: event.target.value,
        });
    }

    _handleFormSubmit =  (event) =>  {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment =  () => {       
        const { comment } = this.state;

        if( !comment ) {
            return null;
        }

        this.props._createPost( comment );

        this.setState({
            comment: '',
        });
    }

    _submitOnEnter =  ( event ) =>  {
        const enterKey = event.key === 'Enter';

        if( enterKey ) {
            event.preventDefault();
            this._submitComment();
        }
    }

    render () {
        const { comment } = this.state;
        const { avatar , currentUserFirstName} = this.props;
        return (            
                <section className= { Styles.composer }>
                    <img src= { avatar } />
                    <form onSubmit = { this._handleFormSubmit }>
                        <textarea 
                            placeholder = { `What's on your mind, ${ currentUserFirstName }?` }
                            value = { comment }
                            onChange = { this._updateComment }
                            onKeyPress = { this._submitOnEnter }
                            />
                        <input type='submit' value='Post' />   
                    </form>
                </section>
        );
    }
}

export default withProfile(Composer);