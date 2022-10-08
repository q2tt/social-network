import s from './Post.module.css';

const Post = (props) => {
    return (

              <div className={s.item}>
                <div className={s.posts_img}>
                  <img src="https://thumbs.dreamstime.com/b/%D1%80%D0%B5%D0%B1%D1%91%D0%BD%D0%BE%D0%BA-%D0%BD%D0%B5%D0%B3%D1%80%D0%B0-%D0%B8-%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BF%D0%BE%D1%86%D0%B5-%D1%83%D0%B5%D0%B2-88963885.jpg" alt="baby" />
                </div>
                <div >
                  <p className={s.post_text}> {props.message} </p>
                    <p className={s.post_like}>like: {props.like} </p>
                </div>

              </div>
    )
}
export default Post;