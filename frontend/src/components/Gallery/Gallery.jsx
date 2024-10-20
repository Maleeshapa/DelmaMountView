import React from 'react'
import './Gallery.css'
import assets from '../../assets/assets'

const Gallery = () => {
  return (
    <div className="Gallery">
      <div className="gal-back">
        <div className="caption" data-aos="fade-up" data-aos-duration="6000">
          <h1>Gallery</h1>
        </div>
        <div className="content-gallery">

          <section class="slide-option">
            <div id="infinite" class="highway-slider">
              <div class="container highway-barrier">
                <ul class="highway-lane">
                  <li class="highway-car"><img src={assets.gal1} alt="" /></li>
                  <li class="highway-car"><img src={assets.gal2} alt="" /></li>
                  <li class="highway-car"><img src={assets.gal1} alt="" /></li>
                  <li class="highway-car"><img src={assets.dine} alt="" /></li>
                  <li class="highway-car"><img src={assets.gal4} alt="" /></li>
                  <li class="highway-car"><img src={assets.gal5} alt="" /></li>
                  <li class="highway-car"><img src={assets.gal8} alt="" /></li>
                  <li class="highway-car"><img src={assets.gal9} alt="" /></li>
                  <li class="highway-car"><img src={assets.gal10} alt="" /></li>
                  <li class="highway-car"><img src={assets.gal11} alt="" /></li>
                  <li class="highway-car"><img src={assets.gal12} alt="" /></li>
                  <li class="highway-car"><img src={assets.gal13} alt="" /></li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  )
}

export default Gallery