function DataParser(props) {
    return (
        <div className="col-xxl-4 col-md-6">
            <div className="card info-card dataFetch-card">
                <div className="card-body">
                    <h5 className="card-title">
                        Data Fetcher <span>| CSV</span>
                    </h5>
                    <div>
                        <div className="d-flex align-items-center">
                            <input
                                type="file"
                                onChange={async (e) => {
                                    props.setFileLoc(e.target.files[0]);
                                }}
                            />
                        </div>
                        <br />
                        <div className="d-flex align-items-center">
                            <button
                                type="button"
                                className="btn btn-secondary  btn-sm"
                                onClick={() => {
                                    console.log('fileLoc', props.fileLoc);
                                    props.setLoader(true);
                                    props.readFile(props.fileLoc, props.setViewerUpdate, props.setRawData, props.setLoader);

                                    console.log('df', props.rawData);
                                    //  e.target.value = ""
                                }}>
                                Fetch Data
                            </button>
                        </div>
                        <br />
                        <div className="d-flex align-items-center">
                            {props.rawData && (
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => {
                                        props.saveToDb();
                                        //  e.target.value = ""
                                    }}>
                                    Save to DB
                                </button>
                            )}
                        </div>
                        <br />
                      { props.rawData && (
                        <div className="d-flex align-items-center">
                            <button
                                type="button"
                                className="btn btn-secondary  btn-sm"
                                onClick={() => {
                                    
                               props.clearData()
                                }}>
                                Clear Data
                            </button>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataParser;
