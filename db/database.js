import * as SQLite from 'expo-sqlite';
import getCurrentDateAndTime from '../utils/dateAndTime';

export default async function createTables() {
  const db = SQLite.openDatabase('mydb.db');
  await db.transaction(async (tx) => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT,customer_id INTEGER, data_log TEXT, date TEXT, name TEXT)'
    );
  });
}

export async function addCustomer(name) {
  const db = SQLite.openDatabase('mydb.db');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO customers (name) VALUES (?)',
        [name],
        (tx, result) => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}


export async function addItem(name) {
  const db = SQLite.openDatabase('mydb.db');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO items (name) VALUES (?)',
        [name],
        (tx, result) => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}

export async function getAllCustomer() {
  const db = SQLite.openDatabase('mydb.db');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM customers',
        [],
        (tx, result) => {
          const rows = result.rows._array;
          resolve(rows);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}

export async function getAllItems() {
  const db = SQLite.openDatabase('mydb.db');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM items',
        [],
        (tx, result) => {
          const rows = result.rows._array;
          resolve(rows);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}

export async function deleteCustomer(id) {
  const db = SQLite.openDatabase('mydb.db');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM customers WHERE ID = ?',
        [id],
        (tx, result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}

export async function deleteItem(id) {
  const db = SQLite.openDatabase('mydb.db');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM items WHERE ID = ?',
        [id],
        (tx, result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}

export async function createLog(customer,log){
  const db = SQLite.openDatabase('mydb.db');
  const customerId = customer.id; 
  const customername = customer.name;
  const dateAndTime = getCurrentDateAndTime();
  const serializedLogEntries = JSON.stringify(log);


  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO logs (customer_id, data_log, date, name) VALUES ( ?, ?, ?, ?)',
      [
        customerId,
        serializedLogEntries,
        dateAndTime,
        customername
      ],
      (tx, result) => {
        console.log('Log entry inserted successfully');
      },
      (error) => {
        console.error('Error inserting log entry:', error);
      }
    );
  });

}

export async function getLogs() {
  const db = SQLite.openDatabase('mydb.db');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM logs',
        [],
        (tx, result) => {
          const rows = result.rows._array;
          resolve(rows);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}

export async function deleteLog(id) {
  const db = SQLite.openDatabase('mydb.db');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM logs WHERE ID = ?',
        [id],
        (tx, result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}




