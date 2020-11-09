import React from 'react';
import api from '../../services/api';
import Button from '../Button';
import Input from '../Input';

import './index.css'

const Postform: React.FC = () => {

  const games = [{ id: 1, name: 'Game 1' }, { id: 2, name: 'Game 2' }]
  let formData = new FormData();

  function handleInputBlur(e: any) {
    if (e.target.files) {
      formData.append('file', e.target.files[0])
    }
    formData.append(e.target.name, e.target.value);
  }


  function onSubmitForm() {

    api.post('/post', formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'Authorization': `Bearer ${localStorage.getItem('@app/token')}`
      }
    }).then(res => {
      console.log(res.data);

      // window.location.href = "/";
    }, fail => {
      console.log(fail);
    })
  }

  // render() {
  return (
    <>
      <div className="postform">
        <fieldset>
          <legend>new post</legend>
          <div className="title-form">
            <label htmlFor="title">title</label>
            <Input type="text" name="title" handdleBlur={handleInputBlur} />
          </div>
          <div className="tags-form">
            <label htmlFor="tags">tags</label>
            <Input type="text" name="tags" handdleBlur={handleInputBlur}
              placeholder="Ex: bugs, problems, tips" />
          </div>
          <div className="game-form">
            <label htmlFor="game">game</label>
            <select name="game" defaultValue={games[0].id}
              onBlur={handleInputBlur}>
              {games.map(game => {
                return (<option value={game.id} key={game.id}>{game.name}</option>)
              })}
            </select>
          </div>
          <div className="file-upload">
            <span className="file-label">
              Upload File
               </span>
            <input type="file" name="file" id="file-upload" onBlur={handleInputBlur}
              className="upload-box" placeholder="Upload File" />
          </div>
          <div className="description-form">
            <label htmlFor="description">description</label>
            <textarea name="description" id="" cols={30} rows={10}
              onBlur={handleInputBlur} />
          </div>
          <Button type="button" label="Publish" handdleClick={onSubmitForm} />
        </fieldset>
      </div>
    </>
  )
  // }
}

export default Postform