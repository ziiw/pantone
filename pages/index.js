import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Swiper from 'react-id-swiper';
import { years } from './../public/data.json'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  height: ${props => props.height}px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const SwiperWrapper = styled.div`
  flex: 0 1 70%;
`

const DescriptionWrapper = styled.div`
  flex: 0 1 30%;
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
  font-family: Arial;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`

const getFontColor = colors => {
  return colors[0].hex
}

const Year = styled.div`
  font-size: 6rem;
  font-family: 'Futura';
  color: #${props => getFontColor(props.colors)};
  filter: brightness(0.85);
`

const TitleSection = styled.section`
  font-family: 'Overpass';
  padding: 1rem 5vw;

  h2 {
    font-weight: 700;
    margin: 0;
  }

  p {
    margin: 0;
  }
`

const DescriptionSection = styled.section`
  font-family: 'Overpass';
  font-weight: 400;
  padding: 1rem 5vw;
  color: #ababab;
`

const Author = styled.p`
  font-style: italic;
  color: black;
`

export default () => {
  const [height, setHeight] = useState()
  const [showDesc, setShowDesc] = useState(false)
  const [yearsSorted, setYearsSorted] = useState(null)
  useEffect(() => {
    const sorted = Array.prototype.slice.call(years).sort((a, b) => a.year > b.year)
    setYearsSorted(sorted)
    setIndex(sorted.length - 1)
    setHeight(window.innerHeight)
    const sh = height => setHeight(height)
    window.addEventListener('resize', () => {
      sh(window.innerHeight)
    })

    return () => window.removeEventListener('resize', null)
  }, [])

  const [swiper, setSwiper] = useState(null)
  const [index, setIndex] = useState(null)
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
    if (yearsSorted) {
      const getColorCode = year => year.colors.map(entry => entry.code).join(" - ")
      setCode(getColorCode(yearsSorted[index]))

      const getColorName = year => year.colors.map(entry => entry.name).join(" - ")
      setName(getColorName(yearsSorted[index]))

      setDesc(yearsSorted[index].description)
      setAuthor(yearsSorted[index].author)
    }
  }, [yearsSorted, index])

  return (
    <Wrapper height={height}>
        <SwiperWrapper>
          {yearsSorted && (
            <Swiper initialSlide={yearsSorted.length} getSwiper={setSwiper} updateOnWindowResize={true}>
              {yearsSorted.map(y => {
                return <Slide 
                key={y.year}
                colors={y.colors}>
                  <Year colors={y.colors}>{y.year}</Year>
                </Slide>
              })}
            </Swiper>
          )}
        </SwiperWrapper>

        <DescriptionWrapper onClick={() => setShowDesc(!showDesc)}>
          <TitleSection>
            <h2>PANTONE</h2>
            <p>{code}</p>
            <p>{name}</p>
          </TitleSection>
          {showDesc && (
            <DescriptionSection>
              <p>{desc}</p>
              <Author>{author}</Author>
            </DescriptionSection>
          )}
        </DescriptionWrapper>
    </Wrapper>
  )
}
