import React from 'react'
import ImagesContainer from './imagesContainer';

const ImagesData = ({ data }) => {

  return (
    data ? data.photos.length !== 0 ? <ImagesContainer data={data} />
      : <p className='info'> No photos on that day with the selected camera. Try changing camera type or date</p> : <p className='info'> Please Select Sol and Camera</p>


  );
}

export default ImagesData;