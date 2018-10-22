//Core
import React, { Component } from 'react';
import moment from 'moment';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

// instruments
import Styles from './styles.m.css';
import { getUniqueID } from 'instruments';

export default class Feed extends Component {
    constructor() {
        super();

        this._createPost = this._createPost.bind(this);
    }

    state = {
        posts:[
            { id : '123', comment : 'Hy Thea', created: 1526825076849 }, 
            { id : '153', comment : 'Hy two Thea', created: 1526825076851 }
        ],
        isPostsFetching: false,
    }

    _createPost(comment) {
        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
        }
        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));
    }

    render () {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post }/>; 
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