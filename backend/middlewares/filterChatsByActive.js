// Filtering chats by 'active' flag
const filterChatsByActive = (req, res, next) => {
  const filter = (req.locals && req.locals.filter) || {};
  const active = req.query.active;
  active ? (filter.active = active.toLowerCase() === "true" || active === "1") : delete filter.active;
  // Passing data through filtering middleware
  req.locals = { ...req.locals, filter };
  next();
};

export default filterChatsByActive;
