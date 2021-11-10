function setTransition(city) {

  return function(id, isOnFocus) {
    let element = document.getElementById(id);
    
    if (isOnFocus) {
      if (!city) {
        element.style.marginTop = "5vh";
        // timeout and scrollTo -> re-render window, so 
        // the pop-up div will "stick" to city-input
        setTimeout(() => window.scrollTo({top: 1, left: 0, behavior: "smooth"}), 300);
      }
      return;
    }
    if (!city) {
      element.style.marginTop = "20vh";
      window.scrollTo(0, 0);
    }
  }
};

export default setTransition;