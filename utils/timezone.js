const { DateTime } = require("luxon");

exports.toCampoGrandeISO = (date) =>
  DateTime.fromJSDate(date)
    .setZone("America/Campo_Grande")
    .toISO();
