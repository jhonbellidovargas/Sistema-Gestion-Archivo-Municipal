import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import endPoints from '@services/api';
import FormTrabajador from '@components/FormTrabajador';

export default function Edit() {
  const [trabajador, setTrabajador] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    console.log(id);
    // para que consulte si ya tenemos el id en el router
    if (!router.isReady) return;
    async function getArchivo() {
      console.log('getArchivo', id);
      const response = await axios.get(endPoints.trabajadores.getTrabajador(id));
      console.log(response);
      setTrabajador(response.data);
      console.log(response.data);
    }
    getArchivo();
  }, [router?.isReady]);

  return <FormTrabajador trabajador={trabajador} />;
}
