const funcs = {
  isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
  },

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
};

export default funcs;
