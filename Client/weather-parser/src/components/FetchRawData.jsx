import React from 'react';
function FetchRawData(props) {
    return (
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
                                props.dbButtonFetchRaw();
                            }}>
                            Fetch
                        </button>
                    </React.Fragment>
                </div>
            </div>
        </div>
        </div>
    );
}

export default FetchRawData;
