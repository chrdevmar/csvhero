import Dexie from 'dexie';

const db = new Dexie(process.env.REACT_APP_DB_NAME);
db.version(1).stores({
  [process.env.REACT_APP_DB_TABLE_NAME]: '++id'
})

export default db;