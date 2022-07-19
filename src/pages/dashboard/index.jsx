import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import endPoints from '@services/api';
import { Chart } from '@common/Chart';
import { Chart2 } from '@common/Chart2';
import { Chart3 } from '@common/Chart3';
import { Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ReportCard from '@components/ReportCard';
import Loading from '@common/Loading';
import axios from 'axios';

import BookTwoTone from '@material-ui/icons/BookTwoTone';
import DescriptionTwoTone from '@material-ui/icons/DescriptionTwoTone';
import ThumbUpAltTwoTone from '@material-ui/icons/ThumbUpAltTwoTone';
import CalendarTodayTwoTone from '@material-ui/icons/CalendarTodayTwoTone';

export default function Dashboard() {
  const router = useRouter();
  const [archivos, setArchivos] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prestamos, setPrestamos] = useState([]);
  const colorList = ['#50AF95', '#16ad10', '#2a71d0', '#c0c0c0', '#f3ba2f', '#713b91', '#6ab1d1', '#e7322c', '#cf3374', '#2b1bb6'];
  useEffect(() => {
    async function getArchivos() {
      const response = await axios.get(endPoints.archivos.allArchivos);
      setArchivos(response.data);
    }
    async function getPrestamos() {
      const response = await axios.get(endPoints.prestamos.allPrestamos);
      setPrestamos(response.data);
    }
    async function getDocumentos() {
      const response = await axios.get(endPoints.documentos.allDocumentos);
      setDocumentos(response.data);
    }
    try {
      getArchivos();
      getPrestamos();
      getDocumentos();
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  }, []);

  const areas = archivos?.map((archivo) => archivo.area);
  const tipos = archivos?.map((archivo) => archivo.tipo);
  const areasCount = areas?.map((area) => area.nombre);
  const documentosCount = documentos.length;
  const tiposCount = tipos?.map((tipo) => tipo.nombre);
  const añosCount = archivos?.map((archivo) => archivo.año);
  const fechasCount = prestamos?.map((prestamo) => prestamo.fechaPrestamo.split('-')[0]);
  //console.log(fechasCount);

  const countOccurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
  const tiposCountLabel = Object.keys(countOccurrences(tiposCount));
  const tiposCountData = Object.values(countOccurrences(tiposCount));
  const añosCountLabel = Object.keys(countOccurrences(añosCount));
  const añosCountData = Object.values(countOccurrences(añosCount));
  const fechasCountLabel = Object.keys(countOccurrences(fechasCount));
  const fechasCountData = Object.values(countOccurrences(fechasCount));

  const data = {
    datasets: [
      {
        label: 'Documentos por área',
        data: countOccurrences(areasCount),
        borderWidth: 2,
        backgroundColor: colorList,
      },
    ],
  };
  const data3 = {
    // genera los ultimos años
    labels: añosCountLabel,
    datasets: [
      {
        label: 'Archivos por año',
        data: añosCountData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  const data4 = {
    labels: tiposCountLabel,
    datasets: [
      {
        label: 'Archivos por tipo',
        data: tiposCountData,
        borderWidth: 2,
        backgroundColor: colorList.slice(2, 10),
      },
    ],
  };
  const data5 = {
    // genera los ultimos años
    labels: fechasCountLabel,
    datasets: [
      {
        label: 'Prestamos por año',
        data: fechasCountData,
        fill: false,
        borderColor: 'rgb(18, 12, 116)',
        tension: 0.1,
      },
    ],
  };
  const gridSpacing = 3;
  const theme = useTheme();

  const archivosTotales = archivos?.length;
  const archivosDelAnio = archivos?.filter((archivo) => archivo.año === new Date().getFullYear()).length;
  const prestamosTotales = prestamos?.length;
  // comparamos la fecha actual con la fecha de devolucion en una lista de prestamos
  const prestamosVencidos = prestamos?.filter((prestamo) => {
    // si el estado es devuelto, no se cuenta
    if (prestamo.estado === 'devuelto') {
      return false;
    } else {
      const fechaActual = new Date();
      const fechaDevolucion = new Date(prestamo.fechaDevolucion);
      return fechaActual > fechaDevolucion;
    }
  });
  const prestamosVencidosTotales = prestamosVencidos?.length;
  console.log(prestamosVencidosTotales);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid
              item
              lg={3}
              sm={6}
              xs={12}
              onClick={() => {
                router.push('dashboard/archivos');
              }}
            >
              <ReportCard
                primary={archivosTotales}
                secondary="Archivos Registrados"
                color={theme.palette.warning.main}
                footerData="En total"
                iconPrimary={BookTwoTone}
                iconSecondary={DescriptionTwoTone}
              />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xs={12}
              onClick={() => {
                router.push('dashboard/prestamos');
              }}
            >
              <ReportCard
                primary={prestamosVencidosTotales}
                secondary="Prestamos vencidos"
                color={theme.palette.error.main}
                footerData="Requiere comunicación con trabajador"
                iconPrimary={CalendarTodayTwoTone}
              />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xs={12}
              onClick={() => {
                router.push('dashboard/prestamos');
              }}
            >
              <ReportCard
                primary={prestamosTotales}
                secondary="Prestamos en Total"
                color={theme.palette.success.main}
                footerData="Apartir del funcionamiento del sistema"
                iconPrimary={DescriptionTwoTone}
              />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xs={12}
              onClick={() => {
                router.push('dashboard/documentos');
              }}
            >
              <ReportCard primary={documentosCount} secondary="Documentos" color={theme.palette.primary.main} footerData="En total" iconPrimary={DescriptionTwoTone} />
            </Grid>
          </Grid>
        </Grid>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-5">
            <h3 className="text-center text-2xl font-bold mb-4 text-blue-900">Archivos según Area</h3>
            <Chart className="mb-8 mt-2" chartData={data} />
          </div>
          <div className="flex-1 p-5">
            <h3 className="text-center text-2xl font-bold mb-4 text-blue-900">Archivos según Año</h3>
            <Chart3 className="mb-8 mt-2" chartData={data3} />
          </div>
        </div>
        <div className="mt-15 flex flex-col lg:flex-row">
          <div className="flex-1 p-5">
            <h3 className="text-center text-2xl font-bold mb-4 text-blue-900">Archivo según tipo</h3>
            <Chart2 className="mb-8 mt-2" chartData={data4} />
          </div>
          <div className="flex-1 p-5">
            <h3 className="text-center text-2xl font-bold mb-4 text-blue-900">Prestamos según Año</h3>
            <Chart3 className="mb-8 mt-2" chartData={data5} />
          </div>
        </div>
      </>
    );
  }
}
