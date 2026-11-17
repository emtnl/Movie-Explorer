import React from 'react';
import '../../styles/app.scss';
import AppBanner from '../appbanner/AppBanner';
import AppInfo from '../appinfo/AppInfo';
import AppCatalog from '../appcatalog/AppCatalog';
import Footer from '../footer/Footer';
import FilmList from '../filmlist/FilmList';
import MovieInfo from '../../movieinfo/MovieInfo';
import ScrollToTop from '../ScrollToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <div className="app">
                <AppBanner />
                <main>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <AppInfo />
                                <AppCatalog />
                                <FilmList />
                                <Footer/>
                            </>
                        } />

                        <Route path="/movie/:id" element={<MovieInfo />} />

                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;