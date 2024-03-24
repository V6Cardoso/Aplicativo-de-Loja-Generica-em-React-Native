//Sqlite produto dao react native
import SQLite from "react-native-sqlite-storage";

class ProductDAO {
  constructor() {
    const db = SQLite.openDatabase(
      {
        name: "MainDB",
        location: "default",
      },
      this.successDB,
      this.failDB
    );
    this.db = db;
  }

  successDB = () => {
    console.log("Database opened successfully");
  };

  failDB = (err) => {
    console.log("Failed to open database", err);
  };

  createTable = () => {
    this.db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Products (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            code TEXT, 
            name TEXT, 
            price REAL, 
            FOREIGN KEY (category) REFERENCES Categories(id) ON DELETE SET NULL
        )`
      );
    });
  };

  insertProduct = (code, name, price, category) => {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Products (code, name, price, category) VALUES (?, ?, ?, ?)",
          [code, name, price, category],
          (tx, results) => {
            resolve(results);
          }
        );
      });
    });
  };

  getProducts = () => {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql("SELECT * FROM Products", [], (tx, results) => {
          let products = [];
          for (let i = 0; i < results.rows.length; i++) {
            products.push(results.rows.item(i));
          }
          resolve(products);
        });
      });
    });
  };
}

export default new ProductDAO();
