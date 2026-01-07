import { createSolicitud as s_createSolicitud } from "../../services/group.service.js";
import Swal from "sweetalert2";

export const useCreateSolicitud = () => {
  const createSolicitud = async (id) => {
    const areyousure = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás deshacer esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, solicitar",
        cancelButtonText: "Cancelar",
    });
    if (areyousure.isConfirmed) {
      const respuesta = Number(await s_createSolicitud(id));
      if (respuesta >= 200 && respuesta <= 299) {
        return Swal.fire("Éxito", "Solicitud creada con éxito", 'success');
      } else {
        return Swal.fire("Error", "Error al crear la solicitud", 'error');
      }
    } else {
      return;
    }
  }

  return createSolicitud;
}