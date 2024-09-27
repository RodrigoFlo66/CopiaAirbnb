import React, { useState, useEffect } from 'react';
import { Rate, Form, Input, Button, message, Divider, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { createReviewUser } from '../../services/reviews';
import { useAuth } from "../../contexts/authContext";
import './HostToGuestReview.css';
import { useParams } from 'react-router-dom';

function HostToGuestReview({ isRefresh, setRefresh, closeModal, userId }) {
  const { user } = useAuth();
  const [form] = useForm();
  const [ratingCleaning, setRatingCleaning] = useState(null);
  const [ratingPunctuality, setRatingPunctuality] = useState(null);
  const [ratingComunication, setRatingComunication] = useState(null);
  const [bodyReview, setBodyReview] = useState({
    limpieza: null,
    puntualidad: null,
    comunicacion: null,
    comentario: "",
    codigoAlUsuario: userId
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
    } else if (name === "puntualidad") {
      setRatingPunctuality(value);
    } else {
      setRatingComunication(value);
    }
    setBodyReview((prevBodyReview) => ({
      ...prevBodyReview, [name]: value,
    }))
  }

  const onFinish = async () => {

    try {
      await createReviewUser(bodyReview, user.uid);
      message.success('Reseña enviada exitosamente!');
    } catch (error) {
      Modal.error({ content: "No se pudo agregar la reseña", okText: "Ok" });
    }


    setRatingCleaning();
    setRatingPunctuality();
    setRatingComunication();
    setBodyReview({ limpieza: null, puntualidad: null, comunicacion: null, comentario: "", codigoAlUsuario: userId});
    // setRefresh(true);
    closeModal()
  }

  const onCancel = () => {
    setRatingCleaning();
    setRatingPunctuality();
    setRatingComunication();
    setBodyReview({ limpieza: null, puntualidad: null, comunicacion: null, comentario: "", codigoAlUsuario: userId});
    closeModal()
  }

  useEffect(() => {
    form.setFieldsValue(bodyReview);
  }, [bodyReview]);

  return (
    <>
      <div className="review-host-to-guest-form-container">
        <Form
          name="review-form"
          autoComplete="off"
          form={form}
          onFinish={onFinish}
        >
          <h2>Cuéntanos sobre tu experiencia!</h2>
          <Form.Item
            name="limpieza"
            rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
          >
            <h3>Limpieza</h3>
            <Rate
              name="limpieza"
              value={ratingCleaning}
              onChange={(value) => handleRatingChange(value, "limpieza")}
            />
          </Form.Item>

          <Form.Item
            name="puntualidad"
            rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
          >
            <h3>Puntualidad</h3>
            <Rate
              name="puntualidad"
              value={ratingPunctuality}
              onChange={(value) => handleRatingChange(value, "puntualidad")}
            />
          </Form.Item>

          <Form.Item
            name="comunicacion"
            rules={[{ required: true, message: 'No olvide calificar su experiencia' }]}
          >
            <h3>Comunicación</h3>
            <Rate
              name="comunicacion"
              value={ratingComunication}
              onChange={(value) => handleRatingChange(value, "comunicacion")}
            />
          </Form.Item>

          <div className="comment-btns-container" >
            <Form.Item
              name="comentario"
              rules={[{ required: true, message: "No olvide dejar su comentario" }]}
            >
              <h3>Agregar Comentario: </h3>
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
            {
              (bodyReview.limpieza && bodyReview.puntualidad && bodyReview.comunicacion && bodyReview.comentario) && (
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
          </div>
        </Form>
      </div>
      <Divider />
    </>
  )
}

export default HostToGuestReview;