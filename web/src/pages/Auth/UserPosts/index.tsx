import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Button from "../../../components/Button";
import Navbar from "../../../components/Navbar";
import httpClient from "../../../services/api";
import "./index.scss";

const UserPost = () => {
  const [userPosts, setUserPost] = React.useState([]);
  const [postDeleteID, setPostDeleteID] = React.useState(0);
  const [displayAlert, setDisplayAlert] = React.useState("blockNone");

  React.useEffect(() => {
    httpClient
      .get("/user/list-all-user-posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@app/token")}`,
        },
      })
      .then((response: AxiosResponse) => {
        setUserPost(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  }, []);

  const handdleDeletePost = React.useCallback((id) => {
    setPostDeleteID(id);
    if (displayAlert != "block") {
      setDisplayAlert("block");
    }
  }, []);

  const cancelDelete = React.useCallback(() => {
    setDisplayAlert("blockNone");
  }, []);

  const comfirmDelete = React.useCallback(() => {
    httpClient
      .delete(`post/${postDeleteID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@app/token")}`,
        },
      })
      .then((response: AxiosResponse) => {
        alert(response.data.msg);
        document.location.href = "";
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  }, [postDeleteID]);
  // console.log(userPosts);

  return (
    <>
      <Navbar />

      <div className={`alertMessage ${displayAlert}`}>
        <h4>Deseja realmente excluir essa postagem?</h4>
        <div>
          <Button type="button" label="Cancelar" handdleClick={cancelDelete} />
          <Button
            type="button"
            className="red"
            label="Confirmar"
            handdleClick={comfirmDelete}
          />
        </div>
      </div>
      <div className="post-modal user">
        {userPosts.map((post: any) => {
          return (
            <div className="plx-card gold" key={post.id}>
              <div className="pxc-bg">
                {/* <img src={post.file_url} alt="PostImage" /> */}
              </div>
              <div className="pxc-subcard">
                <div className="pxc-title">{post.title}</div>
                <div className="pxc-sub">Jogo: {post.game}</div>
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
                  {post.tags.split(", ").map((tag: string) => {
                    return <div key={tag}>{tag}</div>;
                  })}
                </div>
                <div className="bottom-row">
                  <div className="pxc-more">
                    <a href={`/postagem/${post.id}`}>Detalhes</a>
                    <MdDelete
                      className="btnDeletePost"
                      onClick={(e) => handdleDeletePost(post.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserPost;
