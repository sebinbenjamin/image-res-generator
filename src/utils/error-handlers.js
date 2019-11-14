/* eslint-disable no-console */
function catchErrors(err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.error('Error: ', err.message);
    process.exit(1);
  }
}

exports.catchErrors = catchErrors;
