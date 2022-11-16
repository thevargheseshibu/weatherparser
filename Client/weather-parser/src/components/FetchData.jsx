function FetchData(props) {
    return (
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
        </div>
    );
}

export default FetchData;
