import logo from './logo.svg';
import snowflake from './snowflake.svg'
import sample from './images/sample.png'
import sample2 from './images/sample2.jpg'
import './App.css';
import { useState } from 'react';
import { Link, Divider, Image } from './Components.js'

function App() {
  const [categoryShown, setCategoryShown] = useState(false);

  return (
    <div className="App">

      <header className="App-header">
        <Link text="Category" />
        <Link text="Season"/>
      </header>

      <Divider />

      <div className="Title-section">
        <Image href={sample2} />

        <Image href={sample2} />
      </div>

      <Divider />

      <div className="Section-1">
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

      <div className="Section-2">
        <h1>What you'll love</h1>
        <div className="Thirds">
          <div className="Third-div">
            <Image
              href={sample2}
              title="Pasteries"
              captionLine1="Heavenly pastry creations" 
              captionLine2="that will satisfy your cravings"
            />
          </div>
          <div className="Third-div">
            <Image
              href={sample2}
              title="Cookies"
              captionLine1="Deliciously decadent cookies" 
              captionLine2="that are sure to impress"
            />
          </div>
          <div className="Third-div">
            <Image
              href={sample2}
              title="Breads"
              captionLine1="Freshly-baked loaves of bread" 
              captionLine2="you'll find irresistible"
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="Section-4">

      </div>

      <footer className="Footer">
        <div className="Quarter-div"><h1>Find us here</h1><p>hello@reallygreatsite.com</p></div>
        <div className="Quarter-div"><p>512 Covington Terrace</p><p>Moorestown</p><p>NJ, 08057</p></div>
        <div className="Quarter-div">Casey's Cookies</div>
        <div className="Quarter-div">test</div>
      </footer>

    </div>
  );
}

export default App;
