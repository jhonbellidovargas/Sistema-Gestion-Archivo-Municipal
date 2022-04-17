import FormArea from '@components/FormArea';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import endPoints from '@services/api';

export default function Edit() {
  const [area, setArea] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    // para que consulte si ya tenemos el id en el router
    if (!router.isReady) return;
    async function getArea() {
      const response = await axios.get(endPoints.areas.getArea(id));
      setArea(response.data);
    }
    getArea();
  }, [router?.isReady]);

  return <FormArea area={area} />;
}
