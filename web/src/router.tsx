import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Post from './pages/Post'
import UserPost from './pages/UserPosts'
import Login from './pages/Auth/Login'
import Cadastro from './pages/Auth/Cadastro'
import Error404 from './pages/Error/Error404'


const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Dashboard} path="/" exact />
        <Route component={Login} path="/login" />
        <Route component={Cadastro} path="/cadastrar" />
        <Route component={Post} path="/postagem" />
        <Route component={UserPost} path="/meus-posts" />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router