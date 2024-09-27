import React, { useState } from "react";
import "./rentalFormStyles.css";
import { Upload, Modal, message } from "antd";
import { PlusOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import DescriptionModal from "./DescriptionModal";
import { createImgResidence } from "../../services/residences";
import imageCompression from "browser-image-compression";

function UploadComponent({ urls, setUrls, fileList, setFileList, setImageUploaded }) {

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewDescription, setPreviewDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  const openDescriptionModal = () => {
    setModalVisible(true);
  }

  const closeDescriptionModal = () => {
    setModalVisible(false);
  }

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {

    const index = fileList.findIndex((item) => item.uid === file.uid);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewDescription(urls[index].descripcion_imagen);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Suba su imágen
      </div>
    </div>
  );


  const uploadImage = async (options) => {
    setUploading(true);
    const { onSuccess, onError, file, onProgress } = options;
    const compressedImage = await imageCompression(file, {
      fileType: "image/webp",
      maxSizeMB: 1
    })
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log((event.loaded / event.total) * 100);
        onProgress({ percent: (event.loaded / event.total) * 100 }, file);
      },
    };

    fmData.append("image", compressedImage);
    console.log(fmData.get("image"));

    try {
      //llamar a peticion para subir archivo a drive y recibir url(ahora mismo con peticion de prueba)
      createImgResidence(fmData, config)
        .then((response) => {
          setImageUploaded(true);
          onSuccess(file);
          //añadir url recibida del response al array urls
          // urls.push(`https://drive.google.com/uc?export=view&id=${res.data.fileId}`);
          
          urls.push({imagen_residencia: response.data.imgUrl, descripcion_imagen: ""});
          // urls.push(response.data.imgUrl);
          
          setImageUploaded(urls.length > 4);
          openDescriptionModal();

        });
    } catch {
      (error) => {
        setUploading(false);
        const errorMessage = error.response ? error.response.data : "Error desconocido";
        onError(errorMessage); // Llamar a onError con el mensaje de error
        return Upload.LIST_IGNORE;
      };
    }
  };
  
  const handleRemove = async (file, index) => {

    //hacer peticion para eliminar de drive y eliminar de array de urls
    console.log("Indice del elemento borrado:  "+index+" - URL del elemento borrado: "+urls[index]);
    await urls.splice(index, 1);
    setImageUploaded(urls.length > 4);
  }

  const handleValidation = (file) => {

    const validType = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!validType) {
      message.error('Solo se admiten imágenes JPG o PNG');
      return Upload.LIST_IGNORE;
    }

    const validSize = file.size / 1024 / 1024 < 5;
    if (!validSize) {
      message.error('El peso máximo de la imagen no debe pasar 5MB');
      return Upload.LIST_IGNORE;
    }

  }

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Agregue algunas fotos de su residencia
      </h2>

      <Upload
        customRequest={uploadImage}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept="image/png, image/jpeg"
        beforeUpload={handleValidation}
        onRemove={(file) => handleRemove(file, fileList.indexOf(file))}
      >
        {fileList.length >= 10 || uploading ? null : uploadButton}

      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
        <b>{previewDescription}</b>
      </Modal>

      {urls.length > 0 ? (
        <DescriptionModal
          visible={modalVisible}
          urls={urls}
          index={urls.length - 1}
          onClose={closeDescriptionModal}
          setUploading={setUploading}
        />
      ) : null}
    </>
  );
}
export default UploadComponent;
