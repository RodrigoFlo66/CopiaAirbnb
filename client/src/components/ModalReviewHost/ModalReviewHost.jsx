import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import AddReview from '../AddReview/AddReview';
import HostToGuestReview from '../HostToGuestReview/HostToGuestReview';

const ModalReviewHost = ({setVisible, visible, onCancel, userId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal visible={visible} onCancel={handleCancel} onOk={handleOk} footer={null}>
      <div style={{ width: '100%' }}>
        <HostToGuestReview 
          closeModal={handleCancel}
          userId={userId}
        />
      </div>
    </Modal>
    </>
  );
};
export default ModalReviewHost;