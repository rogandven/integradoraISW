import useGetGroups from "@hooks/groups/useGetGroups.jsx";
import { useEffect } from "react";
import { DUGroupTable } from "../components/daisyUI/DUGroupTable";
import { DUMailtoButton } from "../components/daisyUI/DUMailtoButton";

const Groups = () => {
  const { groups, fetchGroups } = useGetGroups();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="groups-page">
      <h2 className="card-title mb-2">Lista de Grupos</h2>
      {DUGroupTable(groups)}
    </div>
  );
};

export default Groups;
