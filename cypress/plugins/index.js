// https://github.com/orgs/supabase/discussions/6177
const { deleteGames, signIn, setUpGame, addUserName } = require('./tasks');

module.exports = (on, config) => {
  on('task', {
    deleteGames,
    signIn,
    setUpGame,
    addUserName,
  });

  return config;
};
