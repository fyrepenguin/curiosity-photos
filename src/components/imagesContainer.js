
import React from 'react'
import { Img } from 'react-image';

const ImagesContainer = ({ data }) => {

  const loader = (<div className='spinner'>
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>)

  return (<div className='images-container'>
    {data.photos.map(photo => {
      return (
        <div key={photo.id} className='image-container interactive'>
          <Img src={photo.img_src} loader={loader} />
        </div>
      )
    })
    }
  </div>);
}

export default ImagesContainer;
