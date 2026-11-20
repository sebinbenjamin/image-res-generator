function catchErrors(err) {
  if (err) {
    console.error('Error: ', err.message);
    process.exit(1);
  }
}

exports.catchErrors = catchErrors;
