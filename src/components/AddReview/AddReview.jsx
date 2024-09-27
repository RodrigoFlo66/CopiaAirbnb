import React, { useState, useEffect } from 'react';
import { Rate, Form, Input, Button, message, Divider, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { createReviewResidence } from '../../services/reviews';
import { useAuth } from "../../contexts/authContext";
import dayjs from 'dayjs';
import './addReviewStyles.css';

function AddReview({ idReserve, idResidence, stateReserve, closeReviewModal }) {
  const { user } = useAuth();
  const [form] = useForm();
  const [ratingCleaning, setRatingCleaning] = useState(null);
  const [ratingPromise, setRatingPromise] = useState(null);
  const [ratingComunication, setRatingComunication] = useState(null);
  const [bodyReview, setBodyReview] = useState({
    limpieza: null,
    exactitud: null,
    comunicacion: null,
    comentario: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBodyReview((prevBodyReview) => ({
      ...prevBodyReview, [name]: value,
    }));
  }

  const handleRatingChange = (value, name) => {
    if (name === "limpieza") {
      setRatingCleaning(value);
    } else if (name === "exactitud") {
      setRatingPromise(value);
    } else {
      setRatingComunication(value);
    }
    setBodyReview((prevBodyReview) => ({
      ...prevBodyReview, [name]: value,
    }))
  }

  //Agregar idReserve al 
  const onFinish = async () => {
    await createReviewResidence(bodyReview, idResidence, user.uid, idReserve).then((data) => {
      if (stateReserve == "alquilado") {
        if (data && data.data && data.data === 7) {
          Modal.error({ content: "Se cumplió el tiempo limite de 7 días. Ya no puede enviar su reseña :(", okText: "Entendido" });
        } else if (data && data.data && data.data === 1) {
          Modal.error({ content: "Aún no comenzó su estadía en la residencia. Por lo tanto, no puede enviar su reseña :(", okText: "Entendido" });
        } else {
          message.success('Reseña enviada exitosamente!');
        }
      } else {
        Modal.warning({ content: "Debe reservar para agregar su reseña del lugar!", okText: "Entendido" });
      }
    });
    setRatingCleaning();
    setRatingPromise();
    setRatingComunication();
    setBodyReview({ limpieza: null, exactitud: null, comunicacion: null, comentario: "", });
    closeReviewModal();
  }

  const onCancel = () => {
    setRatingCleaning();
    setRatingPromise();
    setRatingComunication();
    setBodyReview({ limpieza: null, exactitud: null, comunicacion: null, comentario: "", });
    closeReviewModal();
  }

  useEffect(() => {
    form.setFieldsValue(bodyReview);
  }, [bodyReview]);

  return (
    <>
      <div className="review-form-container">
        <Form
          name="review-form"
          autoComplete="off"
          form={form}
          onFinish={onFinish}
        >
          <h2 style={{ textAlign: "center" }}>Cuéntanos sobre tu experiencia!</h2>
          <Divider />
          <div className="review-form-flex-container">
            <div className="rates-container">
              <Form.Item
                name="limpieza"
                rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
              >
                <h4>Limpieza</h4>
                <Rate
                  name="limpieza"
                  value={ratingCleaning}
                  onChange={(value) => handleRatingChange(value, "limpieza")}
                />
              </Form.Item>

              <Form.Item
                name="exactitud"
                rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
              >
                <h4>Exactitud de lo ofrecido con lo encontrado</h4>
                <Rate
                  name="exactitud"
                  value={ratingPromise}
                  onChange={(value) => handleRatingChange(value, "exactitud")}
                />
              </Form.Item>

              <Form.Item
                name="comunicacion"
                rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
              >
                <h4>Comunicación</h4>
                <Rate
                  name="comunicacion"
                  value={ratingComunication}
                  onChange={(value) => handleRatingChange(value, "comunicacion")}
                />
              </Form.Item>
            </div>
            <div className="comment-container" >
              <Form.Item
                name="comentario"
                rules={[{ required: true, message: "No olvide dejar su comentario" }]}
              >
                <h4>Agregar Comentario: </h4>
                <Input.TextArea
                  name="comentario"
                  placeholder="Ingrese un comentario acerca de su experiencia..."
                  value={bodyReview.comentario}
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  maxLength={200}
                  showCount
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
          </div>

          <Divider />
          {
            (bodyReview.limpieza && bodyReview.exactitud && bodyReview.comunicacion && bodyReview.comentario) && (
                <Form.Item>
                  <div className="btns-container">
                    <div>
                      <Button type="primary" htmlType="submit" style={{ margin: '0' }}>
                        Enviar Reseña
                      </Button>
                    </div>
                    <div>
                      <Button htmlType="button" onClick={onCancel} style={{ margin: '0' }}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </Form.Item>
            )
          }
        </Form>
      </div>
    </>
  )
}

export default AddReview;