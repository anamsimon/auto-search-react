import CarMakeDropdown from "./component/CarMakeDropdown";
import CarModelDropdown from "./component/CarModelDropdown";
import MaxInput from "./component/MaxInput";
import Gallery from "./component/Gallery";
import voca from "voca";

import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  //state management
  const [carMakeList, setCarMakeList] = useState([]);
  const [carModelList, setCarModelList] = useState([]);
  const [selectedCarMake, setSelectedCarMake] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [maxKm, setMaxKm] = useState(null);
  const [data, setData] = useState([]);
  const [initLoad, setInitLoad] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [carMakeModelMap, setCarMakeModelMap] = useState({});

  //load data from json file and call initData
  const loadData = () => {
    fetch("data/data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        initData(jsonData);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  
  const initData=(data)=>{
    setData(data);
     //capitalize first letter of Make and Model
     data.forEach((car) => {
      car.manufacturer = voca.titleCase(car.manufacturer);
      car.model = voca.titleCase(car.model);
    });
    let carMakeModel={};
    let carMakes = [
      ...new Set(
        data.map((car) => {
          if (carMakeModel[car.manufacturer] === null) {
            carMakeModel[car.manufacturer] = new Set();
          }
          if (car.model !== "") 
            carMakeModel[car.manufacturer].add(car.model);
          return car.manufacturer;
        })
      ),
    ];
    setCarMakeModelMap(carMakeModel);
    setCarMakeList(carMakes);
    //initialize searchResult with all data to show on first load
    setSearchResult(data);
  }

  
  //filter car list based on car make, model, max price, max km
  //returns true if the car meets filter criterea
  const filterCar = (car) => {
    let match = false;
    //When no filter is set
    if (selectedCarMake == null && selectedCarModel == null && maxPrice == null && maxKm == null) 
    {
      match = true;
    } 
    else {
      //Car make filter is set
      if (selectedCarMake != null) 
      {      
        if (car.manufacturer === selectedCarMake) 
        {
          //car make matches
          match = true;
          //Car model filter is set
          if (selectedCarModel != null) 
          {
            if (car.model === selectedCarModel) 
            {
              //car make and model both match
              match = true;
            } 
            else 
            {
              //car make matches but model does not match
              match = false;
            }
          }
        } 
        else {
          //car make does not match
          match = false;
        }
      } 
      else {
        //Car make and model filters are not set 
        match = true;
      }

      if (match == true) 
      {
        //maxprice and maxkm both filter are set
        if (maxPrice != null && maxKm != null) {
          if (car.price <= maxPrice && car.odometer <= maxKm) 
            match = true;
          else 
            match = false;
        } else 
        {
          //max price is set
          if (maxPrice != null) {
            if (car.price <= maxPrice) 
              match = true;
            else 
              match = false;
          } else 
          {
            //max km is set
            if (maxKm != null) {
              if (car.odometer <= maxKm) 
                match = true;
              else 
                match = false;
            }
          }
        }
      }
    }
    return match;
  };

  const onResultClick = () => {
    setInitLoad(false);
    var Results = data.filter((car) => {
      return filterCar(car);
    });
    setSearchResult(Results);
  };

  const onCarMakeChange = (value) => {
    if (value == "-1") {
      setCarModelList([]);
      setSelectedCarMake(null);
      setSelectedCarModel(null);
    } else {
      setSelectedCarMake(value);
      setCarModelList([...carMakeModelMap[value]]);
    }
  };

  const onCarModelChange = (value) => {
    if (value == "-1") {
      setSelectedCarModel(null);
    } else {
      setSelectedCarModel(value);
    }
  };

  const onMaxPriceChange = (value) => {
    let x = parseInt(value);
    if (!isNaN(x) && x > 0) setMaxPrice(x);
    else setMaxPrice(null);
  };

  const onMaxKmChange = (value) => {
    let x = parseInt(value);
    if (!isNaN(x) && x > 0) setMaxKm(x);
    else setMaxKm(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Find your next car</p>
      </header>
      <div className="flex-container">
        <CarMakeDropdown
          onCarMakeChange={onCarMakeChange}
          data={carMakeList}
          label="Make"
          placeholder="Any make"
          className="flex-select-item"
        />
        <CarModelDropdown
          onCarModelChange={onCarModelChange}
          data={carModelList}
          label="Model"
          placeholder="Any model"
          className="flex-select-item"
        />
        <MaxInput
          onChange={onMaxPriceChange}
          label="Price $"
          placeholder="Max price"
          className="flex-input-item"
        />
        <MaxInput
          onChange={onMaxKmChange}
          label="Kilometres"
          placeholder="Max km"
          className="flex-input-item"
        />
        <footer>
          <button
            type="submit"
            onClick={onResultClick}
            className="flex-button-item"
          >
            {searchResult.length} results
          </button>
        </footer>
      </div>
      <Gallery data={searchResult} visible={!initLoad}/>
    </div>
  );
}

export default App;
