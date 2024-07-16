import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
    <BannerProduct/>
    <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
    </div>
  )
}

export default Home