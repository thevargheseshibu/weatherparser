
import axios from "axios";
import Papa from "papaparse"

export const saveDataToDb = async (rawData, vUpdate, setDBSaveFlag) => {

  axios.post('http://localhost:5000/trac', rawData)
    .then(function (response) {
      vUpdate("Data Save Success");
      setDBSaveFlag(true);
      // {type:"success",data:response}
    })

    .catch(function (error) {
      vUpdate("Data Failure");
      //return {type:"error",data:error}
    });
}


export const readFile = async (fileLoc, vUpdate, setSaveLoc) => {
  const reader = new FileReader()
  reader.onload = async (e) => {
    const text = (e.target.result)
    var data = Papa.parse(text);
    setSaveLoc(structuredClone(data.data))
    vUpdate("Data Fetching and Parsing Completed")
    console.log("data", data)


  };

  reader.readAsText(fileLoc)

}

export const dbFetchRaw = (setRawData, setTemperature, setHeading, setViewerUpdate) => {
  axios.get('http://localhost:5000/checker')
    .then(function (response) {
      const data = [];
      const tempData = [];
      for (let i = 0; i <= response.data.length - 1; i++) {
        delete response.data[i]._id;
        data.push(Object.values(response.data[i]))
        tempData.push(parseInt(response.data[i].Airtemperature))
      }

      console.log("setpost", data)
      console.log("temp", tempData, Math.min(...tempData))
      setRawData(data);
      setTemperature(tempData)
      setViewerUpdate("DB Fetch Completed")

    })

    .catch(function (error) {
      console.log(error);
    });

  axios.get('http://localhost:5000/heading')
    .then(function (response) {
      console.log("head", response.data[0]);

      delete response.data[0]._id;
      setHeading(response.data[0])
    })

    .catch(function (error) {
      console.log(error);
    });
}


export const selectiveDBFetch = (sDate, eDate, setViewerUpdate,setRawData, setTemperature,setHeading,) => {
  axios.post('http://localhost:5000/date', { startDate: sDate, endDate: eDate })
    .then(function (response) {
      console.log(response);
      const data = [];
      const tempData = [];
      for (let i = 0; i <= response.data.length - 1; i++) {


        delete response.data[i]._id;
        data.push(Object.values(response.data[i]))
        tempData.push(parseInt(response.data[i].Airtemperature))
      }

      console.log("setpost", data)
      console.log("temp", tempData, Math.min(...tempData))
      setRawData(data);
      setTemperature(tempData)
      setViewerUpdate("Data Fetch and Parse Completed")
    })

    .catch(function (error) {
      console.log(error);
    });

  axios.get('http://localhost:5000/heading')
    .then(function (response) {
      console.log("head", response.data[0]);

      delete response.data[0]._id;
      setHeading(response.data[0])
    })

    .catch(function (error) {
      console.log(error);
    });
}

export const minTemp = (arr) => {
  let a = 0;
  arr.forEach(element => {

    if (element < a) {
      a = element;
    }

  });
  return a

}

export const maxTemp = (arr) => {
  let a = 0;
  arr.forEach(element => {

    if (element > a) {
      a = element;
    }

  });
  return a

}


export const avgTemp = (arr) => {
  let a = 0;
  arr.forEach(element => {

    if (element) {
      a = a + element;
    }

  });
  console.log("finalavg", a, arr.length)
  return a / arr.length

}
