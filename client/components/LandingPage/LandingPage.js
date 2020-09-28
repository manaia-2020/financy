import React from 'react'

import Navbar from './modules/views/Navbar'
import ProductHero from './modules/views/ProductHero'
import Features from './modules/views/Features'
import PhotoGrid from './modules/views/PhotoGrid'
import Team from './modules/views/Team'
import Help from './modules/views/Help'
import AppFooter from './modules/views/AppFooter'

import withRoot from './modules/withRoot'

function LandingPage() {
  return (
    <>
      <Navbar />
      <ProductHero />
      <Features />
      <PhotoGrid />
      <Team />
      <Help />
      <AppFooter />
    </>
  )
}

export default withRoot(LandingPage)
