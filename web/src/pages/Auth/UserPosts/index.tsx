import React from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import Navbar from '../../../components/Navbar';

import api from '../../../services/api'
import './index.css'

const UserPost = () => {
  const [userPosts, setUserPost] = React.useState([]);

  React.useEffect(() => {
    api.get('/post/user-posts', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(res => {
      setUserPost(res.data);
    }, fail => {
      // console.log(fail);
    })
  }, [])

  console.log(userPosts);

  return (
    <>
      <Navbar />
      <div className="post-modal user">

        {userPosts.map((post: any) => {
          return (
            <div className="plx-card gold" key={post.id}>
              <div className="pxc-bg">
                <img src={post.file_url} alt="PostImage" />
              </div>
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
                  <div className="pxc-more">
                    <a href={`/postagem/${post.id}`}>Detalhes</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default UserPost