import React, { useEffect, useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetch() {
      const users = await userService.getAllUsers();
      setUsers(users);
    }
    fetch();
  }, []);

  if (!users) return null;
  return (
    <Container>
      <h3 className="h3">Users</h3>
      <Table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col" ></th>
            <th scope="col" >
              <strong>blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td className="align-middle">
                <Link variant="link" className="text-light" to={`${user.id}`}>{user.name}</Link>
              </td>
              <td className="align-middle">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
