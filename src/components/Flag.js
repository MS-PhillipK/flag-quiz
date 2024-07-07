// src/components/Flag.js
import React from 'react';

const Flag = ({ src }) => {
  return (
    <div>
      <img src={src} alt="Country Flag" style={{ width: '200px', height: 'auto' }} />
    </div>
  );
};

export default Flag;
