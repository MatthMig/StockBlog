const User = require('./users');
const Message = require('./Message');

User.hasMany(Message, { foreignKey: 'userMail', sourceKey: 'email' });
Message.belongsTo(User, { foreignKey: 'userMail', targetKey: 'email' });