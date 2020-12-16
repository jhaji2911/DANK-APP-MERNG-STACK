import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_QUERY } from "../graphql";
import { Grid, Transition } from "semantic-ui-react";
import { MoonLoader } from "react-spinners";
//import {useErrorBoundary} from 'use-error-boundary';

import { AuthContext } from "../context/context";
import PostForm from "../postForm";
import PostCard from "../layouts/PostCard";
function Home(arg = {}) {
  // const {
  //     ErrorBoundary,
  //     didCatch,
  //     error
  //   } = useErrorBoundary()
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = arg } = useQuery(FETCH_QUERY);
  function getWindowDimensions() {
    const { innerWidth: width } = window;
    return {
      width,
    };
  }
  const viewPort = getWindowDimensions();
  const Nview = Number(viewPort.width);
  const desk = 640;
  let val = {};
  if (Nview >= desk) {
    val = 3;
  } else {
    val = 2;
  }

  return (
    <Grid columns={val} padded="horizontally" className="postCards">
      <Grid.Row className="title">
        <h1>Dank Posts</h1>
      </Grid.Row>
      <div className="PostForm">
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
        </Grid.Row>
      </div>

      <Grid.Row>
        {loading ? (
          <div className="sweet-loading">
            <MoonLoader size={150} color={"olive"} />
          </div>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
