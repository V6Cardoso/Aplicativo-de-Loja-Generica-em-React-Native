import * as SQLite from "expo-sqlite";

export function getDbConnection() {
  const cx = SQLite.openDatabase("dbStore.db");
  return cx;
}

export async function createTables() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS Categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            color TEXT
        )`;

    const query2 = `CREATE TABLE IF NOT EXISTS Products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            price REAL, 
            description TEXT,
            category INTEGER,
            FOREIGN KEY (category) REFERENCES Categories(id) ON DELETE SET NULL
        )`;

/*     const query = "DROP TABLE IF EXISTS Categories";
    const query2 = "DROP TABLE IF EXISTS Products";
 */
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query);
        tx.executeSql(query2);
        resolve(true);
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
}

export function getAllProducts() {
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = "select * from Products";
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            let obj = {
              id: registros.rows.item(n).id,
              name: registros.rows.item(n).name,
              price: registros.rows.item(n).price,
              category: registros.rows.item(n).category,
              description: registros.rows.item(n).description,
            };
            retorno.push(obj);
          }
          resolve(retorno);
        });
      },
      (error) => {
        console.log(error);
        resolve([]);
      }
    );
  });
}

export function addProduct(product) {
  return new Promise((resolve, reject) => {
    let query =
      "INSERT INTO Products (name, price, category, description) VALUES (?, ?, ?, ?)";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [
            product.name,
            product.price,
            product.category,
            product.description,
          ],
          (tx, result) => {
            resolve(result.rowsAffected > 0);
          }
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function updateProduct(product) {
  return new Promise((resolve, reject) => {
    let query =
      "update Products set name=?, price=?, category=?, description=? where id=?";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [
            product.name,
            product.price,
            product.category,
            product.description,
            product.id,
          ],
          (tx, result) => {
            resolve(result.rowsAffected > 0);
          }
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    let query = "delete from Products where id=?";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [id], (tx, result) => {
          resolve(result.rowsAffected > 0);
        });
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function getProduct(id) {
  return new Promise((resolve, reject) => {
    let query = "select * from Products where id=?";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [id], (tx, registros) => {
          if (registros.rows.length > 0) {
            let obj = {
              id: registros.rows.item(0).id,
              name: registros.rows.item(0).name,
              price: registros.rows.item(0).price,
              category: registros.rows.item(0).category,
              description: registros.rows.item(0).description,
            };
            resolve(obj);
          } else {
            resolve(null);
          }
        });
      },
      (error) => {
        console.log(error);
        resolve(null);
      }
    );
  });
}


export function getAllCategories() {
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = "select * from Categories"
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            let obj = {
              id: registros.rows.item(n).id,
              name: registros.rows.item(n).name,
              color: registros.rows.item(n).color,
            };
            retorno.push(obj);
          }
          resolve(retorno);
        });
      },
      (error) => {
        console.log(error);
        resolve([]);
      }
    );
  });
}

export function addCategory(category) {
  return new Promise((resolve, reject) => {
    let query = "INSERT INTO Categories (name, color) VALUES (?, ?)";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [category.name, category.color], (tx, result) => {
          resolve(result.rowsAffected > 0);
        });
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function deleteCategory(id) {
  return new Promise((resolve, reject) => {
    let query = "delete from Categories where id=?";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [id], (tx, result) => {
          resolve(result.rowsAffected > 0);
        });
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

