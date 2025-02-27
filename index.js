const check = async (name) => {
    const apiid = "308123100d4c9cd09be0eba705de04bc";
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiid}`;

    try {
        const res = await fetch(apiurl);
        const data = await res.json();

        if (!res.ok) {
            throw new Error("City not found");
        }

        const box = document.querySelector(".box-main");
        const errorMsg = document.querySelector("#err");

        // Show weather box and hide error message
        box.style.display = "block";
        errorMsg.style.display = "none";

        document.querySelector("#country").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("#des").innerHTML = data.weather[0].description;
        document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
        document.querySelector("#wind").innerHTML = data.wind.speed + " km/hr";

        // Update Weather Image
        const img = document.querySelector(".weather");
        const weatherCondition = data.weather[0].main.toLowerCase();

        if (weatherCondition.includes("cloud")) {
            img.src = "clouds.png";
        } else if (weatherCondition.includes("clear")) {
            img.src = "clear.png";
        } else if (weatherCondition.includes("rain")) {
            img.src = "rain.png";
        } else if (weatherCondition.includes("mist")) {
            img.src = "mist.png";
        } else {
            img.src = "default.png"; // Fallback image
        }
    } catch (error) {
        // Hide weather box and show error message
        document.querySelector(".box-main").style.display = "none";
        document.querySelector("#err").style.display = "block";
    }
};

// Event Listener for Search Button
document.querySelector(".inp button").addEventListener("click", () => {
    const location = document.querySelector(".inp input").value.trim();
    if (location) {
        check(location);
    }
});
