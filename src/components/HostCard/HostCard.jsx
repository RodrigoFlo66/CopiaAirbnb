import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CheckCircleTwoTone, CloseCircleTwoTone, PauseCircleTwoTone, EllipsisOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseCircleCheck,faTv, faBrush } from '@fortawesome/free-solid-svg-icons';
import DeleteCardModal from '../DeleteCardModal/DeleteCardModal';
import EditCardModal from '../EditCardModal/EditCardModal';
import './hostCardStyles.css';

function HostCard({ idResidencia, imagen, titulo, ciudad, pais, fechaIni, fechaFin, precio, estadoResidencia, isRefresh, setRefresh }) {
  const [deteleModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { Meta } = Card;
  // console.log(isRefresh);
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };


  return (
    <>
      <Card
        className='host-card'
        hoverable
        cover={
          <img
            className='img-host-card'
            alt="Algo salio mal..."
            src={/* imagen === "Sin imagen" ? defaultLogo : */ imagen}
          />
        }
        actions={[
          <>
            <Tooltip title="Clic para modificar" placement='bottom'>
              <Button name='modalEditar' type='default' size='small' onClick={openEditModal}><EditOutlined /></Button>
            </Tooltip>
            <EditCardModal
              visible={editModal}
              onClose={closeEditModal}
              idResidencia={idResidencia}
              titulo={titulo}
              setRefresh={setRefresh}
              closeEditModal={closeEditModal}
            />
          </>,
          <>
            <Tooltip title="Clic para eliminar" placement='bottom'>
              <Button name="modalBorrar" danger size='small' onClick={openDeleteModal} ><DeleteOutlined /></Button>
            </Tooltip>
            <DeleteCardModal
              visible={deteleModal}
              onClose={closeDeleteModal}
              idResidencia={idResidencia}
              titulo={titulo}
              isRefresh={isRefresh}
              setRefresh={setRefresh}
              cerrarModal={closeDeleteModal}
            />
          </>
        ]}

      >
        <Link to={`/mis-anuncios/${idResidencia}`}>
          <Tooltip title={/* descripcion */`Clic para vista previa`} placement="top">
            <Meta
              title={`${ciudad}, ${pais}`}
              description={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {titulo} <br /> {fechaIni && fechaFin === "Sin fecha" ? "Sin fecha" : `${fechaIni} / ${fechaFin}`} <br /> <span style={{fontWeight:'700'}}>Bs. {precio}</span> noche<br />
                  {estadoResidencia === "Publicado" ? <span style={{ fontWeight: '700' }}><CheckCircleTwoTone twoToneColor="#2AD06D" /> Publicado </span> : ''}
                  {estadoResidencia === "Pausado" ? <span style={{ fontWeight: '700' }}><PauseCircleTwoTone twoToneColor="#F28808" /> Pausado </span> : ''}
                  {estadoResidencia === "Inactivo" ? <span style={{ fontWeight: '700' }}><CloseCircleTwoTone twoToneColor="#FF4040" /> Inactivo </span> : ''}
                  {estadoResidencia === "Alquilado" ? <span style={{ fontWeight: '700' }}><FontAwesomeIcon icon={faHouseCircleCheck} /> Alquilado </span> : ''}
                  {estadoResidencia === "Previsualización" ? <span style={{ fontWeight: '700' }}><FontAwesomeIcon icon={faTv} /> Previsualización </span> : ''}
                  {estadoResidencia === "En Construcción" ? <span style={{ fontWeight: '700' }}><FontAwesomeIcon icon={faBrush} /> En Construcción </span> : ''}
                </div>
              }
            />
          </Tooltip>
        </Link>
      </Card>
    </>
  );
};

export default HostCard;
