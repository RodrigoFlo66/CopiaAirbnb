import React, { useState } from 'react';
import { Badge, Button, Empty, Modal, Spin, Table } from 'antd';
import { EyeTwoTone, ClockCircleTwoTone, CheckCircleTwoTone, CommentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './tableGuestReservesStyles.css';
import AddReview from '../AddReview/AddReview';

function TableGuestReserves({ loading, reserves }) {
  const [reviewModal, setReviewModal] = useState(false);
  const [idReserve, setIdReserve] = useState("");
  const [idResidence, setIdResidence] = useState("");
  const [stateReserve, setStateReserve] = useState("");
  const openReviewModal = (reserve) => {
    setIdReserve(reserve.id_reserva);
    setIdResidence(reserve.id_residencia);
    setStateReserve(reserve.estado_reserva);
    setReviewModal(true);
  }
  const closeReviewModal = () => {
    setReviewModal(false);
  }
  const navigate = useNavigate();
  const columnsData = [
    { title: "Id reserva", dataIndex: "id_reserva", key: "id_reserva", defaultSortOrder: "descend", sorter: (idA, idB) => idA.id_reserva - idB.id_reserva },
    {
      title: "Detalles relevantes", children: [{
        title: "Anuncio", dataIndex: "titulo_residencia", key: "titulo_residencia"
      }, {
        title: "Pais", dataIndex: "pais_residencia", key: "pais_residencia"
      }, {
        title: "Ciudad", dataIndex: "ciudad_residencia", key: "ciudad_residencia"
      }, {
        title: "Monto total pagado (Bs.)", dataIndex: "precio_total_reserva", key: "precio_total_reserva"
      }]
    },
    {
      title: "Fechas de Reserva", children: [{
        title: "Fecha inicio", dataIndex: "fecha_inicio_reserva", key: "fecha_inicio_reserva", render: (startReserveDate) => { return startReserveDate && startReserveDate.split('T')[0].toString() }
      }, {
        title: "Fecha fin", dataIndex: "fecha_fin_reserva", key: "fecha_fin_reserva", render: (endReserveDate) => { return endReserveDate && endReserveDate.split('T')[0].toString() }
      }]
    },
    {
      title: "Estado  de la Reserva", dataIndex: "estado_reserva", key: "estado_reserva",
      render: (stateReserve) => {
        return (
          stateReserve === "alquilado"
            ? <><CheckCircleTwoTone twoToneColor={"#52c41a"} /> <span style={{ fontWeight: "500" }}>Alquilado</span></>
            : <><ClockCircleTwoTone twoToneColor={"#BFBFBF"} /> <span style={{ fontWeight: "500" }}>Pendiente</span></>
        )
      }
    },
    {
      title: "Acciones", key: "acciones",
      render: (reserve) => (
        <>
          <Button type="link" onClick={() => { viewAdd(reserve) }}> <EyeTwoTone /> Ver anuncio </Button>
          {
            reserve.estado_reserva == "alquilado"
              ? <Button type="link" onClick={() => openReviewModal(reserve)}> <CommentOutlined /> Dejar Reseña </Button>
              : null
          }
        </>)
    },
  ]

  const viewAdd = (reserve) => {
    if (reserve.id_residencia && reserve.id_residencia) {
      navigate(`/${reserve.id_residencia}`);
    } else {
      Modal.error({ content: "El anuncio ya no está disponible :(", okText: "Ok" });
    }
  }

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
              No existen Reservas
            </span>
          }
        >
        </Empty>
      </>),
  };
  return (
    <>
      <Table
        className="table-my-guest-reserves"
        columns={columnsData}
        dataSource={reserves}
        rowKey={record => record.id_reserva}
        locale={loading ? { emptyText: (<Spin spinning={loading} tip="Cargando..." > &nbsp; </Spin>) } : customEmptyMessage}
        pagination={{ pageSize: 7, pagination: true, position: ["bottomRight"] }}
        bordered={true}
      >
      </Table>
      <Modal
        className="review-modal"
        open={reviewModal}
        onCancel={closeReviewModal}
        footer={null}
      >
        <AddReview
          idReserve={idReserve}
          idResidence={idResidence}
          stateReserve={stateReserve}
          closeReviewModal={closeReviewModal}
        />
      </Modal>
    </>
  )
}

export default TableGuestReserves;