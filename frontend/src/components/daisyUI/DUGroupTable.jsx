import { GrGroup } from "react-icons/gr";
import { BsPersonFillAdd } from "react-icons/bs";


export const DUGroupTable = (groups) => {
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Cantidad Máxima</th>
                <th>Cantidad Mínima</th>
                <th>Integrantes</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(groups) && groups.length >= 1 && groups.map(
                (group, index) => {
                    return ( 
                        <tr key={group.id || ("GRUPO" + index)}>
                            <td>
                                <div className="flex flex-row align-middle items-center">
                                    <span><GrGroup className="mr-2"/></span>
                                    <span>{"Grupo " + group.numero}</span>
                                </div>
                            </td>    
                            <td>
                                {group.cantidad_maxima}
                            </td>
                            <td>
                                {group.cantidad_minima}
                            </td>
                            <td>
                                {Array.isArray(group?.inscritos) && group.inscritos.map((alumno) => {
                                    return (
                                        <p>{alumno.nombres + " " + alumno.apellidos}</p>
                                    )
                                })}
                            </td>
                            <td>
                                <button className="btn btn-primary"><BsPersonFillAdd /></button>
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