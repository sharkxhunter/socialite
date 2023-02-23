import React from 'react'
import Spinner from '../img/Spinner.gif'
import { Image } from 'react-bootstrap'

const Loader = (width, height) => {
  return (
    <div>
      <div className='d-flex justify-content-center'>
        <Image fluid src={Spinner} width={width} height={height} />
      </div>
    </div>
  )
}

export default Loader
