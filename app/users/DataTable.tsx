import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  users: User[];
}

const DataTable = ({ users }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>
              <Link href={`/users/${user.id}`}>Edit</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
