import React from 'react'
import './Dine.css'

const Dine = () => {
  return (
    <div className='Dine'>
      <div className="dine-back-opacity">
        <div className="dine-back">
          
          <div className="content-area-dine" data-aos="fade-up" data-aos-duration="3000"  >
            <div className="caption-dine">
              <h1>Dining</h1>
            </div>
            <div className="dine-header">
              <h1>On-site Restaurant</h1>
            </div>
            <div className="dine-description">
              <p>"Our on-site restaurant offers a delightful dining experience with breakfast options including vegetarian, halal, and traditional English dishes.
                For lunch and dinner, guests can enjoy a diverse menu featuring a variety of international cuisines."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dine