// Filtering chats by 'active' flag
const filterChatsByActive = (req, res, next) => {
  const active = req.query.active;
  req.filter = active ? { active } : {};
  next();
};

export default filterChatsByActive;
