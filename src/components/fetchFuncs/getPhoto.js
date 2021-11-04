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
        var desktopURL = await json.photos[0].image.web;
        var mobileURL = await json.photos[0].image.mobile;
    }
    catch(err) {
        let photos = [
        "https://wallpaper.dog/large/5488098.jpg",
        "https://wallpaper.dog/large/5488005.jpg",
        "https://wallpaper.dog/large/5567425.jpg",
        "https://wallpaper.dog/large/10741432.jpg"
        ]
        desktopURL = mobileURL = photos[Math.floor(Math.random()*photos.length)];
        console.err(new Error("No photo found for the city"));
    } 
    finally {
        console.log(desktopURL);
        return [desktopURL, mobileURL];
    }
};

export default getPhoto;
