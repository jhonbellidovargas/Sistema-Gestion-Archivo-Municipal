import FormDocumento from '@components/FormDocumento';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import endPoints from '@services/api';

export default function Edit() {
  const [documento, setDocumento] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    // para que consulte si ya tenemos el id en el router
    if (!router.isReady) return;
    async function getDocumento() {
      const response = await axios.get(endPoints.documentos.getDocumento(id));
      setDocumento(response.data);
    }
    getDocumento();
  }, [router?.isReady]);

  return <FormDocumento documento={documento} />;
}
