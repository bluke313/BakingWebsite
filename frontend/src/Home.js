import snowflake from './snowflake.svg'
import sample from './images/sample.png'
import sample2 from './images/sample2.jpg'
import CaramelPeanutButterBars from './images/CaramelPeanutButterBars300x400.png'
import logo from './images/caseysLogo.png'
import { fallItems, winterItems, springItems, summerItems } from './Items.js';
import './Home.css';
import { useState, useEffect } from 'react';
import { Link, Divider, TextDivider, Image, Season, Footer } from './Components.js'

const Home = () => {
  const [categoryVisisble, setCategoryVisible] = useState(false);
  const [returnVisible, setReturnVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 1000) {
      setReturnVisible(true);
    }
    else {
      setReturnVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">

      <header id="App-header">
        <Link text="Home" href="/" /><TextDivider />
        <Link text="Fall" href="/Fall" /><TextDivider />
        <Link text="Winter" href="/Winter" /><TextDivider />
        <Link text="Spring" href="/Spring" /><TextDivider />
        <Link text="Summer" href="/Summer" /><TextDivider />
        <Link text="About" href="/#About" /><TextDivider />
        <Link text="Order" href="https://forms.gle/ZekVfxBqxLscv9ud9" target="_blank"/>
      </header>

      <Divider />

      <div id="Title-section">
        <Image
          id="sample2"
          href={sample2} 
          scale={1.75}
        />
        <img src={logo} style={{width: '660px', height: '700px', objectFit: 'cover'}}/>
        <Image
          id="sample2"
          href={sample2}
          scale={1.75}
        />
      </div>

      <Divider id="Section-1-header" />

      <div id="Section-1">
        <div className="Half-div">
          <div id="Sect1TextContainer">
            <embed src={snowflake} type="image/svg+xml" width="30" />
            <h1>Pastry Perfection</h1>
            <p>Discover deliciousness at Chervet Bakery. Imagine biting into a freshly baked treat that's made with love and handled with care.</p>
            <p>No need to imagine, because our pastries are baked, packed, and delivered on the day they're made, so you're assured of oven-fresh goodness.</p>
            <p>Now that's perfection. </p>
          </div>
        </div>
        <div className="Half-div">
          <img id="Section1Img" src={sample2} width="95%" height="500" />
        </div>
      </div>

      <Divider />

      <div id="Section-2">
        <h1>Featured</h1>
        <div className="Thirds">
          <div className="Third-div">
            <Image
              id="CaramelPeanutButterBars"
              href={CaramelPeanutButterBars}
              scale={1.5}
              scaleFactor={1.1}
              titleLine1="Caramel Peanut"
              titleLine2="Butter Bars"
              // captionLine1="Heavenly pastry creations"
              // captionLine2="that will satisfy your cravings"
            />
          </div>
          <div className="Third-div">
            <Image
              id="sample2"
              href={sample2}
              scale={1.5}
              // title="Cookies"
              // captionLine1="Deliciously decadent cookies"
              // captionLine2="that are sure to impress"
            />
          </div>
          <div className="Third-div">
            <Image
              id="sample2"
              href={sample2}
              scale={1.5}
              // title="Breads"
              // captionLine1="Freshly-baked loaves of bread"
              // captionLine2="you'll find irresistible"
            />
          </div>
        </div>
      </div>

      <Divider />

      <Season items={fallItems} text="&#x1F342; Fall &#x1F342;" id="Fall" />
      <Season items={winterItems} text="&#x26C4; Winter &#x26C4;" id="Winter" />
      <Season items={springItems} text="&#x1F33B; Spring &#x1F33B;" id="Spring" />
      <Season items={summerItems} text="&#x1F31E; Summer &#x1F31E;" id="Summer" />

      <div id="About">
        <h1>ABOUT</h1>
      </div>

      <Footer />

      <a
        className={`Return-button ${returnVisible ? 'show' : ''}`}
        href="#App-header"
      >
        &#x2191;
      </a>

    </div>
  );
}

export default Home;
