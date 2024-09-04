import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";
import { Container, ListGroup } from "react-bootstrap";

const User = () => {
  const userId = useParams().id;
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetch() {
      const tempUser = await userService.getUserById(userId);
      setUser(tempUser);
    }
    fetch();
  }, []);

  if (!user) return null;
  return (
    <Container>
      <h2><strong>{user.name}</strong></h2>
      <h4>added blogs
      </h4>
      <ListGroup as={'ul'}>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default User;
