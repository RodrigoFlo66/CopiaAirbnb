import React, { useEffect, useState } from 'react';
import { Empty, List, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import GuestCard from '../components/GuestCard/GuestCard';
import { getAllResidences } from '../services/residences';
import AdsFilter from '../components/AdsFilter/AdsFilter';

function Home() {
  const [residences, setResidences] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const [filteredResidences, setFilteredResidences] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  useEffect(() => {
    if (isRefresh) {
      getAllResidences().then((data) => {
        setResidences(data);
        setFilteredResidences(data);
        const uniqueCountries = [...new Set(data.map(residence => residence.pais_residencia))];
        setCountries(uniqueCountries);
      })
      setRefresh(false);
      setLoading(false);
    }
  }, [setRefresh, isRefresh]);

  const customEmptyMessage = {
    emptyText: (
      <>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
          }}
          description={
            <span>
              No existen Lugares
            </span>
          }
        >
        </Empty>
      </>),
  };

  return (
    <Spin spinning={loading} tip="Cargando...">
      <AdsFilter
        residences={residences}
        filteredResidences={filteredResidences}
        setFilteredResidences={setFilteredResidences}
        countries={countries}
        setCountries={setCountries}
      />

      <List
        grid={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        pagination={{
          onChange: page => {
            console.log(page);
          }, pageSize: 12,
        }}
        locale={customEmptyMessage}
        dataSource={filteredResidences.filter(residence => residence.estado_residencia === "Publicado" || residence.estado_residencia === "Alquilado" || residence.estado_residencia === "Pausado")}
        renderItem={(residence) => (
          <List.Item
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }
            }
          >
            <GuestCard
              idResidencia={residence.id_residencia}
              imagen={residence.imagenes[0]}
              titulo={residence.titulo_residencia}
              ciudad={residence.ciudad_residencia}
              pais={residence.pais_residencia}
              fechaIni={residence.fecha_inicio_publicado ? residence.fecha_inicio_publicado.split('T')[0].toString() : 'Sin fecha'}
              fechaFin={residence.fecha_fin_publicado ? residence.fecha_fin_publicado.split('T')[0].toString() : 'Sin fecha'}
              precio={residence.precio_residencia}
              promedio={Number(residence.promedio).toFixed(1)}
              setRefresh={setRefresh}
            />
          </List.Item>
        )}
      />
    </Spin>
  );
};

export default Home;