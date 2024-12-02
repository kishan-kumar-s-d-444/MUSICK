import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LanguageFolders from './LanguageFolders';
import LanguagePage from './LanguagePage';

const Home = () => {
    return (
        <div className="home">
            <Routes>
                <Route path="/" element={<LanguageFolders />} />
                <Route path="/language/:lang" element={<LanguagePage />} />
            </Routes>
        </div>
    );
}

export default Home;
