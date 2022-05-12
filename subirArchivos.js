import { useEffect, useState } from 'react';
import axios from 'axios';
import endPoints from '@services/api';
// import { ProductSchema } from 'schemas/ProductSchema';
import { addArchivo, updateArchivo } from '@services/api/archivos';
import archives from './archivos.json';
function subirArchivos() {
  const errorList = [];
  console.log(archives);

  const subir = async (archivo) => {
    if (archivo.ubicacion === '' || archivo.ubicacion === null) {
      archivo.ubicacion = 'Archivo municipal';
    }
    if (archivo.folio === '' || archivo.folio === null) {
      archivo.folio = 'Sin folio';
    } else {
      addArchivo(archivo)
        .then(() => {
          console.log('Archivo subido');
        })
        .catch((error) => {
          console.log(error);
          errorList.push(archivo);
        });
    }
  };

  const subirArchivos = () => {
    //subir(archives[0]);
    archives.forEach((archivo) => {
      subir(archivo);
    });
    console.log(errorList);
  };
  subirArchivos();
}
export { subirArchivos };
