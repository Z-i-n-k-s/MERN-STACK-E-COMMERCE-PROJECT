import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
    <BannerProduct/>
    <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
    <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
    
    <VerticalCardProduct   category={"mobiles"} heading={"Mobiles"}/>
    <VerticalCardProduct   category={"mouse"} heading={"Mouses"}/>
    <VerticalCardProduct   category={"televisions"} heading={"Televisions"}/>
    <VerticalCardProduct   category={"refrigerator"} heading={"Refrigerator"}/>
    <VerticalCardProduct   category={"printers"} heading={"Printers"}/>
    <VerticalCardProduct   category={"speakers"} heading={"Speakers"}/>
    <VerticalCardProduct   category={"camera"} heading={"Camera & Photography"}/>
    <VerticalCardProduct   category={"trimmers"} heading={"Trimmers"}/>
    <VerticalCardProduct   category={"processor"} heading={"Processor"}/>
    <VerticalCardProduct   category={"earphones"} heading={"Earphones & Headphones"}/>
    </div>
  )
}

export default Home