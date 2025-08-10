import React from "react";
import withLoading from "./withLoading";
import UserList from "./UserList";

// Wrap UserList with the HOC
const UserListWithLoading = withLoading(UserList);

export default function App() {
  const users = ["Alice", "Bob", "Charlie"];

  return (
    <div>
      <h1>HOC Example</h1>

      {/* This will show Loading */}
      <UserListWithLoading isLoading={true} users={users} />

      {/* This will show the user list */}
      <UserListWithLoading isLoading={false} users={users} />
    </div>
  );
}
