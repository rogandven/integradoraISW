import useGetUsers from "@hooks/users/useGetUsers.jsx";
import useDeleteUser from "@hooks/users/useDeleteUser.jsx";
import useEditUser from "@hooks/users/useEditUser.jsx";
import { useEffect } from "react";
import { DUUserTable } from "../components/daisyUI/DUUserTable";
import { DUMailtoButton } from "../components/daisyUI/DUMailtoButton";

const Users = () => {
  const { users, fetchUsers } = useGetUsers();
  const { handleDeleteUser } = useDeleteUser(fetchUsers);
  const { handleEditUser } = useEditUser(fetchUsers);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-page">
      <h2 className="card-title mb-2">Lista de Usuarios</h2>
      {DUUserTable(users, handleEditUser, handleDeleteUser)}
    </div>
  );
};

export default Users;
