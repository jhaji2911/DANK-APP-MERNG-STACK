import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import MyPopup from "../util/MyPopup";
import { AuthContext } from "../context/context";
import DeleteButton from "../DeleteButton";
import LikeButton from "../likeButton";
export default function PostCard({
  post: { id, username, createdAt, body, likes, commentCount, likeCount },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid style={{ marginBottom: "20px" }}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).format("Do MMM YYYY")}</Card.Meta>
        <Card.Description as={Link} to={`/posts/${id}`}>
          {body}
        </Card.Description>
      </Card.Content>
      {user && (
        <Card.Content extra>
          <LikeButton user={{ user }} post={{ likes, likeCount, id }} />
          <MyPopup content="Come on! comment Dank people ">
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </MyPopup>

          {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      )}
    </Card>
  );
}
