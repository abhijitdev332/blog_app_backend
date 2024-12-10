function globalError(err, req, res, next) {
  res.json({ msg: err });
}

export default globalError;
