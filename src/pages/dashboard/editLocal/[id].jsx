import FormLocal from '@components/FormLocal';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import endPoints from '@services/api';

export default function Edit() {
  const [local, setLocal] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    // para que consulte si ya tenemos el id en el router
    if (!router.isReady) return;
    async function getArchivo() {
      const response = await axios.get(endPoints.locales.getLocal(id));
      setLocal(response.data);
    }
    getArchivo();
  }, [router?.isReady]);

  return <FormLocal local={local} />;
}
