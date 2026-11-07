import React from 'react';
import '../../styles/app.scss';
import AppBanner from '../appbanner/AppBanner';
import AppInfo from '../appinfo/AppInfo';
import AppCatalog from '../appcatalog/AppCatalog';
import Footer from '../footer/Footer';
const App = () => {
    return (
        <div className="app">
            <main>
                <AppBanner />
                <AppInfo />
                <AppCatalog />
                <Footer/>
            </main>
        </div>
    );
};

export default App;