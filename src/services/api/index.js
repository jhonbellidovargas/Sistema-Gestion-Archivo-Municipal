const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  },
  trabajadores: {
    getTrabajador: (id) => `${API}/api/${VERSION}/trabajadores/${id}/`,
    allTrabajadores: `${API}/api/${VERSION}/trabajadores/`,
    addTrabajador: `${API}/api/${VERSION}/trabajadores`,
    updateTrabajador: (id) => `${API}/api/${VERSION}/trabajadores/${id}/`,
    deleteTrabajador: (id) => `${API}/api/${VERSION}/trabajadores/${id}/`,
  },
  usuarios: {
    getUsuario: (id) => `${API}/api/${VERSION}/usuarios/${id}/`,
    allUsuarios: `${API}/api/${VERSION}/usuarios/`,
    addUsuario: `${API}/api/${VERSION}/usuarios`,
    updateUsuario: (id) => `${API}/api/${VERSION}/usuarios/${id}/`,
    deleteUsuario: (id) => `${API}/api/${VERSION}/usuarios/${id}/`,
  },
  prestamos: {
    getPrestamo: (id) => `${API}/api/${VERSION}/prestamos/${id}/`,
    allPrestamos: `${API}/api/${VERSION}/prestamos/`,
    addPrestamo: `${API}/api/${VERSION}/prestamos`,
    updatePrestamo: (id) => `${API}/api/${VERSION}/prestamos/${id}/`,
    deletePrestamo: (id) => `${API}/api/${VERSION}/prestamos/${id}/`,
  },
  locales: {
    getLocal: (id) => `${API}/api/${VERSION}/locales/${id}/`,
    allLocales: `${API}/api/${VERSION}/locales/`,
    addLocal: `${API}/api/${VERSION}/locales`,
    updateLocal: (id) => `${API}/api/${VERSION}/locales/${id}/`,
    deleteLocal: (id) => `${API}/api/${VERSION}/locales/${id}/`,
  },
  gerencias: {
    getGerencia: (id) => `${API}/api/${VERSION}/gerencias/${id}/`,
    allGerencias: `${API}/api/${VERSION}/gerencias/`,
    addGerencia: `${API}/api/${VERSION}/gerencias`,
    updateGerencia: (id) => `${API}/api/${VERSION}/gerencias/${id}/`,
    deleteGerencia: (id) => `${API}/api/${VERSION}/gerencias/${id}/`,
  },
  areas: {
    getArea: (id) => `${API}/api/${VERSION}/areas/${id}/`,
    allAreas: `${API}/api/${VERSION}/areas/`,
    addArea: `${API}/api/${VERSION}/areas`,
    updateArea: (id) => `${API}/api/${VERSION}/areas/${id}/`,
    deleteArea: (id) => `${API}/api/${VERSION}/areas/${id}/`,
  },
  estados: {
    getEstado: (id) => `${API}/api/${VERSION}/estados/${id}/`,
    allEstados: `${API}/api/${VERSION}/estados/`,
    addEstado: `${API}/api/${VERSION}/estados`,
    updateEstado: (id) => `${API}/api/${VERSION}/estados/${id}/`,
    deleteEstado: (id) => `${API}/api/${VERSION}/estados/${id}/`,
  },
  tipos: {
    getTipo: (id) => `${API}/api/${VERSION}/tipos/${id}/`,
    allTipos: `${API}/api/${VERSION}/tipos/`,
    addTipo: `${API}/api/${VERSION}/tipos`,
    updateTipo: (id) => `${API}/api/${VERSION}/tipos/${id}/`,
    deleteTipo: (id) => `${API}/api/${VERSION}/tipos/${id}/`,
  },
  archivos: {
    getArchivo: (id) => `${API}/api/${VERSION}/archivos/${id}/`,
    allArchivos: `${API}/api/${VERSION}/archivos/`,
    addArchivo: `${API}/api/${VERSION}/archivos`,
    updateArchivo: (id) => `${API}/api/${VERSION}/archivos/${id}/`,
    deleteArchivo: (id) => `${API}/api/${VERSION}/archivos/${id}/`,
  },
  files: {
    addImage: `${API}/api/${VERSION}/files/upload/`,
  },
};

export default endPoints;
