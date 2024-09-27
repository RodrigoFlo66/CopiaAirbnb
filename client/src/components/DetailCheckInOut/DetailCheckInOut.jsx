import React from 'react';
import { Divider } from 'antd';
import './detailCheckInOutStyles.css';

function DetailCheckInOut({ checkIn, checkOut }) {
  return (
    <div className="check-in-out-container">
      <div className="check-in-container">
        <h3>Check In</h3>
        <p>{checkIn}</p>
      </div>
      <Divider type='vertical' />
      <div className="check-out-container">
        <h3>Check Out</h3>
        <p>{checkOut}</p>
      </div>
      <Divider />
    </div>
  )
}

export default DetailCheckInOut