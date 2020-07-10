/* import React, { useState } from 'react'

const ImagesContainer = ({ data }) => {
  const loadedList = []
  let len = data.photos.length
  for (let i = 0; i < len; i++) {
    loadedList.push(false)
  }
  const [loaded, setLoaded] = useState(loadedList)

  const imageLoaded = (i) => {
    loadedList[i] = true
    console.log(i + 'image loaded')
    setLoaded(loadedList)
  }

  return (<div className='images-container'>
    {data.photos.map((photo, i) => {

      return (
        <div key={photo.id} className='image-container interactive'>
          <div className={loaded[i] ? 'hide-spinner' : 'spinner'}>
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>

          <img className={loaded[i] ? 'show-image' : 'hide-image'} src={photo.img_src} onLoad={() => imageLoaded(i)} alt='' />
        </div>
      )
    })
    }
  </div>);
}

export default ImagesContainer;
 */

import React from 'react'
import { Img } from 'react-image';

const ImagesContainer = ({ data }) => {

  const loader = (<div className='spinner'>
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>)

  return (<div className='images-container'>
    {data.photos.map((photo, i) => {
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
