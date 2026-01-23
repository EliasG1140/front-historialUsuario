import {
  deleteLengua,
  getLenguas,
  postLengua,
  putLengua,
  getBarrios,
  postBarrio,
  putBarrio,
  deleteBarrio,
  getCodigoB,
  postCodigoB,
  putCodigoB,
  deleteCodigoB,
  getCodigoC,
  postCodigoC,
  putCodigoC,
  deleteCodigoC,
  getCategorias,
  postCategoria,
  putCategoria,
  deleteCategoria,
  QUERY_KEYS,
  queryClient,
  getCategorizacion,
  getPuestoVotacion,
  putPuestoVotacion,
  postPuestoVotacion,
  deletePuestoVotacion,
  getMesasByPuesto,
  postPersona,
  putPersona,
  deletePersona,
  getLideres,
  getPersonas,
  getPersonaById,
  getUsuarios,
  postUsuario,
  togglePutUsuario,
  putRecoveryUsuario,
  putChangeRoleUsuario,
  getLideresList,
  getConsultaPuestoVotacion,
  putPassword,
  isUserBlocked,
  getCoordinadores,
  getCoordinadoresList,
} from "@api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notify } from "@utils";

export const useGet = (
  puestoId?: number,
  personaFilters?: {
    lider?: number | null;
    lideres?: boolean | null;
    puestoVotacion?: number | null;
    mesaVotacion?: number | null;
    codigoB?: number | null;
    codigoC?: number | null;
    categoria?: number | null;
    coordinador?: number | null;
    coordinadores?: boolean | null;
  },
) => {
  /* ---------------------------------- Auth ---------------------------------- */
  const { data: isBlocked } = useQuery({
    queryKey: [QUERY_KEYS.GET.IS_USER_BLOCKED],
    queryFn: () => isUserBlocked(),
    staleTime: 0,
    refetchInterval: 3000,
  });

  /* ---------------------------------- Home ---------------------------------- */
  const { data: categorizacion } = useQuery({
    queryKey: [QUERY_KEYS.GET.CATEGORIZACION],
    queryFn: () => getCategorizacion(),
    staleTime: 0,
  });

  /* --------------------------------- Lengua --------------------------------- */
  const { data: lenguas } = useQuery({
    queryKey: [QUERY_KEYS.GET.LENGUAS],
    queryFn: getLenguas,
    staleTime: 0,
  });

  const { mutateAsync: updateLengua } = useMutation({
    mutationFn: (payload: any) => putLengua(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.LENGUAS] });
    },
  });

  const { mutateAsync: addLengua } = useMutation({
    mutationFn: (payload: any) => postLengua(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.LENGUAS] });
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al agregar lengua");
    },
  });

  const { mutateAsync: removeLengua } = useMutation({
    mutationFn: (id: number) => deleteLengua(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.LENGUAS] });
      notify.success("Lengua eliminada correctamente");
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al eliminar lengua");
    },
  });

  /* --------------------------------- Barrios -------------------------------- */
  const { data: barrios } = useQuery({
    queryKey: [QUERY_KEYS.GET.BARRIOS],
    queryFn: getBarrios,
    staleTime: 0,
  });

  const { mutateAsync: updateBarrio } = useMutation({
    mutationFn: (payload: any) => putBarrio(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.BARRIOS] });
    },
  });

  const { mutateAsync: addBarrio } = useMutation({
    mutationFn: (payload: any) => postBarrio(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.BARRIOS] });
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al agregar barrio");
    },
  });

  const { mutateAsync: removeBarrio } = useMutation({
    mutationFn: (id: number) => deleteBarrio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.BARRIOS] });
      notify.success("Barrio eliminado correctamente");
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al eliminar barrio");
    },
  });

  /* --------------------------------- CodigoB -------------------------------- */
  const { data: codigosB } = useQuery({
    queryKey: [QUERY_KEYS.GET.CODIGOB],
    queryFn: getCodigoB,
    staleTime: 0,
  });

  const { mutateAsync: updateCodigoB } = useMutation({
    mutationFn: (payload: any) => putCodigoB(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.CODIGOB] });
    },
  });

  const { mutateAsync: addCodigoB } = useMutation({
    mutationFn: (payload: any) => postCodigoB(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.CODIGOB] });
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al agregar código B");
    },
  });

  const { mutateAsync: removeCodigoB } = useMutation({
    mutationFn: (id: number) => deleteCodigoB(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.CODIGOB] });
      notify.success("Código B eliminado correctamente");
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al eliminar código B");
    },
  });

  /* --------------------------------- CodigoC -------------------------------- */
  const { data: codigosC } = useQuery({
    queryKey: [QUERY_KEYS.GET.CODIGOC],
    queryFn: getCodigoC,
    staleTime: 0,
  });

  const { mutateAsync: updateCodigoC } = useMutation({
    mutationFn: (payload: any) => putCodigoC(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.CODIGOC] });
    },
  });

  const { mutateAsync: addCodigoC } = useMutation({
    mutationFn: (payload: any) => postCodigoC(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.CODIGOC] });
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al agregar código C");
    },
  });

  const { mutateAsync: removeCodigoC } = useMutation({
    mutationFn: (id: number) => deleteCodigoC(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.CODIGOC] });
      notify.success("Código C eliminado correctamente");
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al eliminar código C");
    },
  });

  /* --------------------------------- Categoria -------------------------------- */
  const { data: categorias } = useQuery({
    queryKey: [QUERY_KEYS.GET.CATEGORIAS],
    queryFn: getCategorias,
    staleTime: 0,
  });

  const { mutateAsync: updateCategoria } = useMutation({
    mutationFn: (payload: any) => putCategoria(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.CATEGORIAS] });
    },
  });

  const { mutateAsync: addCategoria } = useMutation({
    mutationFn: (payload: any) => postCategoria(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.CATEGORIAS] });
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al agregar categoría");
    },
  });

  const { mutateAsync: removeCategoria } = useMutation({
    mutationFn: (id: number) => deleteCategoria(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET.CATEGORIAS] });
      notify.success("Categoría eliminada correctamente");
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al eliminar categoría");
    },
  });

  /* --------------------------- Puesto de votacion --------------------------- */
  const { data: puestovotacion } = useQuery({
    queryKey: [QUERY_KEYS.GET.PUESTOVOTACION],
    queryFn: getPuestoVotacion,
    staleTime: 0,
  });

  const { mutateAsync: updatePuestoVotacion } = useMutation({
    mutationFn: (payload: any) => putPuestoVotacion(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.PUESTOVOTACION],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.CONSULTA_PUESTO_VOTACION],
      });
      notify.success("Puesto de votación actualizado correctamente");
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al actualizar puesto de votación");
    },
  });

  const { mutateAsync: addPuestoVotacion } = useMutation({
    mutationFn: (payload: any) => postPuestoVotacion(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.PUESTOVOTACION],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.CONSULTA_PUESTO_VOTACION],
      });
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al agregar puesto de votación");
    },
  });

  const { mutateAsync: removePuestoVotacion } = useMutation({
    mutationFn: (id: number) => deletePuestoVotacion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.PUESTOVOTACION],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.CONSULTA_PUESTO_VOTACION],
      });
      notify.success("Puesto de votación eliminado correctamente");
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al eliminar puesto de votación");
    },
  });

  const { data: mesasVotacion } = useQuery({
    queryKey: [QUERY_KEYS.GET.PUESTOVOTACION, puestoId, "mesas"],
    queryFn: () => getMesasByPuesto(puestoId!),
    staleTime: 0,
    enabled: !!puestoId,
  });

  /* --------------------------------- Persona -------------------------------- */
  const { data: personas } = useQuery({
    queryKey: [QUERY_KEYS.GET.PERSONAS, personaFilters],
    queryFn: () =>
      getPersonas({
        lider: personaFilters?.lider ?? undefined,
        lideres: personaFilters?.lideres ?? undefined,
        puestoVotacion: personaFilters?.puestoVotacion ?? undefined,
        mesaVotacion: personaFilters?.mesaVotacion ?? undefined,
        codigoB: personaFilters?.codigoB ?? undefined,
        codigoC: personaFilters?.codigoC ?? undefined,
        categoria: personaFilters?.categoria ?? undefined,
        coordinador: personaFilters?.coordinador ?? undefined,
        coordinadores: personaFilters?.coordinadores ?? undefined,
      }),
    staleTime: 0,
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  });

  const { mutateAsync: personaById } = useMutation({
    mutationFn: (id: number) => getPersonaById(id),
  });

  const { mutateAsync: addPersona } = useMutation({
    mutationFn: (payload: any) => postPersona(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.PERSONAS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.LIDERES],
      });
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al agregar persona");
    },
  });

  const { mutateAsync: updatePersona } = useMutation({
    mutationFn: (payload: any) => putPersona(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.PERSONAS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.LIDERES],
      });
    },
  });

  const { mutateAsync: removePersona } = useMutation({
    mutationFn: (id: number) => deletePersona(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.PERSONAS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.LIDERES],
      });
      notify.success("Persona eliminada correctamente");
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al eliminar persona");
    },
  });

  /* --------------------------------- Lideres -------------------------------- */
  const { data: lideres } = useQuery({
    queryKey: [QUERY_KEYS.GET.LIDERES],
    queryFn: getLideres,
    staleTime: 0,
  });

  const { data: coordinadores } = useQuery({
    queryKey: [QUERY_KEYS.GET.COORDINADORES],
    queryFn: getCoordinadores,
    staleTime: 0,
  });

  /* -------------------------------- Usuarios -------------------------------- */
  const { data: usuarios } = useQuery({
    queryKey: [QUERY_KEYS.GET.USUARIOS],
    queryFn: () => getUsuarios(),
    staleTime: 0,
  });

  const { mutateAsync: restorePassword } = useMutation({
    mutationFn: (payload: any) => putPassword(payload),
    onSuccess: () => {
      notify.success("Contraseña actualizada correctamente");
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al actualizar contraseña");
    },
  });

  const { mutateAsync: addUsuario } = useMutation({
    mutationFn: (payload: any) => postUsuario(payload),
    onSuccess: ({ data }) => {
      const { password } = data as any;
      notify.openNotification(
        "success",
        "Usuario agregado",
        `La contraseña es: ${password} y se ha copiado al portapapeles.`,
      );
      navigator.clipboard.writeText(password);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.USUARIOS],
      });
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al agregar usuario");
    },
  });

  const { mutateAsync: toggleUsuario } = useMutation({
    mutationFn: (payload: any) => togglePutUsuario(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.USUARIOS],
      });
      notify.success("Usuario actualizado correctamente");
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al actualizar usuario");
    },
  });

  const { mutateAsync: recoveryUsuario } = useMutation({
    mutationFn: (id: string) => putRecoveryUsuario(id),
    onSuccess: ({ data }) => {
      const { newPassword } = data as any;
      notify.openNotification(
        "success",
        "Contraseña recuperada",
        `Su nueva contraseña es: ${newPassword} y se ha copiado al portapapeles.`,
      );
      navigator.clipboard.writeText(newPassword);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.USUARIOS],
      });
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al recuperar usuario");
    },
  });

  const { mutateAsync: changeRoleUsuario } = useMutation({
    mutationFn: (payload: any) =>
      putChangeRoleUsuario(payload.id, payload.roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET.USUARIOS],
      });
    },
    onError: (error: any) => {
      const {
        response: {
          data: { title },
        },
      } = error;
      notify.error(title ?? "Error al cambiar rol de usuario");
    },
  });

  const { data: listLideres } = useQuery({
    queryKey: [QUERY_KEYS.GET.LIDERES_LIST],
    queryFn: () => getLideresList(),
    staleTime: 0,
  });

  const { data: listCoordinadores } = useQuery({
    queryKey: [QUERY_KEYS.GET.COORDINADORES_LIST],
    queryFn: () => getCoordinadoresList(),
    staleTime: 0,
  });

  /* -------------------------------------------------------------------------- */
  /*                                  Consulta                                  */
  /* -------------------------------------------------------------------------- */
  const { data: consultaPuestoVotacion } = useQuery({
    queryKey: [QUERY_KEYS.GET.CONSULTA_PUESTO_VOTACION],
    queryFn: () => getConsultaPuestoVotacion(),
    staleTime: 0,
  });

  return {
    categorizacion,
    lenguas,
    updateLengua,
    addLengua,
    removeLengua,
    barrios,
    updateBarrio,
    addBarrio,
    removeBarrio,
    codigosB,
    updateCodigoB,
    addCodigoB,
    removeCodigoB,
    codigosC,
    updateCodigoC,
    addCodigoC,
    removeCodigoC,
    categorias,
    updateCategoria,
    addCategoria,
    removeCategoria,
    puestovotacion,
    updatePuestoVotacion,
    addPuestoVotacion,
    removePuestoVotacion,
    mesasVotacion,
    addPersona,
    updatePersona,
    removePersona,
    lideres,
    personas,
    personaById,
    usuarios,
    addUsuario,
    toggleUsuario,
    recoveryUsuario,
    changeRoleUsuario,
    restorePassword,
    listLideres,
    consultaPuestoVotacion,
    isBlocked,
    coordinadores,
    listCoordinadores
  };
};
