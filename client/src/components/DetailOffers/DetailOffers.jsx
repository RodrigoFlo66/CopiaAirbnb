import React from 'react'
import { Divider, List } from 'antd';
import { CarOutlined, WifiOutlined, VideoCameraOutlined, SkinOutlined, TabletOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaterLadder, faKitchenSet, faFan, faDumbbell, faUtensils, faTv, faHotTubPerson, faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import './detailOffersStyles.css'

function DetailOffers({ services }) {

  const servicesEstructure = {
    wifi_residencia: { icon: <WifiOutlined />, label: "Wifi" },
    cocina_residencia: { icon: <FontAwesomeIcon icon={faKitchenSet} />, label: "Cocina" },
    televisor_residencia: { icon: <FontAwesomeIcon icon={faTv} />, label: "Televisor" },
    lavadora_residencia: { icon: <SkinOutlined />, label: "Lavadora" },
    aire_acond_residencia: { icon: <FontAwesomeIcon icon={faFan} />, label: "Aire acondicionado" },
    psicina_residencia: { icon: <FontAwesomeIcon icon={faWaterLadder} />, label: "Psicina" },
    jacuzzi_residencia: { icon: <FontAwesomeIcon icon={faHotTubPerson} />, label: "Jacuzzi" },
    estacionamiento_residencia: { icon: <CarOutlined />, label: "Estacionamiento" },
    gimnasio_residencia: { icon: <FontAwesomeIcon icon={faDumbbell} />, label: "Gimnasio" },
    parrilla_residencia: { icon: <FontAwesomeIcon icon={faUtensils} />, label: "Parrilla" },
    camaras_segurid_residencia: { icon: <VideoCameraOutlined />, label: "Cámaras de seguridad" },
    humo_segurid_residencia: { icon: <FontAwesomeIcon icon={faFireFlameCurved} />, label: "Detector de humo" }
  }

  function addServicesToArray(services) {
    const servicesArray = [];
    for (const property in services) {
      if (services[property] === "true" && servicesEstructure[property]) {
        const { icon, label } = servicesEstructure[property];
        servicesArray.push(createServiceElement(icon, label));
      }
    }
    return servicesArray;
  }

  function createServiceElement(icon, label) {
    return (
      <div className="list-offer-item">
        {icon} <p>{label}</p>
      </div>
    );
  }

  const renderedServices = addServicesToArray(services);

  return (
    <div>
      <Divider />
      <h3>Lo que este lugar ofrece</h3>
      <div className='offers-container'>
        <List
          grid={{
            gutter: 16,
            column: 4,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={renderedServices}
          renderItem={(item, index) => (
            <List.Item key={index}>
              {item}
            </List.Item>
          )}
        >
        </List>
      </div>
      <Divider />
    </div>
  )
}

export default DetailOffers;