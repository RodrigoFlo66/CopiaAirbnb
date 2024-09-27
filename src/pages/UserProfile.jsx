import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/users";
import { getPublishedResidencesByUser } from "../services/residences";
import { Avatar, Empty, List } from "antd";
import GuestCard from "../components/GuestCard/GuestCard";
import UserReviews from "../components/UserReviews/UserReviews";
import { getAllReviewsByResidence, getAsGuestUserReviews } from "../services/reviews";
import { useAuth } from "../contexts/authContext";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";


function UserProfile() {

  let { userId } = useParams();
  const { user } = useAuth();

  const [userData, setUserData] = useState({});
  const [residences, setResidences] = useState([]);
  const [asGuestReviews, setAsGuestReviews] = useState([]);
  const [asHostReviews, setAsHostReviews] = useState([]);
  const [userResidencesId, setUserResidencesId] = useState([]);
  const [asHostAverage, setAsHostAverage] = useState("");
  const [asGuestAverage, setAsGuestAverage] = useState("");


  useEffect(() => {
    getUser(userId).then((data) => setUserData(data));
  }, [userId]);

  useEffect(() => {
    getPublishedResidencesByUser(userId).then((data) => {
      setResidences(data)
      
      const residenceIds = data.map(residence => residence.id_residencia);

      setUserResidencesId(residenceIds);
    });
  }, [userId]);

  useEffect(() => {
    const promises = userResidencesId.map(id => getAllReviewsByResidence(id));
  
    Promise.all(promises)
      .then(reviewsArrays => {

        const allReviews = [].concat(...reviewsArrays);
        
        setAsHostReviews(allReviews);
      })
    
  }, [userId, userResidencesId]);

  useEffect(() => {
    const averageArray = asHostReviews.map(review => {
      return (Number(review.calificacion_comunicacion) + Number(review.calificacion_exactitud) + Number(review.calificacion_limpieza))/3
    })

    if (averageArray.length === 0) {
      setAsHostAverage(0);
      return;
    }
  
    const totalAverage = averageArray.reduce((total, average) => total + average, 0);
  
    const average = totalAverage / averageArray.length;
  
    setAsHostAverage(average);

  }, [asHostReviews])
  
  useEffect(() => {
    
    getAsGuestUserReviews(userId).then( async (data) =>{

      const corregido = data.map((review) => ({
        id_evaluacion: review.id_evaluacion_usuario,
        nombre_usuario: review.nombre_usuario,
        calificacion_limpieza: review.calificacion_limpieza_usu,
        calificacion_exactitud: review.calificacion_puntualidad,
        calificacion_comunicacion: review.calificacion_comunicacion_usu,
        comentario: review.comentario_usu,
      }))

      setAsGuestReviews(corregido)

      const averageArray = await corregido.map(review => {
        return (Number(review.calificacion_comunicacion) + Number(review.calificacion_exactitud) + Number(review.calificacion_limpieza))/3
      })
  
      if (averageArray.length === 0) {
        setAsGuestAverage(0);
        return;
      }

      const totalAverage = await averageArray.reduce((total, average) => total + average, 0);
    
      const average = await totalAverage / averageArray.length;
    
      setAsGuestAverage(average);
    
    })
  }, [userId]);



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
              El usuario no tiene residencias en alquiler
            </span>
          }
        >
        </Empty>
      </>),
  };


  return(
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '1100px', maxWidth: '1100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', borderBottom: '2px solid var(--ikx-k-pe)' }}>Datos del usuario</h2>
{
    userData && userData.codigo_usuario ? (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            border: '2px solid var(--ikx-k-pe)', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '25px'
        }}>
            <div style={{ marginRight: '20px' }}>
                <Avatar shape="circle" size={180} src={userData.foto_usuario} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }} />
            </div>
            <div style={{ flex: 1 }}>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>Nombre de usuario:</strong> {userData.nombre_usuario}</p>
                <p style={{ margin: '10px 0', fontSize: '18px' }}><strong>Correo electrónico:</strong> {userData.correo_usuario}</p>
                
            </div>
        </div>
    ) : null
}

        <h2 style={{ margin: 'auto', marginBottom: '20px' }}>Residencias del usuario</h2>
        
        <List
        grid={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        pagination={{
        onChange: page => {
            console.log(page);
          }, pageSize: 4,
        }}
        
        locale={customEmptyMessage}
        
        dataSource={residences && residences.filter(residence => residence.estado_residencia === "Publicado" || residence.estado_residencia === "Alquilado" || residence.estado_residencia  === "Pausado")}
        renderItem={(residence) => (
          <List.Item
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }
            }
          >
            <GuestCard
              idResidencia={residence.id_residencia}
              imagen={residence.imagenes[0]}
              titulo={residence.titulo_residencia}
              ciudad={residence.ciudad_residencia}
              pais={residence.pais_residencia}
              fechaIni={residence.fecha_inicio_publicado ? residence.fecha_inicio_publicado.split('T')[0].toString() : 'Sin fecha'}
              fechaFin={residence.fecha_fin_publicado ? residence.fecha_fin_publicado.split('T')[0].toString() : 'Sin fecha'}
              precio={residence.precio_residencia}
              promedio={Number(residence.promedio).toFixed(1)}
              small
            />
          </List.Item>
        )}
      />

      <UserReviews 
        asHostReviews={asHostReviews}
        asGuestReviews={asGuestReviews}
        asGuestAverage={asGuestAverage}
        asHostAverage={asHostAverage}
      />

      </div>
    </div>
  );

}

export default UserProfile;
