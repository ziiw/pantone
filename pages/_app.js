import App from 'next/app'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import 'swiper/css'

const GlobalTheme = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    // Fixer la taille à l'horizontale sur iOS
    -webkit-text-size-adjust: 100%;
  }
  
  /* Font for year numbers - replacing Futura */
  @font-face {
    font-family: 'Futura';
    src: url('/fonts/Futura-Bold.eot'); /* IE9 Compat Modes */
    src: url('/fonts/Futura-Bold.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/Futura-Bold.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/Futura-Bold.woff') format('woff'), /* Pretty Modern Browsers */
         url('/fonts/Futura-Bold.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('/fonts/Futura-Bold.svg#svgFontName') format('svg'); /* Legacy iOS */
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  /* Font for descriptions - replacing Overpass */
  @font-face {
    font-family: 'Overpass';
    src: url('/fonts/Overpass-Regular.eot'); /* IE9 Compat Modes */
    src: url('/fonts/Overpass-Regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/Overpass-Regular.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/Overpass-Regular.woff') format('woff'), /* Pretty Modern Browsers */
         url('/fonts/Overpass-Regular.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('/fonts/Overpass-Regular.svg#svgFontName') format('svg'); /* Legacy iOS */
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Overpass';
    src: url('/fonts/Overpass-Italic.eot'); /* IE9 Compat Modes */
    src: url('/fonts/Overpass-Italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/Overpass-Italic.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/Overpass-Italic.woff') format('woff'), /* Pretty Modern Browsers */
         url('/fonts/Overpass-Italic.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('/fonts/Overpass-Italic.svg#svgFontName') format('svg'); /* Legacy iOS */
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Overpass';
    src: url('/fonts/Overpass-Black.eot'); /* IE9 Compat Modes */
    src: url('/fonts/Overpass-Black.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/Overpass-Black.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/Overpass-Black.woff') format('woff'), /* Pretty Modern Browsers */
         url('/fonts/Overpass-Black.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('/fonts/Overpass-Black.svg#svgFontName') format('svg'); /* Legacy iOS */
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
  
  .swiper-container {
    height: 100%;
  }
`
const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalTheme />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
