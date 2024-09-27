import React, { useEffect, useState } from 'react';
import { Carousel, Image, Tooltip } from 'antd';
import './detailImgsStyles.css';

function DetailImgs({ images }) {
  return (
    <div className="img-flex-container">
      <div className="img-container">
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          <Carousel
            className="carousel-detail-img"
            autoplay
            effect="fade"
            dotPosition='bottom'
          >
            {images && images.map((image, pos) => (
              <div key={pos}>
                <Image
                  className="carousel-detail__img"
                  src={image.imagen_residencia}
                  alt={`${image.descripcion_imagen}`}
                  />
                  <div className="carousel-detail__description">
                    <h3>{image.descripcion_imagen}</h3>
                  </div>
              </div>
            ))}
          </Carousel>
        </Image.PreviewGroup>
      </div>
    </div>
  )
}

export default DetailImgs;