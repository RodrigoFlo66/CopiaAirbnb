import React from 'react';
import { Carousel } from 'antd';
import './imgCarouselCardStyles.css'
function ImgCarouselCard({ imagen }) {

  return (
    <>
      <Carousel autoplay>
        <img
          className="img-guest-card-carousel"
          src={/* imagen === "Sin imagen" ? defaultLogo : */imagen}
          alt="Algo salió mal..."
        />
        <img
          className="img-guest-card-carousel"
          src={/* imagen === "Sin imagen" ? defaultLogo : */imagen}
          alt="Algo salió mal..."
        />
        <img
          className="img-guest-card-carousel"
          src={/* imagen === "Sin imagen" ? defaultLogo : */imagen}
          alt="Algo salió mal..."
        />
        <img
          className="img-guest-card-carousel"
          src={/* imagen === "Sin imagen" ? defaultLogo : */imagen}
          alt="Algo salió mal..."
        />
        <img
          className="img-guest-card-carousel"
          src={/* imagen === "Sin imagen" ? defaultLogo : */imagen}
          alt="Algo salió mal..."
        />
      </Carousel>
    </>
  )
}

export default ImgCarouselCard;