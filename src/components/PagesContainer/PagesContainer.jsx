import React from 'react';
import './pagesContainerStyles.css';

function PagesContainer({ children }) {
  return (
    <div className="pages-container">
      {children}
    </div>
  );
};


export default PagesContainer;
