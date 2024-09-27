import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Divider } from 'antd';
import DetailContactUbication from '../DetailContactUbication/DetailContactUbication';
import dayjs from 'dayjs';
import './detailDescriptionStyles.css';

function DetailDescription({ residenceType, spaceType, description, numberOfGuests, numberOfRooms, numberOfBeds, numberOfBathrooms, residenceTitle, residenceAddress, residenceUbication, wppNumber, daysMax, hostName, hostPhoto, reservesByUser }) {
  let { idAd } = useParams();
  console.log(reservesByUser);
  const [reserveIsWithinTheAllowedRange, setReserveIsWithinTheAllowedRange] = useState(false);

  // Filtra las reservas del huesped en una residencia en base a json que tiene todas las reservas del usuario
  const reservesInOneResidenceByGuest = (reservesByUser && reservesByUser.length !== 0)
    ? reservesByUser.filter((reserve) => reserve.id_residencia == idAd)
    : [];
  console.log(reservesInOneResidenceByGuest);

  // Verifica si el huesped tiene reservacion vigente en la residencia 
  const verifyGuestReservations = () => {
    /* console.log(reserveIsWithinTheAllowedRange.length!==0);
    console.log(reservesInOneResidenceByGuest.estado_reserva === "alquilado"); */
    if ((reservesInOneResidenceByGuest.length !== 0)) { // Verifica si se tiene al menos una reserva y que el estado sea alquilado
      const reserveDates = reservesInOneResidenceByGuest.map((reserve) => ({ // Guarda en un arreglo solo las fechas de inicio y fin de la reserva
        startReserveDate: dayjs(reserve.fecha_inicio_reserva),
        endReserveDate: dayjs(reserve.fecha_fin_reserva),
        stateReserve: reserve.estado_reserva,
      }));

      const highestReserve = reserveDates.reduce((prevDate, currentDate) => { // Encuentra la reserva con la fecha fin mas alta. Y devuelve fecha inicio y fecha fin de la reserva 
        return currentDate.endReserveDate.isAfter(prevDate.endReserveDate) ? currentDate : prevDate;
      }, {})
      
      // Determina si se debe mostrar el componente DetailContactUbication
      const reserveIsWithinRange = dayjs(highestReserve.startReserveDate).isAfter(dayjs(highestReserve.endReserveDate) || dayjs(highestReserve.startReserveDate).isSame(dayjs(highestReserve.endReserveDate))) || highestReserve.endReserveDate.isAfter(dayjs().add(7, "day")); // Determina si pasaron 7 dias en base a la fecha fin mas alta 
      setReserveIsWithinTheAllowedRange(highestReserve.stateReserve == "alquilado" && reserveIsWithinRange);
    }
    console.log(reserveIsWithinTheAllowedRange);
  }

  useEffect(() => {
    verifyGuestReservations();
  }, [reservesInOneResidenceByGuest]);
  return (
    <div>
      <Divider />
      <div className="detail-description-flex-container">
        <div className="description-sumary-complete">
          <div className="detail-description-summary">
            <div>
              <p>Lugar para quedarse en {residenceType} &bull; {spaceType} </p>
              <p>
                Máx. {numberOfGuests > 1 ? `${numberOfGuests} Huéspedes` : `${numberOfGuests} Huésped`} &bull; {daysMax > 1 ? `Máx. ${daysMax}  Noches` : `Máx. ${daysMax} Noche`} &bull; {numberOfRooms > 1 ? `${numberOfRooms} Habitaciones` : `${numberOfRooms} Habitación`} &bull; {numberOfBeds > 1 ? `${numberOfBeds} Camas` : `${numberOfBeds} Cama`} &bull; {numberOfBathrooms > 1 ? `${numberOfBathrooms} Baños` : `${numberOfBathrooms} Baño`}
              </p>
            </div>
          </div>
          <Divider />
          <div>
            <Avatar src={hostPhoto} size={{ xs: 55, sm: 55, md: 60, lg: 65, xl: 70, xxl: 83 }} /> <span style={{ fontWeight: 'bold', marginLeft: '20px' }}>Anfitrión: {hostName}</span>
          </div>
          <Divider />
          <div className="detail-description">
            <h3>Descripción</h3>
            <p>{description}</p>
          </div>
        </div>
        {
          reserveIsWithinTheAllowedRange === true
            ?
            (
              <>
                <DetailContactUbication
                  residenceAddress={residenceAddress}
                  residenceUbication={residenceUbication}
                  wppNumber={wppNumber}
                  residenceTitle={residenceTitle}
                />
              </>
            )
            : null
        }
      </div>
    </div>

  )
}

export default DetailDescription