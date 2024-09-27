import React, { useState } from "react";
import { Modal, Button, Input, Select, message } from "antd";
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import "./DescriptionModalStyles.css"

function DescriptionModal({ visible, urls, index, onClose, setUploading }) {

  const {Option} = Select;
  const [selected, setSelected] = useState(null);
  const [description, setDescription] = useState(null);

  const saveDescription = () => {
    if (selected == "Otro") {
      if (description != null && description != "") {
        urls[index].descripcion_imagen = description;
        onClose();
      } else {
        message.error("Ingrese una descripción");
      }
    } else {
      if (selected != null) {
        urls[index].descripcion_imagen = selected;
        onClose();
      } else {
        message.error("Seleccione una descripción");
      }
    }
    setUploading(false);
    urls.length > 9 ? message.info("Solo puede subir 10 fotos") : "";
    setDescription(null);
    setSelected(null);
  };

  const handleSelectChange = (value) => {

    setSelected(value);

  }

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setDescription(value)

  }
  
  return (
    <>
      <Modal
        className="description-modal"
        title={
          <>
            <ExclamationCircleTwoTone
              twoToneColor="#FFA709"
              style={{ fontSize: "1.1em" }}
            />{" "}
            <b>¿De qué parte de la residencia es la foto?</b>
          </>
        }
        open={visible}
        footer={null}
        closable={false}
      >
        <img
          alt="imagen"
          style={{
            width: "100%",
          }}
          src={urls[index].imagen_residencia}
        />

        {selected != "Otro" ? (
          <Select
            className="description-select"
            placeholder="Seleccione una opción"
            value={selected}
            onChange={(value) => handleSelectChange(value)}
            listHeight={230}
          >
            <Option value="Balcon">Balcon</Option>
            <Option value="Baño">Baño</Option>
            <Option value="Cocina">Cocina</Option>
            <Option value="Comedor">Comedor</Option>
            <Option value="Ducha">Ducha</Option>
            <Option value="Habitacion">Habitacion</Option>
            <Option value="Lavanderia">Lavanderia</Option>
            <Option value="Patio">Patio</Option>
            <Option value="Sala">Sala</Option>
            <Option value="Otro">Otro</Option>
          </Select>
        ) : (
          <Input
            className="description-input"
            placeholder="Ingrese la descripción"
            onChange={(value) => handleChange(value)}
          />
        )}
        <div className="buttons-modal-description-container">
          <Button

            key="save"
            type="primary"
            className="save-button"
            onClick={saveDescription}
          >
            Guardar
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default DescriptionModal;
