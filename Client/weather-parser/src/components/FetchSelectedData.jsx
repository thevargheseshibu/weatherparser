function FetchSelectedData(props) {
    return (
        <div className="col-xxl-4 col-md-6">
        <div className="card info-card revenue-card">
            <div className="card-body">
                <h5 className="card-title">
                    Select the range <span>| Date </span>
                </h5>

                <div className="d-flex align-items-center">
                    <label htmlFor="Start" style={{ 'marginRight': '10px' }}>
                        Start Date :
                    </label>

                    <input
                        type="date"
                        id="Start"
                        min="2021-01-01"
                        max="2022-01-01"
                        name="Start"
                        value={props.startDate}
                        onChange={(e) => {
                            props.setStartDate(e.target.value);
                            props.setEndDate('');
                        }}></input>
                </div>

                <br />

                <div className="d-flex align-items-center">
                    <label htmlFor="End" style={{ 'marginRight': '10px' }}>
                        End Date :
                    </label>
                    <input
                        type="date"
                        id="End"
                        min={props.startDate ? props.startDate : '2021-01-01'}
                        max="2022-01-01"
                        value={props.endDate}
                        name="End"
                        onChange={(e) => {
                            props.setEndDate(e.target.value);
                        }}></input>
                </div>
                <br />

                <div className="d-flex align-items-center">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            props.selectiveDBButtonFetch(props.startDate, props.endDate);
                        }}>
                        Fetch
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default FetchSelectedData;
