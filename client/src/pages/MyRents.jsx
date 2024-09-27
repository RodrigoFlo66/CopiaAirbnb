import React, { useState, useEffect } from 'react';
import Rents from '../components/MyRents/Rents';
import { getAllMyRentalsByUserHost } from '../services/rentals';
import { useAuth } from '../contexts/authContext';

function MyRents() {
  const [isRefresh, setIsRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [reservas, setReservas] = useState([]);
  const { user } = useAuth();
  const setRefresh = (estado_reserva) => {
    setIsRefresh(estado_reserva);
  }

  useEffect(() => {
    if (isRefresh) {
      getAllMyRentalsByUserHost(user.uid).then((data) => {
        setReservas(data);
      })
      setRefresh(false);
      setLoading(false);
    }
  }, [isRefresh]);
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Gestiona tus Residencias Reservadas</h2>
      <Rents
        loading={loading}
        setRefresh={setRefresh}
        reservas={reservas}
      />
    </div>
  );
}

export default MyRents;