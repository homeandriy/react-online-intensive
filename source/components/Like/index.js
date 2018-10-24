//Core
import React, { Component } from 'react';
import { func, string, arrayOf, shape } from 'prop-types';
import cx from 'classnames';

//Insruments
import { withProfile } from 'components/HOC/withProfile';
import Styles from './styles.m.css';

@withProfile
export default class Like extends Component {
    
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(
            shape({
                id:        string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired
            }),
        ).isRequired,
    };

    state = {
        showLikers: false,
    }

    _showLikers = () => {
        this.setState({
            showLikers: true,
        })
    }

    _hideLikers = () => {
        this.setState({
            showLikers: false,
        })
    }

    _likePost = () => {
        const { _likePost, id } = this.props;

        _likePost(id);
    }

    _getLikeByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({firstName, lastName}) => {
            return (
                `${firstName} ${lastName}` ===
                `${currentUserFirstName} ${currentUserLastName}`
            );
        });
    }

    _getLikesStyles = () => {
        const likeByMe = this._getLikeByMe();

        return cx(Styles.icon, {
            [Styles.liked]: likeByMe,
        });
    }

    _getLikeList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likeJSX = likes.map(({ firstName, lastName, id }) =>( 
                                    <li key = { id }>{`${firstName} ${lastName}`}</li>
        ));

        return likes.length && showLikers ? <ul>{likeJSX}</ul> : null;
    }

    _getLikesDescription = () => {
        const { likes, currentUserFirstName, currentUserLastName } = this.props;

        const likeByMe = this._getLikeByMe;

        if(likes.length === 1 && likeByMe ) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if ( likes.length === 2 && likeByMe ) {
            return `You and ${ likes.length - 1 } other`;
        } else if (likeByMe) {
            return `You and ${ likes.length - 1 } other`;
        }

        return likes.length;
    }
    

    render () {

        const likeStyles  = this._getLikesStyles();
        const likerList = this._getLikeList();
        const likesDescription = this._getLikesDescription();

        // console.log(this.props);

        return (
            <section className = { Styles.like }>
                <span className = { likeStyles  } onClick = { this._likePost }>Like</span>
                <div>
                    { likerList }
                    <span
                    onMouseEnter = { this._showLikers }
                    onMouseLeave = { this._hideLikers }                    
                    >
                    { likesDescription }
                    </span>
                </div>
            </section>
        );
    }
} 