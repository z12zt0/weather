/**
 * A function to get 2 photos of the given city - desktop and mobile versions
 * @param {string} city 
 * @returns {Array} desktop and mobile URLs of the city
 */
async function getPhoto(city) {
    let normalizedCity = city.toLowerCase().replace(" ", "-");
    //https://api.teleport.org/api/urban_areas/slug:boston/images/

    try {
        let response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${normalizedCity}/images/`);
        let json = await response.json();
        let desktopURL = await json.photos[0].image.web;
        let mobileURL = await json.photos[0].image.mobile;

        return [desktopURL, mobileURL];
    }
    catch(err) {
        return new Error("No photo found for the city");
    }
};

export default getPhoto;
