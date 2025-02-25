import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Swiper from 'react-id-swiper';
import {yearsSorted} from '../data'

import Arrow from './../components/arrow'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  height: ${props => props.height}px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const getSwiperHeight = showDesc => showDesc ? '25%' : '70%'
const SwiperWrapper = styled.div`
  flex: 0 0 ${props => getSwiperHeight(props.showDesc)};
  transition: flex 500ms ease;
`

const getDescriptionHeight = showDesc => showDesc ? '25%' : '30%'
const DescriptionWrapper = styled.div`
  flex: ${props => getDescriptionHeight(props.showDesc)};
  transition: flex 500ms ease;
`

const getBackgroundColor = colors => {
  if (colors.length > 1) {
    return `linear-gradient(90deg, #${colors[0].hex}, #${colors[1].hex})`
  } else {
    return `#${colors[0].hex}`
  }
}

const Slide = styled.div`
  text-align: center;
  height: 100%;
  background: ${props => getBackgroundColor(props.colors)};
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(0);
`

const getFontColor = colors => {
  if (colors.length > 1) {
    return `
    background: linear-gradient(90deg, #${colors[0].hex}, #${colors[1].hex});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    `
  } else {
    return `color: #${colors[0].hex};`
  }
}

const Year = styled.div`
  font-size: ${props => props.showDesc ? '4.5rem' : '6rem'};
  font-family: 'Futura', 'Montserrat', sans-serif;
  ${props => getFontColor(props.colors)}
  filter: brightness(0.85);
  transition: font-size 500ms ease;
  letter-spacing: -0.02em;
  font-weight: 800;
`

const TitleSection = styled.section`
  font-family: 'Overpass', 'Open Sans', sans-serif;
  padding: 1rem 5vw;
  padding-bottom: 0;

  h2 {
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.03em;
  }

  p {
    margin: 0;
  }
`

const DescriptionSection = styled.section`
  font-size: 14px;
  font-family: 'Overpass', 'Open Sans', sans-serif;
  font-weight: 400;
  padding: 1rem 5vw;
  padding-top: 0;
  color: #ababab;
  opacity: ${props => props.showDesc ? 1 : 0};
  transition: opacity 0.5s ease;
  line-height: 1.5;
`

const Author = styled.p`
  font-style: italic;
  color: black;
  margin-top: 10px !important;
  font-family: 'Overpass', 'Open Sans', sans-serif;
`

export default () => {
  const [height, setHeight] = useState()
  const [showDesc, setShowDesc] = useState(false)
  useEffect(() => {
    setHeight(window.innerHeight)
    const sh = height => setHeight(height)
    window.addEventListener('resize', () => {
      sh(window.innerHeight)
    })

    return () => window.removeEventListener('resize', null)
  }, [])

  const params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    renderPrevButton: () => <Arrow className='swiper-button-prev' />,
    renderNextButton: () => <Arrow className='swiper-button-next' rotate={180}/>
  }
  const [swiper, setSwiper] = useState(null)
  const [index, setIndex] = useState(yearsSorted.length - 1)
  useEffect(() => {
    const setSlideIndex = index => setIndex(index)
    if (swiper !== null) {
      swiper.on('slideChange', () => {
        setSlideIndex(swiper.activeIndex)
      })

      return () => {
        swiper.off('slideChange')
      }
    }
  }, [swiper])

  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [author, setAuthor] = useState("")
  useEffect( () => {
    if (index) {
      const getColorCode = year => year.colors.map(entry => entry.code).join(" - ")
      setCode(getColorCode(yearsSorted[index]))

      const getColorName = year => year.colors.map(entry => entry.name).join(" - ")
      setName(getColorName(yearsSorted[index]))

      setDesc(yearsSorted[index].description)
      setAuthor(yearsSorted[index].author)
    }
  }, [index])

  return (
    <Wrapper height={height}>
        <SwiperWrapper showDesc={showDesc} onClick={() => setShowDesc(false)}>
          {yearsSorted && (
            <Swiper {...params} initialSlide={yearsSorted.length} getSwiper={setSwiper} updateOnWindowResize={true}>
              {yearsSorted.map(y => {
                return <Slide 
                key={y.year}
                colors={y.colors}>
                  <Year showDesc={showDesc} colors={y.colors}>{y.year}</Year>
                </Slide>
              })}
            </Swiper>
          )}
        </SwiperWrapper>

        <DescriptionWrapper showDesc={showDesc} onClick={() => setShowDesc(!showDesc)}>
          <TitleSection>
            <h2>PANTONE</h2>
            <p>{code}</p>
            <p>{name}</p>
          </TitleSection>
          <DescriptionSection showDesc={showDesc}>
            <p>{desc}</p>
            <Author>{author}</Author>
          </DescriptionSection>
        </DescriptionWrapper>
    </Wrapper>
  )
}
