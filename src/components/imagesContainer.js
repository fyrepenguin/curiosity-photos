import React from 'react'

const ImagesContainer = ({ data }) => {
  return (
    <div className='images-container'>
      {data.photos.map(photo => {
        return (
          <div key={photo.id} className='image-container'>
            <img src={photo.img_src} alt="" />
          </div>
        )
      })
      }
    </div>
  );
}

export default ImagesContainer;