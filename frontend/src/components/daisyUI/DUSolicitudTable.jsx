import { GrSolicitud } from "react-icons/gr";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdRequestQuote } from "react-icons/md";


export const DUSolicitudTable = (solicitudes) => {

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th>Usuario</th>
                <th>Grupo</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(solicitudes) && solicitudes.length >= 1 && solicitudes.map(
                (solicitud, index) => {
                    return ( 
                        <tr key={solicitud.id || ("SOLICITUD" + index)}>
                            <td>
                                <div className="flex flex-row align-middle items-center">
                                    <span><MdRequestQuote className="mr-2"/></span>
                                    <span>{"Solicitud " + solicitud.numero}</span>
                                </div>
                            </td>    
                            <td>
                                {solicitud.cantidad_maxima}
                            </td>
                            <td>
                                {solicitud.cantidad_minima}
                            </td>
                            <td>
                                {Array.isArray(solicitud?.inscritos) && solicitud.inscritos.map((alumno) => {
                                    return (
                                        <p>{alumno.nombres + " " + alumno.apellidos}</p>
                                    )
                                })}
                            </td>
                            <td>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </table>
        </div>
    )
}