import s from './MyPosts.module.css';
import Post from "./Post/Post";
import React from "react";

function MyPosts(props) {

    
    let postsElements = props.posts.map(p => <Post message={p.message} like={p.like}/>);

    let newPostElement = React.createRef();


    let onAddPost = () => {
        props.addPost()
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text)
    }

    return (

        <div className={s.posts_block}>
            <h2>My posts</h2>
            <div className={s.new_post}>
                    <textarea onChangeCapture={onPostChange} ref={newPostElement} value={props.newPostText}
                              cols="30" rows="6"/>
                <button className={s.btn_add_post} onClick={onAddPost}>SEND</button>
            </div>
            {postsElements}
        </div>

    )
}

export default MyPosts;