import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import DetailTitle from '../components/DetailTitle/DetailTitle';
import DetailImgs from '../components/DetailImgs/DetailImgs';
import DetailDescription from '../components/DetailDescription/DetailDescription';
import DetailOffers from '../components/DetailOffers/DetailOffers';
import DetailCheckInOut from '../components/DetailCheckInOut/DetailCheckInOut';
import { getImagesByResidence, getOneResidence, getServicesByResidence } from '../services/residences';
import DetailsForGuestOnly from '../components/DetailsForGuestOnly/DetailsForGuestOnly';
import AddReview from '../components/AddReview/AddReview';
import ReviewsList from '../components/ReviewsList/ReviewsList';
import { getAllReviewsByResidence } from '../services/reviews';
import { getAllRentalsByUser, getRentalsByResidence } from '../services/rentals';
import { useAuth } from '../contexts/authContext';


function MoreInfoAds() {
  let { idAd } = useParams();
  const [detailAdd, setDetailAdd] = useState([]);
  const [detailServices, setDetailServices] = useState({});
  const [imgsResidence, setImgsResidence] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const [reviewsResidence, setReviewsResidence] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [reservesByUser, setReservesByUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pauseDates, setPauseDates] = useState([]);
  const { user } = useAuth();

  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  useEffect(() => {
    if (isRefresh) {
      getOneResidence(idAd).then((data) => {
        setDetailAdd(data)
        setPauseDates(data.fechas_pausado)
      });
      setRefresh(false);
      setLoading(false);
    }
  }, [setRefresh, isRefresh, idAd]);

  useEffect(() => {
    if (isRefresh) {
      getServicesByResidence(idAd).then((data) => setDetailServices(data))
      setRefresh(false);
      setLoading(false);
    }
  }, [setRefresh, isRefresh, idAd]);

  useEffect(() => {
    if (isRefresh) {
      getImagesByResidence(idAd).then((data) => setImgsResidence(data))
      setRefresh(false);
      setLoading(false);
    }
  }, [setRefresh, isRefresh, idAd]);

  useEffect(() => {
    if (isRefresh) {
      getAllReviewsByResidence(idAd).then((data) => setReviewsResidence(data));
      setRefresh(false);
      setLoading(false);
    }
  }, [isRefresh, idAd])

  useEffect(() => {
    if (isRefresh) {
      getRentalsByResidence(idAd).then((data) => {
        setRentals(data);
        setRefresh(false);
        setLoading(false);
      })
    }
  }, [isRefresh, idAd])

  useEffect(() => {
    if (isRefresh) {
      getAllRentalsByUser(user.uid).then((data) => {
        setReservesByUser(data);
      })
      setRefresh(false);
      setLoading(false);
    }
  }, [isRefresh]);
  return (
    <Spin spinning={loading} tip="Cargando...">
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '1100px', maxWidth: '1100px' }}>
          <DetailTitle
            title={detailAdd.titulo_residencia}
            city={detailAdd.ciudad_residencia}
            country={detailAdd.pais_residencia}
          >
            <DetailsForGuestOnly
              numberMaxOfGuests={detailAdd.huesped_max_residencia}
              initialDate={detailAdd.fecha_inicio_publicado ? detailAdd.fecha_inicio_publicado.split('T')[0].toString() : null}
              finalDate={detailAdd.fecha_fin_publicado ? detailAdd.fecha_fin_publicado.split('T')[0].toString() : null}
              daysMax={detailAdd.dias_max_residencia - 1}
              isRefresh={isRefresh}
              setRefresh={setRefresh}
              priceResidence={detailAdd.precio_residencia}
              idAd={idAd}
              rentals={rentals}
              pauseDates={pauseDates}
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
            residenceTitle={detailAdd.titulo_residencia}
            residenceAddress={detailAdd.direccion_residencia}
            residenceUbication={detailAdd.ubicacion_residencia}
            wppNumber={detailAdd.telefono_usuario}
            daysMax={detailAdd.dias_max_residencia}
            hostName={detailAdd.nombre_usuario}
            hostPhoto={detailAdd.foto_usuario}
            reservesByUser={reservesByUser}
          />

          <DetailOffers
            services={detailServices}
          />

          <DetailCheckInOut
            checkIn={detailAdd.check_in_residencia}
            checkOut={detailAdd.check_out_residencia}
          />

          <ReviewsList
            detailReviews={reviewsResidence}
            averageRates={detailAdd.promedio}
          />
        </div>
      </div>
    </Spin>
  )
}

export default MoreInfoAds;