import React from 'react';

import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import api from '../../services/api'
import './index.css'

const Post = () => {

  const [posts, setPost] = React.useState([]);

  React.useEffect(() => {
    api.get('posts').then(res => {
      setPost(res.data);
      console.log(res.data);
    })
  }, []);

  return (
    <div className="post-modal">
      {posts.map((post: any) => {
        return (
          <div className="plx-card gold" key={post.id}>
            <div className="pxc-bg">
              {/* (<img src={post.file_url} alt="PostImage" /> */}
            </div>
            <div className="pxc-avatar">
              <img src={post.user.avatar_url} alt="Avatar" /></div>
            {/* <div className="pxc-stopper"></div> */}
            <div className="pxc-subcard">
              <div className="pxc-title">{post.title}</div>
              <div className="pxc-sub">Game: {post.game}</div>
              <div className="pxc-feats">
                <span>{post.description}</span>
              </div>
              <div className="pxc-options">
                <span>
                  {post.num_likes}
                  <AiFillLike className="icons" />
                </span>
                <span>
                  {post.num_deslikes}
                  <AiFillDislike className="icons" />
                </span>
                <span>
                  {post.num_comments}
                  <BiCommentDetail className="icons" />
                </span>
              </div>
              <div className="pxc-tags">
                {
                  post.tags.split(", ").map((tag: string) => {
                    return (<div key={tag}>{tag}</div>)
                  })
                }
              </div>
              <div className="bottom-row">
                <div className="pxc-info">
                  <div className="region">Autor: {post.user.username}</div>
                </div>
                <div className="pxc-more">
                  <a href={`/postagem/${post.id}`}>Detalhes</a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )

}

export default Post