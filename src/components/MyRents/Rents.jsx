import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table, Tag, Button, List, Popconfirm, Badge, Spin, Empty } from 'antd';
import { updateRentalHost } from '../../services/rentals';
import ModalReviewHost from '../ModalReviewHost/ModalReviewHost';
import { format, isToday, parseISO } from 'date-fns';
import './rents.css';

function Rents({ loading, setRefresh, reservas }) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  /*De backend estoy obteniendo estos datos:
  {
    "id_reserva": 21,
    "id_residencia": 3,
    "precio_total_reserva": 123,
    "fecha_inicio_reserva": "2023-12-08T04:00:00.000Z",
    "fecha_fin_reserva": "2023-12-08T04:00:00.000Z",
    "estado_reserva": "pendiente",
    "titulo_residencia": "Hotel Ecoresort La Colina",
    "tipo_residencia": "Hotel",
    "pais_residencia": "Bolivia",
    "ciudad_residencia": "Cochabamba",
    "id_usuario": 4,
    "nombre_usuario": "Jose Montaño",
    "correo_usuario": "alejomont25@gmail.com",
    "foto_usuario": "https://drive.google.com/uc?id=1Lxk93YjzhtZ-ad7gdGcZBFwbk0TUEoha",
    "tags": [
      "Hotel",
      "Bolivia",
      "Cochabamba"
    ]
  },
  */
  //Importante aun me faltan los datos de estado_reserva y saber si en una residencia ya escribiste su receñia

  const updateRentalestado_reserva = async (record, newestado_reserva) => {
    try {
      const updatedData = {
        estado: newestado_reserva,
        // ... otros campos
      };
      await updateRentalHost(updatedData, record.id_reserva, record.id_residencia);
      setRefresh(true);
      console.log(`Estado cambiado a ${newestado_reserva} exitosamente`); //solo para pruebas UwU
      //para incrementar algo mas luego de actualizar como redireccionar o mostrar un mensaje
    } catch (error) {
      console.error(`Error al cambiar el estado a ${newestado_reserva}:`, error);
    }
  };

  const handleConfirmClick = (record) => {
    updateRentalestado_reserva(record, 'alquilado');
  };

  const handleCancelClick = (record) => {
    updateRentalestado_reserva(record, 'cancelado');
  };

  const handleWriteReviewClick = (record) => {
    // Aquí puedes "Escribir Reseña del huesped"
    
    // abrir un modal.
    setSelectedReservation(record);
    setIsReviewModalOpen(true);
  };

  const shouldShowWriteReview = (record) => {
    const today = new Date();
    const endDate = parseISO(record.fecha_fin_reserva);
    if (endDate < today) {
      const daysDifference = Math.floor((today - endDate) / (24 * 60 * 60 * 1000));
      return daysDifference <= 7;
    }

    return false;
  };

  const columns = [
    {
      title: 'Huesped',
      children: [
        {
          title: 'Nombre',
          dataIndex: 'nombre_usuario',
          key: 'nombre_usuario',
          align: 'center',
          render: (text, record) => (
            <Link to={`/usuario/${record.codigo_usuario}`}>{text}</Link>
          ),
        },
        { title: 'Correo', dataIndex: 'correo_usuario', key: 'correo_usuario', align: 'center', },
      ],
    },
    { title: 'Titulo Residencia', dataIndex: 'titulo_residencia', key: 'titulo_residencia', align: 'center', },
    { title: 'Precio Reserva', dataIndex: 'precio_total_reserva', key: 'precio_total_reserva', align: 'center', },
    {
      title: 'Fechas de Reserva',
      children: [
        {
          title: 'Inicio',
          dataIndex: 'fecha_inicio_reserva',
          key: 'fecha_inicio_reserva',
          align: 'center',
          style: { color: '#336699' },
          render: (text) => format(new Date(text), 'yyyy-MM-dd'),
        },
        {
          title: 'Fin',
          dataIndex: 'fecha_fin_reserva',
          key: 'fecha_fin_reserva',
          align: 'center',
          render: (text) => format(new Date(text), 'yyyy-MM-dd'),
        },
      ],
    },
    {
      title: 'Estado',
      key: 'estado_reserva',
      align: 'center',
      render: (_, record) => (
        <Badge
          status={
            record.estado_reserva === 'alquilado'
              ? 'success'
              : record.estado_reserva === 'cancelado'
                ? 'error'
                : 'default'
          }
          text={record.estado_reserva}
        />
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      align: 'center',
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag} >
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Acciones',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          {record.estado_reserva === 'pendiente' && (
            <>
              <Popconfirm
                title="¿Estás seguro de confirmar la reserva?"
                onConfirm={() => handleConfirmClick(record)}
                placement="bottom"
              >
                <Button>Confirmar</Button>
              </Popconfirm>
              <Popconfirm
                title="¿Estás seguro de cancelar la reserva?"
                onConfirm={() => handleCancelClick(record)}
                placement="bottom"
              >
                <Button>Cancelar</Button>
              </Popconfirm>
            </>
          )}
          {record.estado_reserva === 'cancelado' && (
            <Button disabled>Cancelado</Button>
          )}
          {record.estado_reserva === 'alquilado' && shouldShowWriteReview(record) && (
            <Button onClick={() => handleWriteReviewClick(record)}>Escribir Reseña del huésped</Button>
          )}
        </Space>
      ),
    },
  ];

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
    <div>
      <Table
        className="table-my-host-rents"
        dataSource={reservas}
        columns={columns}
        rowKey={record => record.id_reserva}
        locale={loading ? { emptyText: (<Spin spinning={loading} tip="Cargando..." > &nbsp; </Spin>) } : customEmptyMessage}
        pagination={{ pageSize: 7, pagination: true, position: ["bottomRight"] }}
        bordered={true}
      />
      {selectedReservation && (
        <ModalReviewHost
          visible={isReviewModalOpen}
          setVisible={setIsReviewModalOpen}
          onCancel={() => setIsReviewModalOpen(false)}
          userId={selectedReservation.codigo_usuario}
        />
      )}
    </div>
  );
};

export default Rents;
