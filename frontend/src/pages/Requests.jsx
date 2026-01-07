import useGetSolicituds from "@hooks/groups/useGetSolicitudes.jsx";
import { useEffect } from "react";
import { DUSolicitudTable } from "../components/daisyUI/DUSolicitudTable";
import { DUMailtoButton } from "../components/daisyUI/DUMailtoButton";

const Solicituds = () => {
  const { solicitudes, fetchSolicituds } = useGetSolicituds();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchSolicituds();
  }, []);

  return (
    <div className="solicitudes-page">
      <h2 className="card-title mb-2">Lista de Grupos</h2>
      {DUSolicitudTable(solicitudes)}
    </div>
  );
};

export default Solicituds;
