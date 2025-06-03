//Core
import React, { Component } from 'react';
import moment from 'moment';

//Components
import { withProfile } from './../HOC/withProfile.js';
import StatusBar from './../StatusBar/index.js';
import Composer from './../Composer/index.js';
import Post from './../Post/index.js';
import Spinner from './../Spinner/index.js';

// instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

@withProfile
export default class Feed extends Component {

    state = {
        posts:[
            { id : '123', comment : 'Hy Thea', created: 1526825076849 , likes:[] }, 
            { id : '153', comment : 'Hy two Thea', created: 1526825076851,likes:[] }
        ],
        isPostsFetching: false,
    }

    _setPostFetchingState = (state) =>   {
        this.setState({
            isPostsFetching : state
        });
    }

    _createPost = async (comment) =>  {

        this._setPostFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
            likes: [],
        }

        await delay( 1200 );
        this.setState(({ posts }) => ({
            posts: [post, ...posts],
            isPostsFetching: false,
        }));
    }
    _likePost = async ( id ) =>  {

        const { currentUserFirstName, currentUserLastName } = this.props;
        this._setPostFetchingState(true);

        await delay (1200);

        const newPosts = this.state.posts.map( post => {
            if(post.id === id) {
                return {
                    ...post,
                    likes:[
                        {
                            id: getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName: currentUserLastName
                        }
                    ] 
                }
            }
            return post;
        });

        this.setState({
            posts: newPosts,
            isPostsFetching: false,
        });

    }

    _removePost = async ( id ) => {

        this._setPostFetchingState(true);

        await delay (1200);

        this.setState(({posts}) => ({
            posts:           posts.filter((post) => post.id !== id ),
            isPostsFetching: false
        }));
    }

    render () {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (<Post 
                key = { post.id } 
                { ...post } 
                _likePost = { this._likePost }
                _removePost = { this._removePost }
                />); 
        });


        return (
            <section className= { Styles.feed }>
                <Spinner isSpinning = { isPostsFetching } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                { postsJSX }
            </section>  
        );
    }
}