const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};

const flightId = (value, helpers) => {
  if (!value.match(/^FLIGHT[0-9]{3}$/)) {
    return helpers.message('flightId is not valid one');
  }
  return value;
};

const bookingDate = (value, helpers) => {
  if (!value.match(/^\d{2}-\d{2}-\d{4}$/)) {
    return helpers.message('bookingDate should be in DD-MM-YYYY format');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  flightId,
  bookingDate,
};
