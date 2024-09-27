import React, { useState } from 'react';
import { Modal, Form, DatePicker, Select, Button, Divider, Grid } from 'antd';
import dayjs from 'dayjs';
import ModalQRCode from '../ModalQRCode/ModalQRCode';
import './reserveModalStyles.css';

function ReserveModal({ reservationModal, closeReservationModal, numberMaxOfGuests, initialDate, finalDate, daysMax, isRefresh, setRefresh, priceResidence, idAd, rentals, pauseDates }) {
  const { RangePicker } = DatePicker;
  const [isVisibleQRCode, setIsVisibleQRCode] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [bodyReserve, setBodyReserve] = useState({
    precio: 0,
    fechaIni: null,
    fechaFin: null,
    huespedes: 0
  });

  const openModalQR = () => {
    setIsVisibleQRCode(true);
  }

  const closeModalQR = () => {
    setIsVisibleQRCode(false);
  }

  const handleRangeDateChange = (dates) => {
    setBodyReserve((prevBodyReserve) => {
      const updatedBodyReserve = {
        ...prevBodyReserve,
        fechaIni: dayjs(dates[0], 'YYYY-MM-DD'),
        fechaFin: dayjs(dates[1], 'YYYY-MM-DD')
      }
      return updatedBodyReserve;
    })
    setSelectedStartDate(dates[0]);
    setSelectedEndDate(dates[1]);
  };


  const isDateDisabled = (current) => { //current es un dia del calendario, esta funcion se ejecuta por cada dia y evalua si debe estar deshabilitado
    const startDate = dayjs(initialDate);
    const endDate = dayjs(finalDate).add(1, 'day'); // Se incrementa un dia para asegurar que la fecha final este incluida o habilitada
    const actualDate = dayjs();

    // booleano que determina si el current esta dentro de algun rango de reserva
    const isWithinReservationRange = rentals.some((rental) => { // Verifica si al menos un elemento del arreglo de objetos rentals cumple con cierta condicion
      const startPrevRental = dayjs(rental.fecha_inicio_reserva);
      const endPrevRental = dayjs(rental.fecha_fin_reserva).add(1, 'day'); // Se incrementa un dia para asegurar que la fecha final este incluida

      return (current.isAfter(startPrevRental) || current.isSame(startPrevRental)) && (current.isBefore(endPrevRental) || current.isSame(endPrevRental)); // Retorna true si la fecha_inicio_reserva se encuentra antes  o igual que el current y la fecha_fin_reserva se encuentra despues o igual que el current
    });

    const isWithinPauseRange = pauseDates.some((pause) => { // Verifica si al menos un elemento del arreglo de objetos rentals cumple con cierta condicion
      
      if(pause[0] && pause[1]){
        const startPrevPause = dayjs(pause[0]);
        const endPrevPause = dayjs(pause[1]).add(1, 'day'); // Se incrementa un dia para asegurar que la fecha final este incluida
        
        return (current.isAfter(startPrevPause) || current.isSame(startPrevPause)) && (current.isBefore(endPrevPause) || current.isSame(endPrevPause)); // Retorna true si la fecha_inicio_reserva se encuentra antes  o igual que el current y la fecha_fin_reserva se encuentra despues o igual que el current
      }
      
    });

    // Entra al condicional cuando el usuario selecciona una fecha de inicio 
    if (selectedStartDate) {
      const maxEndDate = dayjs(selectedStartDate).add(daysMax, 'day'); // La fecha fin  que el usuario tenga habilitado dentro el rango del anuncio una vez seleccionado una fecha inicio será determinada en base a la fecha seleccionada más el numero maximo de dias
      const nextReservation = rentals.reduce((accumulator, rental) => { // Devuelve una fecha de inicio de la reservacion mas cercana, el reduce acumula segun la condicion
        const startRental = dayjs(rental.fecha_inicio_reserva);
        if (startRental.isAfter(selectedStartDate) && startRental.isBefore(accumulator)) {
          return startRental;
        }
        return accumulator;
      }, dayjs().add(1000, 'years'));// Valor inicial del acumulador, que representa una fecha futura muy lejana, se utiliza para garantizar que cualquier fecha futura sea considerada mas cercana que la fecha inicial ficticia

      const nextPause = pauseDates.reduce((accumulator, pause) => {
        const startPause = dayjs(pause[0]);
        if (startPause.isAfter(selectedStartDate) && startPause.isBefore(accumulator)) {
          return startPause;
        }
        return accumulator;
      }, dayjs().add(1000, 'years'));


      const limitDate = nextReservation.isBefore(maxEndDate) ? nextReservation : maxEndDate; // El limite de la fecha fin cuando se selecciona una fecha de inicio será la fecha inicio de la reserva mas cercana si la fecha maxima esta antes de la reservacion mas cercana, caso contrario el limite de la fecha fin será la fecha maxima que el usuario pueda seleccionar

      //Determina si una fecha (current) está deshabilitada o no
      if (limitDate <= endDate) { // Si la fecha limite que es la reserva mas cercana o la fecha maxima permitida por el host es menor o igual a la fecha final del anuncio, significa que hay disponibilidad
        return current.isBefore(selectedStartDate) || current.isAfter(limitDate) || isWithinReservationRange || isWithinPauseRange; // Evalua si la fecha actual es anterior a la fecha de inicio seleccionada ||  Evalua si la fecha actual es posterior a la fecha limite (reserva mas cercana o fecha maxima permitida por el host)  || Evalua si la fecha actual esta dentro de alguna de las reservas existentes
      } else {
        return current.isBefore(selectedStartDate) || current.isAfter(endDate) || isWithinReservationRange || isWithinPauseRange; // Evalua si la fecha actual es anterior a la fecha de inicio seleccionada ||  Evalua si la fecha actual es posterior a la fecha limite del anuncio (reserva mas cercana o fecha maxima permitida por el host)  || Evalua si la fecha actual esta dentro de alguna de las reservas existentes
      }
    }

    // Determina las fechas deshabilitadas al abrir el calendario de reserva
    if (startDate && endDate) {
      return (
        (current.isBefore(startDate, 'day') || current.isAfter(endDate)) || isWithinReservationRange || isWithinPauseRange
      );
    }

    return false; // Habilita las fechas que no se hayan considerado en los condicionales
  }

  const handleSelectChange = (value, name) => {
    if (name === "huespedes") {
      bodyReserve["huespedes"] = value
    }
    console.log(bodyReserve);
  }

  const onFinish = async () => {
    console.log(bodyReserve);
    openModalQR();
  }



  return (
    <Modal
      className="reserve-modal"
      open={reservationModal}
      onCancel={() => closeReservationModal()}
      destroyOnClose="true"
      title={
        <>
          <h3>Realice su reserva del lugar</h3><Divider />
        </>
      }
      footer={null}
    >
      <Form
        name="reserve-form"
        onFinish={onFinish}
      >
        <div className="label-range-reserve-dates">
          <h4>Llegada</h4>
          <h4>Salida</h4>
        </div>
        <Form.Item
          name="fechasLlegadaSalida"
          rules={[{ required: true, message: 'Por favor, seleccione las fechas de llegada y salida' }]}
        >
          <RangePicker
            className="range-picker-reserve"
            placeholder={['Fecha Llegada', 'Fecha Salida']}
            onChange={handleRangeDateChange}
            disabledDate={isDateDisabled}
            onCalendarChange={(val) => { setSelectedStartDate(val[0]); setSelectedEndDate(val[1]) }}
            onOpenChange={(open) => { if (open) { setSelectedStartDate(null); setSelectedEndDate(null) } }}
            changeOnBlur
          />
        </Form.Item>

        <h4>Huéspedes</h4>
        <Form.Item
          name="huespedes"
          rules={[{ required: true, message: 'Por favor, seleccione la cantidad de huéspedes' }]}
        >
          <Select
            className="select-number-max-guests-reserve"
            placeholder="Seleccione la cantidad de huéspedes"
            options={Array.from({ length: numberMaxOfGuests }, (_, i) => ({
              label: `${i + 1} ${i + 1 > 1 ? 'Huéspedes' : 'Huésped'}`,
              value: i + 1
            }))
            }
            onChange={(value) => handleSelectChange(value, "huespedes")}
          />
        </Form.Item>

        <Form.Item>
          <div className="btns-reserve-form-flex-container">
            <div>
              <Button className="btn-pay" type="primary" htmlType="submit" >
                Pagar
              </Button>
            </div>
            <div>
              <Button className="btn-cancel-pay" htmlType="button" onClick={closeReservationModal}>
                Cancelar
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>

      <ModalQRCode
        isVisibleQRCode={isVisibleQRCode}
        setIsVisibleQRCode={setIsVisibleQRCode}
        closeModalQR={closeModalQR}
        bodyReserve={bodyReserve}
        setBodyReserve={setBodyReserve}
        closeReservationModal={closeReservationModal}
        priceResidence={priceResidence}
        selectedStartDate={dayjs(selectedStartDate).subtract(1, 'day')}//Quito un dia por que no toma el cuenta el dia inicio, toma el siguiente
        selectedEndDate={dayjs(selectedEndDate)}
        idAd={idAd}
        isRefresh={isRefresh}
        setRefresh={setRefresh}
      />
    </Modal>
  )
}

export default ReserveModal;