async function getCitiesByInput(input) {
    let result = await fetch(`https://api.teleport.org/api/cities/?search=${input}`);
    let json = await result.json();
    let fullNames = [];
    await json._embedded["city:search-results"].map(currentVariant => {
      fullNames.push(currentVariant.matching_full_name);
    });
    console.log("BOMBING THE SERVER")
    return fullNames;
};
// this doesn't work at all
// but in the mui tutorial they used _.throttle - check it
function throttle(func, timeout) {
    
    let flag = true;
    let savedArgs, savedContext;

    return async function wrapper() {
      if (!flag) {
        savedArgs = arguments;
        savedContext = this;
        return;
      }
      await func.apply(this, arguments);
      flag = false;

      setTimeout(() => {
        flag = true;
        if (savedArgs) {
          wrapper.apply(savedContext, savedArgs);
          savedArgs = null;
          savedContext = null;
        }
      }, timeout);
    }
  }

export {getCitiesByInput, throttle};