import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import httpClient from "../../services/api";
import "./index.scss";

const PostList: React.FC = () => {
  const [initPostList, setInitPostList] = React.useState([]);
  const [updatePostList, setNewPostList] = React.useState({});

  const hanndleLike = React.useCallback((id) => {
    httpClient
      .put(
        `post/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@app/token")}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        setNewPostList(response.data);
      })
      .catch((error: AxiosError) => {
        alert("Você precisa estar Logado");
        console.log(error.response);
      });
  }, []);

  const hanndleDisLike = React.useCallback((id) => {
    httpClient
      .put(
        `post/${id}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@app/token")}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        setNewPostList(response.data);
      })
      .catch((error: AxiosError) => {
        alert("Você precisa estar Logado");
        console.log(error.response);
      });
  }, []);

  React.useEffect(() => {
    httpClient
      .get("/list-all-posts")
      .then((response: AxiosResponse) => {
        // console.log(response.data);
        if (response.data) {
          setInitPostList(response.data);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  }, [updatePostList]);

  return (
    <div className="post-modal">
      {initPostList.map((post: any) => {
        return (
          <div className="plx-card gold" key={post.id}>
            <div className="pxc-bg">
              {/* (<img src={post.file_url} alt="PostImage" /> */}
            </div>
            <div className="pxc-avatar">
              <img
                src={
                  post.user.avatar_id
                    ? `http://localhost:3333/file/${post.user.avatar_id}`
                    : "https://www.ramscap.co.za/wp-content/uploads/2019/09/default-non-user-no-photo-1.jpg"
                }
                alt="Avatar"
              />
            </div>
            <div className="pxc-subcard">
              <div className="pxc-title">{post.title}</div>
              <div className="pxc-sub">Game: {post.game}</div>
              <div className="pxc-feats">
                <span>{post.description}</span>
              </div>
              {/* <button className="showmore">show more</button> */}
              <div className="pxc-options">
                <span>
                  {post.num_likes}
                  <AiFillLike
                    className="icons"
                    onClick={() => hanndleLike(post.id)}
                  />
                </span>
                <span>
                  {post.num_deslikes}
                  <AiFillDislike
                    className="icons"
                    onClick={() => hanndleDisLike(post.id)}
                  />
                </span>
                <span>
                  {post.num_comments}
                  <BiCommentDetail className="icons" />
                </span>
              </div>
              <div className="pxc-tags">
                {post.tags.split(", ").map((tag: string) => {
                  return <div key={tag}>{tag}</div>;
                })}
              </div>
              <div className="bottom-row">
                <div className="pxc-info">
                  <div className="author">Author: {post.user.username}</div>
                </div>
                <div className="pxc-more">
                  <a
                    href={`/postagem/${post.id}/${post.title
                      .replaceAll(" ", "-")
                      .toLowerCase()}`}
                  >
                    Dataills
                  </a>
                </div>
                <p className="lastUpdated">Last Updated: {post.updated_at}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
