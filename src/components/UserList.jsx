import React from 'react';

const UserList = ({ users, onSelect }) => {
  return (
    <div>
      <h2>Select User:</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <button onClick={() => onSelect(user.id)}>{user.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
