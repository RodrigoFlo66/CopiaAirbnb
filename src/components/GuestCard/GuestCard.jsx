import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tooltip } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './guestCardStyles.css';

function GuestCard({ idResidencia, imagen, titulo, ciudad, pais, fechaIni, fechaFin, precio, setRefresh, promedio, small }) {
  const { Meta } = Card;

  return (
    <>
      <Link to={`/${idResidencia}`}>
        <Tooltip title={/* description */ `Clic para ver más detalles`} placement="right">
          <Card
            className= { small ? "guest-card-small" : "guest-card"}
            hoverable
            cover={
              <img
                className={ small ? "img-guest-card-carousel-small" : "img-guest-card-carousel"} 
                src={/* imagen === "Sin imagen" ? defaultLogo : */imagen}
                alt="Algo salió mal..."
              />
              //  <ImgCarouselCard imagen={imagen}/> 
            }
          >
            <Meta
              title={
                <div className="meta-guest-card-title-container">
                  <div>
                    {ciudad}, {pais}
                  </div>
                  <div>
                    <StarFilled style={{ fontSize: "13px", color:'#ECAB0F'}} /> <span style={{ fontWeight: "400" }}>{promedio}</span>
                  </div>
                </div>
              }
              description={
                <div className="meta-guest-card-description-container">
                  {titulo} <br /> {fechaIni} / {fechaFin} <br /> <span style={{ fontWeight: '700' }}>Bs. {precio}</span>  noche
                </div>
              }
            />
          </Card>
        </Tooltip>
      </Link>
    </>
  );
};

export default GuestCard;