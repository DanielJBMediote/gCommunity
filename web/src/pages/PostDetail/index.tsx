import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import Navbar from "../../components/Navbar";
import httpClient from "../../services/api";
import "./index.scss";
import moment from "moment";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import MomentConfig from "../../config/momentConfig";

const PostDetail: React.FC = () => {
  const [userPost, setUserPost] = React.useState({
    id: 0,
    title: "",
    description: "",
    game: "",
    tags: "",
    updated_at: "",
    num_likes: 0,
    num_deslikes: 0,
  });
  const [commentList, setCommentList] = React.useState([
    {
      id: 0,
      description: "",
      num_likes: 0,
      num_deslikes: 0,
      updated_at: "",
      user: {
        id: 0,
        username: "",
        avatar_id: null,
        fullname: "",
      },
    },
  ]);
  const postID = window.location.pathname.split("/")[2];
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  moment.updateLocale("pt", {
    relativeTime: MomentConfig.relativeTime,
  });
  const [commentData, setCommentData] = React.useState({});
  const [user, setUser] = React.useState({
    username: "",
    avatar_id: null,
  });

  React.useEffect(() => {
    // Buscar Post Selecionado
    httpClient
      .get(`post/${postID}`)
      .then((response: AxiosResponse) => {
        setUserPost(response.data[0]);
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });

    // Buscar Usuário Logado
    httpClient
      .get("user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@app/token")}`,
        },
      })
      .then((response: AxiosResponse) => {
        setUser({
          username: response.data.username,
          avatar_id: response.data.avatar_id,
        });
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
      });
  }, [postID]);

  React.useMemo(() => {
    // Listar Comentários da Postagem
    httpClient
      .get(`/comment/${postID}/get-all-by-post`)
      .then((response: AxiosResponse) => {
        setCommentList(response.data);
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
      });
  }, [postID, commentData]);

  const handdleChange = React.useCallback((e) => {
    setCommentData({ [e.target.name]: e.target.value });
  }, []);

  const hanndleSumbitComment = React.useCallback(() => {
    httpClient
      .post(`comment/${postID}`, commentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@app/token")}`,
        },
      })
      .then(() => {
        document.location.href = "";
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  }, [commentData, postID]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="plx-card gold">
          <div className="pxc-subcard">
            <div className="pxc-title">{userPost.title}</div>
            <div className="pxc-sub">{userPost.game}</div>
            <div className="pxc-feats">
              <span>{userPost.description}</span>
            </div>
            <div className="pxc-options">
              <span>
                {userPost.num_likes}
                <AiFillLike
                  className="icons"
                  // onClick={() => hanndleLike(post.id)}
                />
              </span>
              <span>
                {userPost.num_deslikes}
                <AiFillDislike className="icons" />
              </span>
            </div>
            <div className="pxc-tags">
              {/* {userPost.tags.split(", ").map((tag: string) => {
                return <div key={tag}>{tag}</div>;
              })} */}
            </div>
            <div className="bottom-row">
              <div className="pxc-info">
                {/* <div className="author">Author: {userPost.user.username}</div> */}
              </div>
              <p className="lastUpdated">
                Ultima Atualização:{" "}
                {`${moment(userPost.updated_at).subtract(4, "h").from(now)}`}
              </p>
            </div>
          </div>
        </div>

        <div className="post-content"></div>
        <div className="comment-content">
          {/* Comment Form */}
          <div className="comment-form">
            <div className="comment-avatar">
              <img
                src={
                  user.avatar_id
                    ? `http://localhost:3333/file/${user.avatar_id}`
                    : "https://www.ramscap.co.za/wp-content/uploads/2019/09/default-non-user-no-photo-1.jpg"
                }
                alt="avatar-owner"
              />
            </div>

            <div className="form">
              <div className="author-row">
                <span>Author: {user.username}</span>
              </div>
              <div className="form-row">
                <textarea
                  className="input"
                  name="description"
                  placeholder="Add comment..."
                  onBlur={handdleChange}
                ></textarea>
              </div>

              <div className="form-row">
                <input
                  type="button"
                  value="Add Comment"
                  onClick={hanndleSumbitComment}
                />
              </div>
            </div>
          </div>

          {/* Comment Form */}

          {/* Comment List */}
          <div className="comments">
            {commentList.map((comment) => {
              return (
                <div className="comment" key={comment.id}>
                  <div className="comment-avatar">
                    <img
                      src={
                        comment.user.avatar_id
                          ? `http://localhost:3333/file/${comment.user.avatar_id}`
                          : "https://www.ramscap.co.za/wp-content/uploads/2019/09/default-non-user-no-photo-1.jpg"
                      }
                      alt="avatar-comment"
                    />
                  </div>

                  <div className="comment-box">
                    <div className="comment-text">{comment.description}</div>
                    <div className="comment-footer">
                      <div className="comment-info">
                        <span className="comment-author">
                          <b>{comment.user.username}</b>
                        </span>
                        <span className="comment-date">
                          {`${moment(comment.updated_at)
                            .subtract(4, "h")
                            .from(now)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comment List */}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
