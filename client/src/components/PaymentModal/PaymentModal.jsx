import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons';
import './paymentModalStyles.css'

function PaymentModal() {

  const [paymentModal, setPaymentModal] = useState(false);
  const [successfulPaymentModal, setSuccessfulPaymentModal] = useState(false);

  const openPaymentModal = () => {
    setPaymentModal(true);
  };

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  const openSuccessfulPaymentModal = () => {
    setSuccessfulPaymentModal(true);
  };

  const closeSuccessfulPaymentModal = () => {
    setSuccessfulPaymentModal(false);
  };

  const paymentMade = () => {
    setSuccessfulPaymentModal(true);
    openSuccessfulPaymentModal();
  }

  useEffect(() => {
    openPaymentModal();
  }, []);
  return (
    <>
      <Modal
        className="payment-modal"
        width={"50%"}
        title={
          <div className="title-payment-modal">
            <h2>Confirmación de Pago</h2>
            <Divider />
          </div>
        }
        open={paymentModal}
        onCancel={closePaymentModal}
        footer={null}
        destroyOnClose="true"
      >
        <div className="content-payment-modal">
          {
            <>
              <p>Precio Total: <span></span>Bs. Recuperar Precio</p>
              <Divider />
            </>
          }
        </div>
        <div className="btns-payment-modal">
          <div>
            <Button type='primary' htmlType='button' onClick={paymentMade} style={{ margin: '0 30px' }}>Confirmar Pago</Button>
          </div>
          <div>
            <Button htmlType='button' style={{ margin: '0 30px' }}>No Confirmar Pago</Button>
          </div>
        </div>
        <Modal
          className="successful-payment-modal"
          open={successfulPaymentModal}
          onCancel={closeSuccessfulPaymentModal && closePaymentModal}
          footer={null}
          destroyOnClose="true"
        >
          <div className="successful-payment-content">
            {
              <>
                <CheckCircleTwoTone twoToneColor="#2AD06D" />    Pago realizado exitosamente!
              </>
            }
          </div>
        </Modal>
      </Modal>

    </>
  )
}

export default PaymentModal