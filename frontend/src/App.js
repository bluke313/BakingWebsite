import './App.css'
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import SeasonPage from './SeasonPage.js';
import AdminPage from './AdminPage.js';
import { backendUrl } from './Components.js';
import { useState, useEffect } from 'react';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fall" element={<Fall />} />
                <Route path="/winter" element={<Winter />} />
                <Route path="/spring" element={<Spring />} />
                <Route path="/summer" element={<Summer />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    );
};

const Fall = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/fall`)
            .then((response) => response.json())
            .then((data) => setData(data.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <SeasonPage 
            id="fall"
            title="&#x1F342; Fall &#x1F342;"
            items={data}
        />
    )
}

const Winter = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/winter`)
            .then((response) => response.json())
            .then((data) => setData(data.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <SeasonPage 
            id="winter"
            title="&#x26C4; Winter &#x26C4;"
            items={data}
        />
    )
}

const Spring = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/spring`)
            .then((response) => response.json())
            .then((data) => setData(data.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <SeasonPage 
            id="spring"
            title="&#x1F33B; Spring &#x1F33B;"
            items={data}
        />
    )
}

const Summer = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/summer`)
            .then((response) => response.json())
            .then((data) => setData(data.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <SeasonPage 
            id="summer"
            title="&#x1F31E; Summer &#x1F31E;"
            items={data}
        />
    )
}

export default App;