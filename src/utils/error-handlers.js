/* eslint-disable no-console */
function catchErrors(err) {
  if (err) {
    console.log('Error: ', err.message);
    process.exit(1);
  }
}

exports.catchErrors = catchErrors;
