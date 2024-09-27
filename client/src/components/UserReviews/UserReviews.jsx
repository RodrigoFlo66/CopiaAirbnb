import { useState } from 'react';
import ReviewsList from '../ReviewsList/ReviewsList';
import { Button, Modal, Switch } from 'antd';
import './UserReviews.css';
import HostToGuestReview from '../HostToGuestReview/HostToGuestReview';

function UserReviews({ asHostReviews, asGuestReviews, asHostAverage, asGuestAverage }) {

  const [hostReviews, setHostReviews] = useState(true)
  const [visible, setVisible] = useState(false)

  const openModal = () => {
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
  }

  const onChange = () => {
    hostReviews ? setHostReviews(false) : setHostReviews(true);
  }



  return (
    <>
      <h2 style={{ margin: 'auto' }}>Reseñas recibidas como 
        <Switch
          className="switch-reviews" 
          onChange={onChange} 
          checkedChildren="Huésped" 
          unCheckedChildren="Anfitrión" 
        />
      </h2>
      {
        hostReviews ? 
        <>
          <ReviewsList 
            detailReviews={asHostReviews}
            averageRates={asHostAverage}
          />
        </>
        : 
        <div>
          <ReviewsList 
            detailReviews={asGuestReviews}
            averageRates={asGuestAverage}
            hostReviews
          />
        </div>
      }
    </>
  )
}

export default UserReviews;