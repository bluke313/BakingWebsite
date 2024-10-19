import snowflake from './snowflake.svg'

import logo from './images/caseysLogo.png'
import './Home.css';
import { useState, useEffect } from 'react';
import { Link, Divider, TextDivider, Image, Season, Footer, seasonsToString } from './Components.js'

const Home = () => {
  const [returnVisible, setReturnVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [fallItems, setFallItems] = useState([]);
  const [winterItems, setWinterItems] = useState([]);
  const [springItems, setSpringItems] = useState([]);
  const [summerItems, setSummerItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);

  const sample2 = "http://localhost:3001/images/sample2.jpg";

  useEffect(() => {

    fetch('http://localhost:3001/fall')
      .then((response) => response.json())
      .then((data) => setFallItems(data.data))
      .catch((error) => console.error('Error fetching data:', error));
    fetch('http://localhost:3001/winter')
      .then((response) => response.json())
      .then((data) => setWinterItems(data.data))
      .catch((error) => console.error('Error fetching data:', error));
    fetch('http://localhost:3001/spring')
      .then((response) => response.json())
      .then((data) => setSpringItems(data.data))
      .catch((error) => console.error('Error fetching data:', error));
    fetch('http://localhost:3001/summer')
      .then((response) => response.json())
      .then((data) => setSummerItems(data.data))
      .catch((error) => console.error('Error fetching data:', error));
    fetch('http://localhost:3001/featured')
      .then((response) => response.json())
      .then((data) => setFeaturedItems(data.data))
      .catch((error) => console.error('Error fetching data:', error));

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;

      if (scrollPosition > 1000) {
        setReturnVisible(true);
      }
      else {
        setReturnVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <div className="App">

      <header id="App-header">
        <div className="App-header-text">
          <Link text="Home" href="/" /><TextDivider />
          <Link text="Fall" href="/Fall" /><TextDivider />
          <Link text="Winter" href="/Winter" /><TextDivider />
          <Link text="Spring" href="/Spring" /><TextDivider />
          <Link text="Summer" href="/Summer" /><TextDivider />
          <Link text="About" href="/#About" /><TextDivider />
          <Link text="Order" href="https://forms.gle/ZekVfxBqxLscv9ud9" target="_blank" />
        </div>
        <div>
          {/* <Link text="Admin" href="/Admin" style={{}} /> */}
        </div>
      </header>

      <Divider />

      <div id="Title-section">
        <Image
          id="sample2"
          imageUrl={sample2}
          scale={windowWidth / 1100}
          clickable={false}
        />
        <img src={logo} style={{ width: '40%', maxHeight: '710px', objectFit: 'cover' }} />
        <Image
          id="sample2"
          imageUrl={sample2}
          scale={windowWidth / 1100}
          clickable={false}
        />
      </div>

      <Divider id="Section-1-header" />

      <div id="Section-1">
        <div className="Half-div">
          <div id="Sect1TextContainer">
            <embed src={snowflake} type="image/svg+xml" width="30" />
            <h1>Welcome to Casey’s!</h1>
            <p>Welcome to Casey’s, a pet project started by two brothers to show their love and appreciation for everything their mother has done for both her family and her community. Our mother, Casey, is a pediatrician by profession and an enthusiastic baking hobbyist. At home, we are blessed to be surrounded by the love and care she puts into her baking and everything else she does. We hope that you enjoy browsing our mother’s handcrafted creations and feel inspired to try them out for yourself!
            </p>
            <p></p>
            <p></p>
          </div>
        </div>
        <div className="Half-div">
          <img id="Section1Img" src={logo} style={{ width: '80%', borderStyle: 'solid', borderRadius: '100px', borderColor: 'maroon', borderWidth: '5px' }} />
        </div>
      </div>

      <Divider />

      <div id="Section-2">
        <h1>Featured</h1>
        <div className="Thirds">
          {featuredItems.map((elem, i) => {
            return (
                <Image
                  key={i}
                  id={elem.id}
                  name={elem.name}
                  imageUrl={elem.imageUrl}
                  scale={windowWidth / 1300}
                  scaleFactor={1.1}
                  titleLine1={elem.titleLine1}
                  titleLine2={elem.titleLine2}
                  seasons={seasonsToString(elem.fall, elem.winter, elem.spring, elem.summer)}
                  descriptionParagraph1={elem.descriptionParagraph1}
                  descriptionParagraph2={elem.descriptionParagraph2}
                  publishedDate={elem.publishedDate}
                />
            )
          })}
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
