// Filtering messages by status
const filterMessagesByStatus = (req, res, next) => {
  const status = req.query.status;
  // If status is provided, add it to the request object
  req.filter = status ? { status: status } : {};
  next();
};

export default filterMessagesByStatus;
