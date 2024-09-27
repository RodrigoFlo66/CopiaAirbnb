import React, { useEffect, useState } from 'react';
import { Divider, List, Empty } from 'antd';
import { ExclamationCircleOutlined, StarFilled } from '@ant-design/icons';
import ResidenceReview from '../ResidenceReview/ResidenceReview';
import './reviewsListStyles.css';

function ReviewsList({ detailReviews, isRefresh, setRefresh, averageRates, hostReviews }) {
  console.log(detailReviews);
  const roundedAverageRates= Number(averageRates).toFixed(1);
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
              No existen Reseñas
            </span>
          }
        >
        </Empty>
      </>),
  };
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Reseñas (<StarFilled style={{fontSize:"19px"}}/> {roundedAverageRates} )</h2>
      <List
        grid={{
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2
        }}
        pagination={{
          onChange: page => {
            console.log(page);
          }, pageSize: 8,
        }}
        locale={customEmptyMessage}
        dataSource={detailReviews}
        renderItem={(review) => (
          <List.Item
            className="reviews-list"
          >
            <ResidenceReview
              idReview={review.id_evaluacion}
              reviewOwner={review.nombre_usuario}
              cleaningRate={review.calificacion_limpieza}
              accuracyRate={review.calificacion_exactitud}
              comunicationRate={review.calificacion_comunicacion}
              commentResidence={review.comentario}
              isRefresh={isRefresh}
              setRefresh={setRefresh}
              hostReviews
            />
          </List.Item>
        )}
      />
      <Divider />
    </>
  )
}

export default ReviewsList;