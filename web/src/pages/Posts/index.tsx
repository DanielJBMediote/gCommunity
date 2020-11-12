import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import httpClient from "../../services/api";
import Button from "../../components/Button";
import Input from "../../components/Input";
import PostList from "../PostList";
import "./index.scss";

const Posts: React.FC = () => {
  const [games, setGames] = React.useState([{ id: 0, name: "" }]);
  const [data, setData] = React.useState({});
  // let formData = new FormData();

  React.useEffect(() => {
    httpClient.get("list-all-games").then((response: AxiosResponse) => {
      setGames(response.data);
    });
  }, []);

  const handleInputBlur = React.useCallback((e) => {
    if (e.target.files) {
      setData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
      // formData.append("file", e.target.files[0]);
    } else {
      setData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      // formData.append(e.target.name, e.target.value);
    }
  }, []);

  const onSubmitForm = React.useCallback(() => {
    httpClient
      .post("/post", data, {
        headers: {
          // "Content-Type": `multipart/form-data;`,
          Authorization: `Bearer ${localStorage.getItem("@app/token")}`,
        },
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  }, [data]);

  return (
    <>
      {localStorage.getItem("@app/token") ? (
        <div className="postform">
          <div className="title-form">
            <label htmlFor="title">title</label>
            <Input type="text" name="title" handdleBlur={handleInputBlur} />
          </div>
          <div className="tags-form">
            <label htmlFor="tags">tags</label>
            <Input
              type="text"
              name="tags"
              handdleBlur={handleInputBlur}
              placeholder="Ex: bugs, problems, tips"
            />
          </div>
          <div className="game-form">
            <label htmlFor="game">game</label>
            <select name="game" onBlur={handleInputBlur}>
              {games.map((game) => {
                return (
                  <option value={game.name} key={game.name}>
                    {game.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <div className="file-upload">
            <span className="file-label">Upload File</span>
            <input
              type="file"
              name="file"
              id="file-upload"
              onChange={handleInputBlur}
              className="upload-box"
              placeholder="Upload File"
            />
          </div> */}
          <div className="description-form">
            <label htmlFor="description">description</label>
            <textarea
              name="description"
              id=""
              cols={30}
              rows={10}
              onBlur={handleInputBlur}
            />
          </div>
          <Button type="button" label="Publish" handdleClick={onSubmitForm} />
        </div>
      ) : (
        ""
      )}

      <PostList />
    </>
  );
};

export default Posts;
