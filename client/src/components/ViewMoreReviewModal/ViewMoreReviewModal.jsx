import React from 'react';
import { Modal, Rate } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './viewMoreReviewModalStyles.css';

function ViewMoreReviewModal({ reviewOwner, moreReviewModal, openMoreReviewModal, closeMoreReviewModal, cleaningRate, accuracyRate, comunicationRate, commentResidence, averageSegmentedRate, hostReviews }) {
  return (
    <>
      <Modal
        open={moreReviewModal}
        onCancel={closeMoreReviewModal}
        destroyOnClose='true'
        footer={null}
        title={
          <>
            <h3>Reseña de {reviewOwner}</h3>
            <h4>Valoración general: <StarFilled style={{fontSize:'13px'}}/> {averageSegmentedRate}</h4>
            <div className="more-review-modal-container">
              <div className="segmented-rates-container">
                <div>
                  <h4>Limpieza</h4>
                  <Rate
                    disabled
                    defaultValue={cleaningRate}
                  />
                </div>
                {hostReviews ? 
                  <div>
                    <h4>Puntualidad</h4>
                    <Rate
                      disabled
                      defaultValue={accuracyRate}
                    />
                  </div>
                :
                  <div>
                      <h4>Exactitud</h4>
                      <Rate
                        disabled
                        defaultValue={accuracyRate}
                      />
                  </div>}
                <div>
                  <h4>Comunicación</h4>
                  <Rate
                    disabled
                    defaultValue={comunicationRate}
                  />
                </div>
              </div>
              <div className="more-review-comment">
                <p>{commentResidence}</p>
              </div>
            </div>
          </>
        }
      >

      </Modal>
    </>
  )
}

export default ViewMoreReviewModal;