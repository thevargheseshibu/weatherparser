import React from 'react';
import './App.css';
import { useEffect } from 'react';

import DataParser from './components/DataParser';
import Visualizer from './components/Visualizer';
import FetchRawData from './components/FetchRawData';
import FetchSelectedData from './components/FetchSelectedData';
import Header from './Bootstrap/Header';
import Sidebar from './Bootstrap/Sidebar';
import Spinner from './Bootstrap/Spinner';
import { saveDataToDb, readFile, dbFetchRaw, minTemp, maxTemp, avgTemp, selectiveDBFetch } from './weatherParseUtil';
import Footer from './Bootstrap/Footer';

function App() {
    const [rawData, setRawData] = React.useState(null);
    const [viewerUpdate, setViewerUpdate] = React.useState(null);
    const [loader, setLoader] = React.useState(false);
    const [dbSaveFlag, setDBSaveFlag] = React.useState(false);
    const [viewLink] = React.useState('home');
    const [fileLoc, setFileLoc] = React.useState(null);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [header, setHeading] = React.useState(null);
    const [temperature, setTemperature] = React.useState(null);

    useEffect(() => {
        if (viewerUpdate) {
            alert(viewerUpdate);
            setViewerUpdate('');
        }
    }, [viewerUpdate]);

    const saveToDb = () => {
        //Save data to DB
        setLoader(true);
        saveDataToDb(rawData, setViewerUpdate, setDBSaveFlag, setLoader);
    };

    const dbButtonFetchRaw = () => {
        //Fetch raw data from db
        clearData();
        setLoader(true);
        dbFetchRaw(setRawData, setTemperature, setHeading, setViewerUpdate, setLoader);
    };

    const clearData = () => {
        setTemperature(null);
        setHeading(null);
        setRawData(null);
    };

    const selectiveDBButtonFetch = (sDate, eDate) => {
        clearData();
        setLoader(true);
        selectiveDBFetch(sDate, eDate, setViewerUpdate, setRawData, setTemperature, setHeading,setLoader);
    };

    const heading = header && structuredClone(Object.values(header));
    console.log('headingheading', heading);

    const body = rawData && structuredClone(rawData);
    rawData && body.splice(0, 1);

    return (
        <React.Fragment>
            <div className={loader ? 'overlay' : ''}>
                {!loader ? (
                    <React.Fragment>
                        <Header />
                        <Sidebar />
                    </React.Fragment>
                ) : null}
                <Spinner />

                {!loader ? (
                    <React.Fragment>
                        <main id="main" className="main">
                            <div className="pagetitle">
                                <h1>Dashboard</h1>
                            </div>

                            <section className="section dashboard">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="row">
                                            {viewLink === 'home' && <DataParser clearData = {clearData} setFileLoc={setFileLoc} setLoader={setLoader} readFile={readFile} saveToDb={saveToDb} fileLoc={fileLoc} setViewerUpdate={setViewerUpdate} setRawData={setRawData} rawData={rawData} />}

                                            {dbSaveFlag && <FetchRawData dbButtonFetchRaw={dbButtonFetchRaw} />}

                                            {dbSaveFlag && <FetchSelectedData startDate={startDate} setStartDate={setStartDate} setEndDate={setEndDate} endDate={endDate} selectiveDBButtonFetch={selectiveDBButtonFetch} />}

                                            {dbSaveFlag && temperature && <Visualizer temperature={temperature} minTemp={minTemp} maxTemp={maxTemp} avgTemp={avgTemp} heading={heading} body={body} />}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>

                        <Footer />
                    </React.Fragment>
                ) : null}
            </div>
        </React.Fragment>
    );
}

export default App;
