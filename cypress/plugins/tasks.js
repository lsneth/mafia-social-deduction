// https://github.com/orgs/supabase/discussions/6177
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const TEST_USER_EMAIL = process.env.CYPRESS_TEST_USER_EMAIL?.toString() ?? '';
const TEST_USER_PASSWORD = process.env.CYPRESS_TEST_USER_PASSWORD?.toString() ?? '';
const TEST_USER_ID = process.env.CYPRESS_TEST_USER_ID?.toString() ?? '';
const TEST_USER_NAME = process.env.CYPRESS_TEST_USER_NAME?.toString() ?? '';
const SUPABASE_URL = 'https://krsvqfsdxblshgkwnwnb.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyc3ZxZnNkeGJsc2hna3dud25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3Njc4NTgsImV4cCI6MjAzMzM0Mzg1OH0.-GlDIfDvVrauGuuvmZDReVVBN7BIy-SBCvRDGeUf9NI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const sessions = {};

async function signIn() {
  try {
    if (!sessions[TEST_USER_EMAIL]) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
      });
      if (error) throw error;
      sessions[TEST_USER_EMAIL] = data.session;
    }
    return sessions[TEST_USER_EMAIL];
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function deleteGames() {
  try {
    const { error } = await supabase.functions.invoke('cypress-delete-game');
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    return null;
  }
}

async function addUserName() {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ name: TEST_USER_NAME })
      .eq('id', TEST_USER_ID);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    return null;
  }
}

async function setUpGame({
  hostedByMe,
  addMe,
  numOtherPlayers,
  phase,
  myRole,
  ready,
  selectedPlayerId,
  result,
  murderedPlayerId,
}) {
  try {
    const { error } = await supabase.functions.invoke('cypress-set-up-game', {
      body: {
        hostedByMe,
        addMe,
        numOtherPlayers,
        phase,
        myRole,
        ready,
        selectedPlayerId,
        result,
        murderedPlayerId,
      },
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    return null;
  }
}

module.exports = {
  signIn,
  deleteGames,
  setUpGame,
  addUserName,
};
