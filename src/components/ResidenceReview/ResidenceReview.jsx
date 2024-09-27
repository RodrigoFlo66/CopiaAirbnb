import React, { useRef, useEffect, useState } from 'react';
import { Button, Card, Popover, Rate } from 'antd';
import Meta from 'antd/es/card/Meta';
import ViewMoreReviewModal from '../ViewMoreReviewModal/ViewMoreReviewModal';
import './residenceReviewStyles.css';


function ResidenceReview({ commentResidence, idReview, cleaningRate, accuracyRate, comunicationRate, reviewOwner, hostReviews }) {
  const cardRef = useRef(null);
  const [moreReviewModal, setMoreReviewModal] = useState(false);

  const averageSegmentedRate= ((cleaningRate + accuracyRate + comunicationRate)/3).toFixed(0);
  const openMoreReviewModal = () => {
    setMoreReviewModal(true);
  }

  const closeMoreReviewModal = () => {
    setMoreReviewModal(false);
  }

  return (
    <>
        <Card
          className="review-card"
          ref={cardRef}
        >
          <Meta
            title={`Reseña de ${reviewOwner}`}
            description=
            {
              <>
                <Rate
                  disabled
                  defaultValue={averageSegmentedRate}
                />
                <div className='comment-experience'>
                  <p>{commentResidence}</p>
                </div>
                <Button type='link' style={{ padding: 0 }} onClick={openMoreReviewModal}>Mostrar más</Button>
                <ViewMoreReviewModal 
                  moreReviewModal={moreReviewModal}
                  openMoreReviewModal={openMoreReviewModal}
                  closeMoreReviewModal={closeMoreReviewModal}
                  reviewOwner={reviewOwner}
                  averageSegmentedRate={averageSegmentedRate}
                  cleaningRate={cleaningRate}
                  accuracyRate={accuracyRate}
                  comunicationRate={comunicationRate}
                  commentResidence={commentResidence}
                  hostReviews
                />
              </>
            }
          />
        </Card>
    </>
  )
}

export default ResidenceReview;