import React, { useState } from 'react';
import { Button, Divider, Modal } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseCircleCheck, faTv, faBrush, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import './detailsForHostOnlyStyles.css';

function DetailsForHostOnly({ estadoResidencia, direccionResidencia, precioResidencia, fechaIni, fechaFin }) {
  const [privateModal, setPrivateModal] = useState(false);
  const openPrivateInfoModal = () => {
    setPrivateModal(true);
  };

  const closePrivateInfoModal = () => {
    setPrivateModal(false);
  };

  return (
    <div>
      <Button className="button-detail-for-host-only" type='primary' onClick={() => openPrivateInfoModal()}> <FontAwesomeIcon icon={faCircleInfo} /> <span>{`Más detalles`}</span></Button>
      <Modal
        open={privateModal}
        onCancel={() => closePrivateInfoModal()}
        footer={null}
      >
        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

          <b>Dirección <br /></b> {direccionResidencia} <Divider />
          <b>Fecha Inicio</b> <br /> {fechaIni} <Divider />
          <b>Fecha Fin</b> <br /> {fechaFin}  <Divider />
          <b>Precio</b> <br /> Bs. {precioResidencia} <Divider />
          <b>Estado del anuncio</b><br />
          {estadoResidencia === "Publicado" ? <span style={{ fontWeight: '600' }}><CheckCircleTwoTone twoToneColor="#2AD06D" /> Publicado</span> : ''}
          {estadoResidencia === "Pausado" ? <span style={{ fontWeight: '600' }}><PauseCircleTwoTone twoToneColor="#F28808" /> Pausado</span> : ''}
          {estadoResidencia === "Inactivo" ? <span style={{ fontWeight: '600' }}><CloseCircleTwoTone twoToneColor="#FF4040" /> Inactivo</span> : ''}
          {estadoResidencia === "Alquilado" ? <span style={{ fontWeight: '600' }}><FontAwesomeIcon icon={faHouseCircleCheck} /> Alquilado</span> : ''} 
          {estadoResidencia === "Previsualización" ? <span style={{ fontWeight: '700' }}><FontAwesomeIcon icon={faTv} /> Previsualización </span> : ''} 
          {estadoResidencia === "En Construcción" ? <span style={{ fontWeight: '600' }}><FontAwesomeIcon icon={faBrush} /> En Construcción </span> : ''} <Divider style={{marginBottom:'0'}}/>
        </div>
      </Modal>
    </div>
  )
}

export default DetailsForHostOnly