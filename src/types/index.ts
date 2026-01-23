export interface SelectOptions {
  value: number | string;
  label: string;
}

export interface ICatalogo {
  id: number;
  nombre: string;
}

/* ---------------------------------- Auth ---------------------------------- */
export interface IUser {
  token: string;
  nombre: string;
  apellido: string;
  cedula: string;
  rolName: string;
}

export interface IGetUsers {
  id: string;
  userName: string;
  nombre: string;
  apellido: string;
  rolName: string;
  inactivo: boolean;
}

/* -------------------------------- Categoria ------------------------------- */
export interface ICategoria extends ICatalogo {
  minimo: number;
  maximo: number;
  count: number;
  total: number;
}

/* --------------------------- Puesto de votacion --------------------------- */
export interface IPuestoVotacion extends ICatalogo {
  mesas: ICatalogo[];
}

/* --------------------------------- Persona -------------------------------- */
export interface IGetPersona {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  apodo: string | null;
  telefono: string;
  direccion: string;
  descripcion: string | null;
  isLider: boolean;
  barrio: {
    id: number;
    nombre: string;
  };
  codigoC: {
    id: number;
    nombre: string;
  };
  lenguas: {
    id: number;
    nombre: string;
  }[];
  liderId: number | null;
  mesaVotacion: {
    id: number;
    nombre: string;
    puestoVotacion: {
      id: number;
      nombre: string;
    };
  };
  codigosB: {
    id: number;
    nombre: string;
  }[];
  personasACargoIds: number[];
}

export interface IGetPersonaById {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  apodo: string | null;
  telefono: string;
  direccion: string;
  descripcion: string | null;
  familia: string;
  isLider: boolean;
  isCoordinador: boolean;
  barrioId: number;
  codigoCId: number;
  lenguasIds: number[];
  liderId: number | null;
  coordinadorId: number | null;
  mesaVotacion: {
    id: number;
    nombre: string;
    puestoVotacion: {
      id: number;
      nombre: string;
    };
  };
  codigosBIds: number[];
  personasACargoIds: number[];
  createdAt?: string;
  createdBy?: string;
  lastModifiedAt?: string;
  lastModifiedBy?: string;
}

/* --------------------------------- Lideres -------------------------------- */
export interface IGetLideres {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  apodo: string | null;
  telefono: string;
  direccion: string;
  descripcion: string | null;
  isLider: true;
  barrio: {
    id: number;
    nombre: string;
  };
  codigoC: {
    id: number;
    nombre: string;
  };
  lenguas: {
    id: number;
    nombre: string;
  }[];
  liderId: null;
  mesaVotacion: {
    id: number;
    nombre: string;
    puestoVotacion: {
      id: number;
      nombre: string;
    };
  };
  codigosB: {
    id: number;
    nombre: string;
  }[];
  personasACargoIds: number[];
  personasACargoCount: number;
}

/* ------------------------ Consulta puesto votacion ------------------------ */
export interface IConsultaPuestoVotacion {
  value: {
    puestosDeVotacion: {
      id: number;
      nombre: string;
      cantidadPersonas: number;
      cantidadMesas: number;
    }[];
    mesasDeVotacion: {
      id: number;
      nombre: string;
      cantidadPersonas: number;
      puestoVotacionId: number;
    }[];
  };
  succeeded: boolean;
  error: null | string;
}
