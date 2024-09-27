import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Tooltip } from 'antd';
import './myReserveCardStyles.css';

function MyReserveCard({ idResidence, country, city, titleAd, startReserveDate, endReserveDate, totalPrice, images, setRefresh }) {
  const { Meta } = Card;
  return (
    <>
      <Link to={`/${idResidence}`}>
        <Tooltip title={/* description */ `Clic para ver anuncio`} placement="right">
          <Card
            className="my-reserve-card"
            hoverable
            cover={
              <img
                className="img-my-reserve-card-carousel"
                src={/* imagen === "Sin imagen" ? defaultLogo : */images}
                alt="Algo salió mal..."
              />
              //  <ImgCarouselCard imagen={imagen}/> 
            }
          >
            <Meta
              title={
                <div className="meta-my-reserve-card-title-container">
                  <div>
                    {city}, {country}
                  </div>
                </div>
              }
              description={
                <div className="meta-my-reserve-card-description-container">
                  {titleAd} <br /> {startReserveDate} / {endReserveDate} <br />  Total: <span style={{ fontWeight: '700' }}> Bs. {totalPrice}</span>
                </div>
              }
            />
          </Card>
        </Tooltip>
      </Link>
    </>
  )
}

export default MyReserveCard