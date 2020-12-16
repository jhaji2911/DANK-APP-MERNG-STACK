import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import NavBar from "./components/layouts/NavBar";
import { AuthProvider } from "./components/context/context";
import AuthRoute from "./components/util/authRoute";
import SinglePost from "./components/pages/SinglePost";
function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <NavBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
