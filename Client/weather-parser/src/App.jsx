import React from 'react';
import './App.css';
import { saveDataToDb, readFile, dbFetchRaw, minTemp, maxTemp, avgTemp, selectiveDBFetch } from './weatherParseUtil';
import { useEffect } from 'react';
import FetchData from './components/FetchData';

function App() {
    const [rawData, setRawData] = React.useState(null);
    const [viewerUpdate, setViewerUpdate] = React.useState(null);
    const [loader, setLoader] = React.useState(false);
    const [dbSaveFlag, setDBSaveFlag] = React.useState(false);
    const [viewLink, setViewLink] = React.useState('home');
    const [fileLoc, setFileLoc] = React.useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [headinger, setHeading] = React.useState(null);
    const [temperature, setTemperature] = React.useState(null);

    const saveToDb = () => {
        setLoader(true)
        saveDataToDb(rawData, setViewerUpdate, setDBSaveFlag, setLoader);
    };
    const dbButtonFetchRaw = () => {
        setLoader(true)
        dbFetchRaw(setRawData, setTemperature, setHeading, setViewerUpdate,setLoader);
    };
    const clearData = () => {
        setTemperature(null);
        setHeading(null);
        setRawData(null);
    };

    useEffect(() => {
        if (viewerUpdate) {
            alert(viewerUpdate);
            console.log('cameher');
            setViewerUpdate('');
        }
    }, [viewerUpdate]);

    const selectiveDBButtonFetch = (sDate, eDate) => {
        selectiveDBFetch(sDate, eDate, setViewerUpdate, setRawData, setTemperature, setHeading);
    };

    const TableRow = ({ row }) => {
        return (
            <>
                <tr>
                    {row.map((val, count) => {
                        if (count === 0) {
                            return <th scope="row">{val}</th>;
                        } else {
                            return <td>{val}</td>;
                        }
                    })}
                </tr>
            </>
        );
    };

    const heading = headinger && structuredClone(Object.values(headinger));
    console.log('headingheading', heading);

    const rest = rawData && structuredClone(rawData);
    rawData && rest.splice(0, 1);

    console.log('heading', headinger);

    console.log('rest', rest);
    console.log('dbSaveFlag', dbSaveFlag, viewLink);

    console.log('document.body.className', document.body.className);

    return (
        <React.Fragment>

            <div class={loader ? "overlay" : ""}>

                {!loader ? <React.Fragment>

                    <header id="header" className="header fixed-top d-flex align-items-center">
                        <div className="d-flex align-items-center justify-content-between">
                            <a href="index.html" className="logo d-flex align-items-center">
                                <img src="./assets/img/logo.png" alt="" />
                                <span className="d-none d-lg-block">Web Parser</span>
                            </a>
                            <i
                                className="bi bi-list toggle-sidebar-btn"
                                onClick={() => {
                                    if (document.body.className) {
                                        document.body.className = '';
                                    } else {
                                        document.body.className = 'toggle-sidebar';
                                    }
                                }}></i>
                        </div>
                    </header>


                    <aside id="sidebar" className="sidebar">
                        <ul className="sidebar-nav" id="sidebar-nav">
                            <li className="nav-item">
                                <a className="nav-link " href="index.html">
                                    <i className="bi bi-grid"></i>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </aside>
                </React.Fragment> : null
                }

                <div class={"w-100 d-flex justify-content-center align-items-center"}>

                    <div class="spinner-border" role="status" style={{ width: "1rem", height: "1rem", "z-index": " 20" }}>

                    </div>

                </div>

                {!loader ? <React.Fragment>
                    <main id="main" className="main">
                        <div className="pagetitle">
                            <h1>Dashboard</h1>
                        </div>

                        <section className="section dashboard">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-xxl-4 col-md-6">
                                            <div className="card info-card dataFetch-card">
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        Data Fetcher <span>| CSV</span>
                                                    </h5>

                                                    {viewLink === 'home' && (
                                                    <FetchData setFileLoc={setFileLoc} setLoader={setLoader}  readFile ={readFile} saveToDb={saveToDb} fileLoc={fileLoc}  setViewerUpdate={setViewerUpdate} setRawData={setRawData} rawData={rawData} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {dbSaveFlag && (
                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card revenue-card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            Fetch Data from DB <span>| Raw Data </span>
                                                        </h5>
                                                        <div className="d-flex align-items-center">
                                                            <React.Fragment>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-secondary"
                                                                    onClick={() => {
                                                                        dbButtonFetchRaw();
                                                                    }}>
                                                                    Fetch
                                                                </button>
                                                            </React.Fragment>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {dbSaveFlag && (
                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card revenue-card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            Select the range <span>| Date </span>
                                                        </h5>

                                                        <div className="d-flex align-items-center">
                                                            <label for="Start" style={{ 'margin-right': '10px' }}>
                                                                Start Date :
                                                            </label>

                                                            <input
                                                                type="date"
                                                                id="Start"
                                                                min="2021-01-01"
                                                                max="2022-01-01"
                                                                name="Start"
                                                                value={startDate}
                                                                onChange={(e) => {
                                                                    setStartDate(e.target.value);
                                                                    setEndDate('');
                                                                }}></input>
                                                        </div>

                                                        <br />

                                                        <div className="d-flex align-items-center">
                                                            <label for="End" style={{ 'margin-right': '10px' }}>
                                                                End Date :
                                                            </label>
                                                            <input
                                                                type="date"
                                                                id="End"
                                                                min={startDate ? startDate : '2021-01-01'}
                                                                max="2022-01-01"
                                                                value={endDate}
                                                                name="End"
                                                                onChange={(e) => {
                                                                    setEndDate(e.target.value);
                                                                }}></input>
                                                        </div>
                                                        <br />

                                                        <div className="d-flex align-items-center">
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary"
                                                                onClick={() => {
                                                                    selectiveDBButtonFetch(startDate, endDate);
                                                                }}>
                                                                Fetch
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {dbSaveFlag && temperature && (
                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card revenue-card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            {' '}
                                                            Processed Output <span>| Aggregation Functional Output </span>
                                                        </h5>

                                                        <React.Fragment>
                                                            <div className="d-flex align-items-center">
                                                                <label>Minimum :{temperature && minTemp(temperature)}</label>
                                                            </div>

                                                            <br />

                                                            <div className="d-flex align-items-center">
                                                                <label>Maximum :{temperature && maxTemp(temperature)}</label>
                                                            </div>

                                                            <br />

                                                            <div className="d-flex align-items-center">
                                                                <label>Average :{temperature && avgTemp(temperature)}</label>
                                                            </div>
                                                        </React.Fragment>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="col-lg-12">
                                            <div className="card info-card customers-card">
                                                <div
                                                    className="card-body"
                                                    style={{
                                                        'overflow-y': 'scroll',
                                                        height: '610px',
                                                        width: '900px',
                                                        'overflow-x': ' scroll',
                                                        width: '100%',
                                                    }}>
                                                    <h5 className="card-title">
                                                        Raw Data Display <span>| CSV </span>
                                                    </h5>

                                                    {temperature && heading && rest && (
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    {heading.map((heading) => (
                                                                        <th scope="col">{heading}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {rest.map((row) => (
                                                                    <TableRow row={row} />
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    <footer id="footer" className="footer">
                        <div className="copyright">
                            &copy; Copyright{' '}
                            <strong>
                                <span>Web Parser</span>
                            </strong>
                            . All Rights Reserved
                        </div>
                        <div className="credits"></div>
                    </footer>
                </React.Fragment> : null}
            </div>

        </React.Fragment >

        // <div className="root">

        //     {dbSaveFlag && (
        //         <div className="appLink">
        //             {viewLink !== 'home' && (
        //                 <a
        //                     className="btn btn-primary btn btn-secondary"
        //                     onClick={() => {
        //                         setViewLink('home');
        //                         clearData();
        //                     }}
        //                     href="#"
        //                     role="button">
        //                     Home
        //                 </a>
        //             )}
        //             {viewLink !== 'rawdata' && (
        //                 <a
        //                     className="btn btn-primary btn btn-secondary"
        //                     onClick={() => {
        //                         setViewLink('rawdata');
        //                         clearData();
        //                     }}
        //                     href="#"
        //                     role="button">
        //                     Raw Data
        //                 </a>
        //             )}
        //             {viewLink !== 'selectivedata' && (
        //                 <a
        //                     className="btn btn-primary btn btn-secondary"
        //                     onClick={() => {
        //                         setViewLink('selectivedata');
        //                         clearData();
        //                     }}
        //                     href="#"
        //                     role="button">
        //                     Selective Data
        //                 </a>
        //             )}
        //         </div>
        //     )}

        //     <div className="App renderData">
        //         {viewLink === 'home' && (
        //             <div className="fetchComponent ">
        //                 <h2 >
        //                     <span className="badge badge-primary fetchComponent ">PARSER : DATA FETCH  (CSV)) </span>

        //                 </h2>

        //                     <input

        //                         type="file"
        //                         onChange={async (e) => {
        //                             setFileLoc(e.target.files[0]);
        //                         }}
        //                     />

        //                     <button
        //                         type="button"
        //                         className="btn btn-secondary"
        //                         onClick={() => {
        //                             console.log('fileLoc', fileLoc);
        //                             readFile(fileLoc, setViewerUpdate, setRawData);
        //                             console.log('df', rawData);
        //                             //  e.target.value = ""
        //                         }}>
        //                         Fetch Data
        //                     </button>

        //                     {rawData && (
        //                         <button
        //                             type="button"
        //                             className="btn btn-secondary"
        //                             onClick={() => {
        //                                 saveToDb();
        //                                 //  e.target.value = ""
        //                             }}>
        //                             Save to DB
        //                         </button>
        //                     )}

        //             </div>
        //         )}

        //         <br />

        //         {dbSaveFlag && viewLink === 'rawdata' && (
        //             <div className="dbComponentRaw">
        //                 <h2>
        //                     <span className="badge badge-primary fetchComponent ">Fetch Raw Data from the DB : </span>
        //                 </h2>

        //                 <button
        //                     type="button"
        //                     className="btn btn-secondary"
        //                     onClick={() => {
        //                         dbButtonFetchRaw();
        //                     }}>
        //                     Fetch
        //                 </button>
        //             </div>
        //         )}

        //         <br />

        //         {dbSaveFlag && viewLink === 'selectivedata' && (
        //             <div className="dbComponentSelective">
        //                 <h2>
        //                     <span className="badge badge-primary fetchComponent ">Fetch Selective Date Data from the DB : </span>
        //                 </h2>

        //                 <label for="Start">
        //                     <h4>
        //                         <span className="badge badge-primary fetchComponent ">Start Date : </span>
        //                     </h4>
        //                 </label>
        //                 <input
        //                     type="date"
        //                     id="Start"
        //                     min="2021-01-01"
        //                     max="2022-01-01"
        //                     name="Start"
        //                     value={startDate}
        //                     onChange={(e) => {
        //                         setStartDate(e.target.value);
        //                         setEndDate('');
        //                     }}></input>

        //                 <label for="End">
        //                     <h4>
        //                         <span className="badge badge-primary fetchComponent ">End Date : </span>
        //                     </h4>
        //                 </label>
        //                 <input
        //                     type="date"
        //                     id="End"
        //                     min={startDate ? startDate : '2021-01-01'}
        //                     max="2022-01-01"
        //                     value={endDate}
        //                     name="End"
        //                     onChange={(e) => {
        //                         setEndDate(e.target.value);
        //                     }}></input>

        //                 <button
        //                     type="button"
        //                     className="btn btn-secondary"
        //                     onClick={() => {
        //                         selectiveDBButtonFetch(startDate, endDate);
        //                     }}>
        //                     Fetch
        //                 </button>

        //                 {console.log('temperature', temperature)}
        //             </div>
        //         )}

        //         {temperature && (
        //             <div className="fetchComponent ">
        //                 <h2>
        //                     <span className="badge badge-primary fetchComponent "> Processed Data Output : </span>
        //                 </h2>

        //                 <label>
        //                     {' '}
        //                     <h3>
        //                         <span className="badge badge-primary fetchComponent ">Minimum : </span>
        //                     </h3>
        //                     {temperature && minTemp(temperature)}
        //                 </label>
        //                 <label>
        //                     {' '}
        //                     <h3>
        //                         <span className="badge badge-primary fetchComponent ">Maximum : </span>
        //                     </h3>{' '}
        //                     {temperature && maxTemp(temperature)}
        //                 </label>
        //                 <label>
        //                     {' '}
        //                     <h3>
        //                         <span className="badge badge-primary fetchComponent ">Average : </span>
        //                     </h3>{' '}
        //                     {temperature && avgTemp(temperature)}
        //                 </label>
        //             </div>
        //         )}

        //         {temperature && (
        //             <div className={heading ? (rest ? 'dbData' : '') : ' '}>
        //                 {heading && rest && (
        //                     <table className="table">
        //                         <thead>
        //                             <tr>
        //                                 {heading.map((heading) => (
        //                                     <th>{heading}</th>
        //                                 ))}
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {rest.map((row) => (
        //                                 <TableRow row={row} />
        //                             ))}
        //                         </tbody>
        //                     </table>
        //                 )}
        //             </div>
        //         )}
        //     </div>
        // </div>

    );
}

export default App;
