import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailTitle from '../components/DetailTitle/DetailTitle';
import DetailImgs from '../components/DetailImgs/DetailImgs';
import DetailDescription from '../components/DetailDescription/DetailDescription';
import DetailOffers from '../components/DetailOffers/DetailOffers';
import DetailCheckInOut from '../components/DetailCheckInOut/DetailCheckInOut';
import DetailsForHostOnly from '../components/DetailsForHostOnly/DetailsForHostOnly';
import { getImagesByResidence, getOneResidence, getServicesByResidence } from '../services/residences';
import { Spin } from 'antd';


function MoreInfoMyAds() {
  let { idMyAd } = useParams();
  const [detailAdd, setDetailAdd] = useState([]);
  const [imgsResidence, setImgsResidence] = useState([]);
  const [detailServices, setDetailServices] = useState({});
  const [isRefresh, setIsRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  useEffect(() => {
    if (isRefresh) {
      getOneResidence(idMyAd).then((data) => setDetailAdd(data));
      setRefresh(false);
      setLoading(false);
    }
  }, [setRefresh, isRefresh, idMyAd]);

  useEffect(() => {
    if (isRefresh) {
      getServicesByResidence(idMyAd).then((data) => setDetailServices(data));
      setRefresh(false);
      setLoading(false);
    }
  }, [setRefresh, isRefresh, idMyAd]);

  useEffect(() => {
    if (isRefresh) {
      getImagesByResidence(idMyAd).then((data) => setImgsResidence(data))
      setRefresh(false);
      setLoading(false);
    }
  }, [setRefresh, isRefresh, idMyAd]);

  return (
    <Spin spinning={loading} tip="Cargando...">
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '1100px', maxWidth: '1100px' }}>
          <DetailTitle
            title={detailAdd.titulo_residencia}
            city={detailAdd.ciudad_residencia}
            country={detailAdd.pais_residencia}
          >

            <DetailsForHostOnly
              estadoResidencia={detailAdd.estado_residencia}
              direccionResidencia={detailAdd.direccion_residencia}
              precioResidencia={detailAdd.precio_residencia}
              fechaIni={detailAdd.fecha_inicio_publicado ? detailAdd.fecha_inicio_publicado.split('T')[0].toString() : 'Sin fecha'}
              fechaFin={detailAdd.fecha_fin_publicado ? detailAdd.fecha_fin_publicado.split('T')[0].toString() : 'Sin fecha'}
            />

          </DetailTitle>

          <DetailImgs
            images={imgsResidence}
            setRefresh={setRefresh}
          />

          <DetailDescription
            residenceType={detailAdd.tipo_residencia}
            spaceType={detailAdd.tipo_alojamiento}
            description={detailAdd.descripcion_residencia}
            numberOfGuests={detailAdd.huesped_max_residencia}
            numberOfRooms={detailAdd.habitacion_residencia}
            numberOfBeds={detailAdd.cama_residencia}
            numberOfBathrooms={detailAdd.banio_residencia}
            residenceAddress={detailAdd.direccion_residencia}
            residenceUbication={detailAdd.ubicacion_residencia}
            wppNumber={detailAdd.telefono_usuario}
            daysMax={detailAdd.dias_max_residencia}
            hostName={detailAdd.nombre_usuario}
            hostPhoto={detailAdd.foto_usuario}
          />

          <DetailOffers
            services={detailServices}
          />

          <DetailCheckInOut
            checkIn={detailAdd.check_in_residencia}
            checkOut={detailAdd.check_out_residencia}
          />

        </div>
      </div>
    </Spin>
  )
}

export default MoreInfoMyAds;