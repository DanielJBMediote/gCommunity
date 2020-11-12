import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage";
import UserPost from "./pages/Auth/UserPosts";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/SignUp";
import Error404 from "./pages/Error/Error404";
import UserProfile from "./pages/Auth/UserProfile";
import PostDetail from "./pages/PostDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Homepage} path="/" exact />
        <Route component={SignIn} path="/login" />
        <Route component={SignUp} path="/cadastrar" />
        <Route component={UserPost} path="/meus-posts" />
        <Route component={UserProfile} path="/perfil" />
        <Route component={PostDetail} path="/postagem/" />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
