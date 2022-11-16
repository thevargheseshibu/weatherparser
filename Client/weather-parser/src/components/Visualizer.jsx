
import React from 'react';

export default function Visualizer(props) {
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
    return (
        <>
            <div className="col-xxl-4 col-md-6">
                <div className="card info-card revenue-card">
                    <div className="card-body">
                        <h5 className="card-title">
                            {' '}
                            Aggregation Functional Output <br/><span>  Air Temperature  </span>
                        </h5>

                        <React.Fragment>
                            <div className="d-flex align-items-center">
                                <label>Minimum :{props.temperature && props.minTemp(props.temperature)}</label>
                            </div>

                            <br />

                            <div className="d-flex align-items-center">
                                <label>Maximum :{props.temperature && props.maxTemp(props.temperature)}</label>
                            </div>

                            <br />

                            <div className="d-flex align-items-center">
                                <label>Average :{props.temperature && props.avgTemp(props.temperature)}</label>
                            </div>
                        </React.Fragment>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="card info-card customers-card">
                    <div
                        className="card-body"
                        style={{
                            'overflow-y': 'scroll',
                            height: '610px',
                           
                            'overflow-x': ' scroll',
                            width: '100%',
                        }}>
                        <h5 className="card-title">
                            Raw Data Display <span>| CSV </span>
                        </h5>

                        {props.temperature && props.heading && props.body && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        {props.heading.map((heading) => (
                                            <th scope="col">{heading}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.body.map((row) => (
                                        <TableRow row={row} />
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
