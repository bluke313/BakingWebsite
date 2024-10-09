import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import SeasonPage from './SeasonPage.js';
import Admin from './Admin.js';
import { fallItems, winterItems, springItems, summerItems } from './Items.js';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fall" element={<Fall />} />
                <Route path="/winter" element={<Winter />} />
                <Route path="/spring" element={<Spring />} />
                <Route path="/summer" element={<Summer />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

const Fall = () => {
    return (
        <SeasonPage 
            id="fall"
            title="&#x1F342; Fall &#x1F342;"
            items={fallItems}
        />
    )
}

const Winter = () => {
    return (
        <SeasonPage 
            id="winter"
            title="&#x26C4; Winter &#x26C4;"
            items={winterItems}
        />
    )
}

const Spring = () => {
    return (
        <SeasonPage 
            id="spring"
            title="&#x1F33B; Spring &#x1F33B;"
            items={springItems}
        />
    )
}

const Summer = () => {
    return (
        <SeasonPage 
            id="summer"
            title="&#x1F31E; Summer &#x1F31E;"
            items={summerItems}
        />
    )
}

export default App;