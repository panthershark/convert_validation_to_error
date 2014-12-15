var _ = require('lodash');

module.exports = function(err) {
  if (!err) {
    return err;
  }

  var validation_response;

  if (err instanceof Error) {
    try {
      validation_response = JSON.parse(err.message);
    } catch (e) {
      return err;
    }
  } else if (typeof(err) === 'string') {
    try {
      validation_response = JSON.parse(err);
    } catch (e) {
      return err;
    }
  } else {
    validation_response = err;
  }


  if (validation_response && validation_response.errors) {
    var msgs = _.map(validation_response.errors, function(e) {
      return e.stack || e;
    });
    return new Error(msgs.join());
  } else {

    if (!(err instanceof Error)) {
      err = new Error(err);
    }
    return err;
  }
};