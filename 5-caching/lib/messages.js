import sql from 'better-sqlite3';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

// the outer wrapping the unstable_cache function here , is for making this data that'r returned by that function cacheable by nextJS in it's data cache
// this outer wrap always returns a promise that why when you call this function you have to use async await
export const getMessages = unstable_cache(

    // this inner cache wrapping here is for request deduplication 
    // by wrapping this function with the cache request deduplication should than occur 
    // basically after using this cache method we are insuring that when ever this function will be used and sending the request this function will only execute one time and the same data will be used for the all the places from where this function is called 
    // ex here both page and layout function is sending the request than who ever send it first will be considered and the other will also get the updated data and only on request will be send between the two components 
    // the response is stored after the first call and stored for the second call so this function not have to execute again 
    cache(function getMessages() {
    console.log('Fetching messages from db');
    return db.prepare('SELECT * FROM messages').all();

  }) , ['messages'] , {
    tags : ['msg']
  }
);
