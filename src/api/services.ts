import type {
  ICatalogo,
  ICategoria,
  IConsultaPuestoVotacion,
  IGetPersona,
  IGetPersonaById,
  IGetUsers,
  IUser,
} from "@types";
import apiClient from "./apiClient";

//* -------------------------------------------------------------------------- */
//*                                    AUTH                                    */
//* -------------------------------------------------------------------------- */
export const login = async (payload: any) => {
  const { data } = await apiClient.post<IUser>("/auth/login", payload, {
    needAuth: false,
  });
  return data;
};

//* -------------------------------------------------------------------------- */
//*                                    HOME                                    */
//* -------------------------------------------------------------------------- */
export const getCategorizacion = async (): Promise<ICategoria[]> => {
  const { data } = await apiClient.get<ICategoria[]>("/home/categorias", {
    needAuth: false,
  });
  return data;
};

//* -------------------------------------------------------------------------- */
//*                                   LENGUAS                                  */
//* -------------------------------------------------------------------------- */
export const getLenguas = async (): Promise<ICatalogo[]> => {
  const { data } = await apiClient.get<ICatalogo[]>("/catalogos/lenguas", {
    needAuth: false,
  });
  return data;
};

export const postLengua = async (payload: ICatalogo): Promise<any> => {
  await apiClient.post<any>("/catalogos/lenguas", payload, {
    needAuth: false,
  });
};

export const putLengua = async (payload: ICatalogo): Promise<any> => {
  await apiClient.put<any>(`/catalogos/lenguas/${payload.id}`, payload, {
    needAuth: false,
  });
};

export const deleteLengua = async (id: number): Promise<any> => {
  await apiClient.delete<any>(`/catalogos/lenguas/${id}`, {
    needAuth: false,
  });
};

//* -------------------------------------------------------------------------- */
//*                                 BARRIOS                                    */
//* -------------------------------------------------------------------------- */
export const getBarrios = async (): Promise<ICatalogo[]> => {
  const { data } = await apiClient.get<ICatalogo[]>("/catalogos/barrios", {
    needAuth: false,
  });
  return data;
};

export const postBarrio = async (payload: ICatalogo): Promise<any> => {
  await apiClient.post<any>("/catalogos/barrios", payload, {
    needAuth: false,
  });
};

export const putBarrio = async (payload: ICatalogo): Promise<any> => {
  await apiClient.put<any>(`/catalogos/barrios/${payload.id}`, payload, {
    needAuth: false,
  });
};

export const deleteBarrio = async (id: number): Promise<any> => {
  await apiClient.delete<any>(`/catalogos/barrios/${id}`, {
    needAuth: false,
  });
};

//* -------------------------------------------------------------------------- */
//*                                 CODIGOB                                   */
//* -------------------------------------------------------------------------- */
export const getCodigoB = async (): Promise<ICatalogo[]> => {
  const { data } = await apiClient.get<ICatalogo[]>("/catalogos/codigosb", {
    needAuth: false,
  });
  return data;
};

export const postCodigoB = async (payload: ICatalogo): Promise<any> => {
  await apiClient.post<any>("/catalogos/codigosb", payload, {
    needAuth: false,
  });
};

export const putCodigoB = async (payload: ICatalogo): Promise<any> => {
  await apiClient.put<any>(`/catalogos/codigosb/${payload.id}`, payload, {
    needAuth: false,
  });
};

export const deleteCodigoB = async (id: number): Promise<any> => {
  await apiClient.delete<any>(`/catalogos/codigosb/${id}`, {
    needAuth: false,
  });
};

//* -------------------------------------------------------------------------- */
//*                                 CODIGOC                                   */
//* -------------------------------------------------------------------------- */
export const getCodigoC = async (): Promise<ICatalogo[]> => {
  const { data } = await apiClient.get<ICatalogo[]>("/catalogos/codigosc", {
    needAuth: false,
  });
  return data;
};

export const postCodigoC = async (payload: ICatalogo): Promise<any> => {
  await apiClient.post<any>("/catalogos/codigosc", payload, {
    needAuth: false,
  });
};

export const putCodigoC = async (payload: ICatalogo): Promise<any> => {
  await apiClient.put<any>(`/catalogos/codigosc/${payload.id}`, payload, {
    needAuth: false,
  });
};

export const deleteCodigoC = async (id: number): Promise<any> => {
  await apiClient.delete<any>(`/catalogos/codigosc/${id}`, {
    needAuth: false,
  });
};

//* -------------------------------------------------------------------------- */
//*                                 CATEGORIAS                                 */
//* -------------------------------------------------------------------------- */
export const getCategorias = async (): Promise<ICategoria[]> => {
  const { data } = await apiClient.get<ICategoria[]>("/catalogos/categorias", {
    needAuth: false,
  });
  return data;
};

export const postCategoria = async (payload: ICatalogo): Promise<any> => {
  await apiClient.post<any>("/catalogos/categorias", payload, {
    needAuth: false,
  });
};

export const putCategoria = async (payload: ICatalogo): Promise<any> => {
  await apiClient.put<any>(`/catalogos/categorias/${payload.id}`, payload, {
    needAuth: false,
  });
};

export const deleteCategoria = async (id: number): Promise<any> => {
  await apiClient.delete<any>(`/catalogos/categorias/${id}`, {
    needAuth: false,
  });
};

//* -------------------------------------------------------------------------- */
//*                             PUESTO DE VOTACION                             */
//* -------------------------------------------------------------------------- */
export const getPuestoVotacion = async (): Promise<ICatalogo[]> => {
  const { data } = await apiClient.get<ICatalogo[]>("/votacion/puestos", {
    needAuth: false,
  });
  return data;
};

export const postPuestoVotacion = async (payload: ICatalogo): Promise<any> => {
  await apiClient.post<any>("/votacion/puestos", payload, {
    needAuth: false,
  });
};

export const putPuestoVotacion = async (payload: ICatalogo): Promise<any> => {
  await apiClient.put<any>(`/votacion/puestos/${payload.id}`, payload, {
    needAuth: false,
  });
};

export const deletePuestoVotacion = async (id: number): Promise<any> => {
  await apiClient.delete<any>(`/votacion/puestos/${id}`, {
    needAuth: false,
  });
};

export const getMesasByPuesto = async (
  puestoId: number
): Promise<ICatalogo[]> => {
  const { data } = await apiClient.get<ICatalogo[]>(
    `/votacion/puestos/${puestoId}/mesas`,
    {
      needAuth: false,
    }
  );
  return data;
};

//* -------------------------------------------------------------------------- */
//*                                  PERSONAS                                  */
//* -------------------------------------------------------------------------- */

export const getLideres = async (): Promise<ICatalogo[]> => {
  const { data } = await apiClient.get<ICatalogo[]>("/catalogos/lideres", {
    needAuth: false,
  });
  return data;
};

export const getPersonas = async ({
  lider,
  lideres,
  puestoVotacion,
  mesaVotacion,
}: {
  lider?: number;
  lideres?: boolean;
  puestoVotacion?: number;
  mesaVotacion?: number;
}): Promise<IGetPersona[]> => {
  const { data } = await apiClient.get<IGetPersona[]>(
    `/personas?lider=${lider}&lideres=${lideres}&puestoVotacion=${puestoVotacion}&mesaVotacion=${mesaVotacion}`,
    {
      needAuth: true,
    }
  );
  return data;
};

export const getPersonaById = async (id: number): Promise<IGetPersonaById> => {
  const { data } = await apiClient.get<IGetPersonaById>(`/personas/${id}`, {
    needAuth: true,
  });
  return data;
};

export const postPersona = async (payload: any): Promise<any> => {
  await apiClient.post<any>("/personas", payload, {
    needAuth: true,
  });
};

export const putPersona = async (payload: any): Promise<any> => {
  await apiClient.put<any>(`/personas/${payload.id}`, payload, {
    needAuth: true,
  });
};

export const deletePersona = async (id: number): Promise<any> => {
  await apiClient.delete<any>(`/personas/${id}`, {
    needAuth: true,
  });
};

export const getLideresList = async (): Promise<any[]> => {
  const { data } = await apiClient.get<any>("/personas/lideres", {
    needAuth: true,
  });
  return data;
};
//* -------------------------------------------------------------------------- */
//*                                  USUARIOS                                  */
//* -------------------------------------------------------------------------- */
export const getUsuarios = async (): Promise<IGetUsers[]> => {
  const { data } = await apiClient.get<IGetUsers[]>("/auth/usuarios", {
    needAuth: false,
  });
  return data;
};

export const togglePutUsuario = async (id: string): Promise<any> => {
  await apiClient.put<any>(`/auth/usuario/${id}/toggle`, null, {
    needAuth: false,
  });
};

export const postUsuario = async (payload: any): Promise<any> => {
  await apiClient.post<any>("/auth/register", payload, {
    needAuth: false,
  });
};

export const putRecoveryUsuario = async (id: string): Promise<any> => {
  await apiClient.put<any>(`/auth/usuario/${id}/recovery`, null, {
    needAuth: false,
  });
};

export const putChangeRoleUsuario = async (
  id: string,
  newRole: string
): Promise<any> => {
  await apiClient.put<any>(
    `/auth/usuario/${id}/rol`,
    { userId: id, newRole },
    {
      needAuth: false,
    }
  );
};

/* -------------------------------------------------------------------------- */
/*                                  CONSULTAR                                 */
/* -------------------------------------------------------------------------- */
export const getConsultaPuestoVotacion =
  async (): Promise<IConsultaPuestoVotacion> => {
    const { data } = await apiClient.get<IConsultaPuestoVotacion>(
      "/votacion/puestos/consulta",
      {
        needAuth: false,
      }
    );
    return data;
  };

/* -------------------------------------------------------------------------- */
/*                                    Excel                                   */
/* -------------------------------------------------------------------------- */
export const getExportPersonas = async (payload: any): Promise<Blob> => {
  const { data } = await apiClient.get<Blob>(
    `/personas/excel?lider=${payload.lider}&lideres=${payload.lideres}&puestoVotacion=${payload.puestoVotacion}&mesaVotacion=${payload.mesaVotacion}`,
    {
      needAuth: true,
      responseType: "blob",
    }
  );
  return data;
};
