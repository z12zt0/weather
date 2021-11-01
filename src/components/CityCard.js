function CityCard({city}) {
    console.log(city + " in comp");
    return (
        <div>
            <h3>{city}</h3>
            {/*1 of 3 pics: clear sky, clouds, rain -> opacity ~ 0.6, in left or bottom left corner */}
            <h5>Clouds</h5>
            <text>+5gr Celcius</text>
        </div>
    )
}

export default CityCard;