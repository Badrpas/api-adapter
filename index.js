const createHandler = require('./handler');

module.exports = (mapping, options, cb) => {
  const API = {};
  cb = cb || options;

  Object.keys(mapping).forEach(key => {
    let path = mapping[key];
    let queriesDescriptions;
    
    if (typeof path === 'array') {
      path = path[0];
      queriesDescriptions = path[1];
    }
    
    const entry = createHandler(path, queriesDescriptions);
    
    API[key] = (...args) => {
      const requestOptions = entry(...args);      
      return cb(requestOptions);
    };
  });

  return API;
};

module.exports.createHandler = createHandler;