import React, { useState } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import ReserveModal from '../ReserveModal/ReserveModal';
import './detailsForGuestOnlyStyles.css';

function DetailsForGuestOnly({ numberMaxOfGuests, initialDate, finalDate, daysMax, isRefresh, setRefresh, priceResidence, idAd, rentals, pauseDates }) {
  const [reservationModal, setReservationModal] = useState(false);
  const openReservationModal = () => {
    setReservationModal(true);
  };

  const closeReservationModal = () => {
    setReservationModal(false);
  };



  return (
    <div>
      <Button className="button-detail-for-guest-only" type='primary' onClick={() => openReservationModal()}> <FontAwesomeIcon icon={faCalendarCheck} /> <span>{`Reserva`}</span></Button>
      <ReserveModal
        numberMaxOfGuests={numberMaxOfGuests}
        reservationModal={reservationModal}
        closeReservationModal={closeReservationModal}
        initialDate={initialDate}
        finalDate={finalDate}
        daysMax={daysMax}
        isRefresh={isRefresh}
        setRefresh={setRefresh}
        priceResidence={priceResidence}
        idAd={idAd}
        rentals={rentals}
        pauseDates={pauseDates}
      />
    </div>
  )
}

export default DetailsForGuestOnly;