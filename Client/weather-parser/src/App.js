import axios from "axios";
import React from "react";
import './App.css';
import { saveDataToDb, readFile, dbFetchRaw, minTemp, maxTemp, avgTemp,selectiveDBFetch } from "./weatherParseUtil"
import { useEffect } from "react";





function App() {

  const [rawData, setRawData] = React.useState(null);
  const [viewerUpdate, setViewerUpdate] = React.useState(null);
  const [dbSaveFlag, setDBSaveFlag] = React.useState(false);
  const [viewLink, setViewLink] = React.useState("home");
  const [fileLoc, setFileLoc] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [headinger, setHeading] = React.useState(null);
  const [temperature, setTemperature] = React.useState(null);



  const saveToDb = () => {
    const data = saveDataToDb(rawData, setViewerUpdate, setDBSaveFlag);

  }
  const dbButtonFetchRaw = () => {
    dbFetchRaw(setRawData, setTemperature, setHeading, setViewerUpdate)
  }
  const clearData = ()=>{
    setTemperature(null);
    setHeading(null);
    setRawData(null);
  }

  useEffect(() => {

    if (viewerUpdate) {

      alert(viewerUpdate)
      console.log("cameher")
      setViewerUpdate("");

    }

  }, [viewerUpdate]);



  const selectiveDBButtonFetch = (sDate, eDate) => {
    selectiveDBFetch(sDate,eDate,setViewerUpdate,setRawData,setTemperature,setHeading)
  }




  const TableRow = ({ row }) => {
    return (
      <>
        <tr>
          {row.map(val => <td>{val}</td>)}
        </tr>
      </>
    )
  }

  const heading = headinger && structuredClone(Object.values(headinger));
  console.log("headingheading", heading)

  const rest = rawData && structuredClone(rawData);
  rawData && rest.splice(0, 1);

  console.log("heading", headinger)

  console.log("rest", rest)
  console.log("dbSaveFlag", dbSaveFlag, viewLink)
  return (
    <div>
      {dbSaveFlag &&
        <div className="appLink">

          {viewLink !== "home" && <a class="btn btn-primary btn btn-secondary" onClick={() => { setViewLink("home");clearData() }} href="#" role="button">Home</a>}
          {viewLink !== "rawdata" && <a class="btn btn-primary btn btn-secondary" onClick={() => { setViewLink("rawdata") ;clearData()}} href="#" role="button">Raw Data</a>}
          {viewLink !== "selectivedata" && <a class="btn btn-primary btn btn-secondary" onClick={() => { setViewLink("selectivedata") ;clearData()}} href="#" role="button">Selective Data</a>}

        </div>
      }

      <div className="App renderData">



        {viewLink === "home" && <div class="fetchComponent ">
          <h1><span class="badge badge-primary fetchComponent ">DATA FETCH (CSV)  : </span></h1>

          <label >
            <input type="file" onChange={async (e) => {
              setFileLoc(e.target.files[0])
            }} />

            <button type="button" class="btn btn-secondary" onClick={() => {
              console.log("fileLoc", fileLoc)
              readFile(fileLoc, setViewerUpdate, setRawData,);
              console.log("df", rawData)
              //  e.target.value = ""
            }}>Fetch Data</button>

            {rawData && <button type="button" class="btn btn-secondary" onClick={() => {
              saveToDb()
              //  e.target.value = ""
            }}>Save to DB</button>}

          </label>
        </div>}

        <br />

        {dbSaveFlag && viewLink === "rawdata" && <div class="dbComponentRaw">
          <h1><span class="badge badge-primary fetchComponent ">Fetch Raw Data from the DB : </span></h1>

          <button type="button" class="btn btn-secondary" onClick={() => { dbButtonFetchRaw() }}>Fetch</button>
        </div>}

        <br />

        {dbSaveFlag && viewLink === "selectivedata" && <div class="dbComponentSelective">

          <h1><span class="badge badge-primary fetchComponent ">Fetch Selective Date Data from the DB : </span></h1>

          <label for="Start"><h4><span class="badge badge-primary fetchComponent ">Start Date  : </span></h4></label>
          <input type="date" id="Start" min="2021-01-01" max="2022-01-01" name="Start" value={startDate} onChange={(e) => { setStartDate(e.target.value) ;setEndDate("")}}></input>

          <label for="End"><h4><span class="badge badge-primary fetchComponent ">End Date  : </span></h4></label>
          <input type="date" id="End" min={startDate?startDate:"2021-01-01"} max="2022-01-01" value={endDate} name="End" onChange={(e) => { setEndDate(e.target.value) }}></input>


          <button type="button" class="btn btn-secondary" onClick={() => { selectiveDBButtonFetch(startDate, endDate) }}>Fetch</button>


          {console.log("temperature", temperature)}



        </div>
        }

        {temperature && <div class="fetchComponent ">

          <h1><span class="badge badge-primary fetchComponent "> Processed Data Output : </span></h1>

          <label> <h3><span class="badge badge-primary fetchComponent ">Minimum : </span></h3>{temperature && minTemp(temperature)}</label>
          <label> <h3><span class="badge badge-primary fetchComponent ">Maximum : </span></h3> {temperature && maxTemp(temperature)}</label>
          <label> <h3><span class="badge badge-primary fetchComponent ">Average : </span></h3> {temperature && avgTemp(temperature)}</label>

        </div>}

        {temperature && <div className={heading ? (rest ? "dbData" : "") : " "}>

          {heading && rest &&

            <table className="table" >
              <thead>
                <tr>
                  {heading.map(heading => <th>{heading}</th>)}
                </tr>
              </thead>
              <tbody>
                {rest.map(row => <TableRow row={row} />)}
              </tbody>
            </table>


          }

        </div>
        }


      </div>



    </div>
  );
}

export default App;
