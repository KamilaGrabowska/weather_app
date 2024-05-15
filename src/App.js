import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "./components/Header";
import InputCity from "./components/InputCity";
import ShowWeather from "./components/ShowWeather";

const App = () => {
    const [inputCity, setInputCity] = useState("Seattle");
    const [cityName, setCityName] = useState("Seattle");
    const [weatherData, setWeatherData] = useState({});
    const [error, setError] = useState(false);

    const inputHandler = (e) => {
        setInputCity(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setError(false);
        setCityName(inputCity);
    };

    const API_KEY = `9216bb0bd27d02b044b6f1cd42af207e`;

    async function fetchData(city) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        try {
            const response = await fetch(URL);
            const data = await response.json();
            if (data.cod === "404") {
                setError(true);
            } else {
                setWeatherData(data);
            }
        } catch (error) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchData(cityName);
    }, [cityName]);

    return (
        <div>
            <Header />
            <InputCity
                city={inputCity}
                onInputHandler={inputHandler}
                onSubmitHandler={submitHandler}
            />
            {error ? (
                <h3 className="error">No data found :(</h3>
            ) : (
                <ShowWeather data={weatherData} />
            )}
        </div>
    );
}
export default App;
