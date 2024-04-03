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

    const query3 = `CREATE TABLE IF NOT EXISTS Sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            price REAL,
            time TEXT
        )`;

    const query4 = `CREATE TABLE IF NOT EXISTS SaleItems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sale INTEGER,
            product INTEGER,
            product_name TEXT,
            quantity INTEGER,
            price REAL,
            FOREIGN KEY (sale) REFERENCES Sales(id) ON DELETE CASCADE,
            FOREIGN KEY (product) REFERENCES Products(id) ON DELETE SET NULL
        )`;

/*     const query = "DROP TABLE IF EXISTS Categories";
    const query2 = "DROP TABLE IF EXISTS Products";
 */
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query);
        tx.executeSql(query2);
        tx.executeSql(query3);
        tx.executeSql(query4);
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

export function addSale(sale) {
  return new Promise((resolve, reject) => {
    let query = "INSERT INTO Sales (price, time) VALUES (?, ?)";
    let query2 =
      "INSERT INTO SaleItems (sale, product, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [sale.price, sale.time], (tx, result) => {
          if (result.rowsAffected > 0) {
            let saleId = result.insertId;
            sale.items.forEach((item) => {
              tx.executeSql(
                query2,
                [saleId, item.id, item.name, item.quantity, item.price],
                (tx, result) => {
                  if (result.rowsAffected <= 0) {
                    resolve(false);
                  }
                }
              );
            });
            resolve(true);
          } else {
            resolve(false);
          }
        });
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function getAllSales() {
  return new Promise((resolve, reject) => {
    let query = "select * from Sales";
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, registros) => {
          if (registros.rows.length > 0) {
            var retorno = [];
            for (let n = 0; n < registros.rows.length; n++) {
              let obj = {
                id: registros.rows.item(n).id,
                price: registros.rows.item(n).price,
                time: registros.rows.item(n).time,
              };
              retorno.push(obj);
            }
            resolve(retorno);
          }
        }
        );
      }
    );
  }
  );
}

export function getAllSaleItems() {
  return new Promise((resolve, reject) => {
    let query = "select * from SaleItems";
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, registros) => {
          if (registros.rows.length > 0) {
            var retorno = [];
            for (let n = 0; n < registros.rows.length; n++) {
              let obj = {
                id: registros.rows.item(n).id,
                sale: registros.rows.item(n).sale,
                product: registros.rows.item(n).product,
                product_name: registros.rows.item(n).product_name,
                quantity: registros.rows.item(n).quantity,
                price: registros.rows.item(n).price,
              };
              retorno.push(obj);
            }
            resolve(retorno);
          }
        }
        );
      }
    );
  }
  );
}

export function getSaleItems(saleId) {
  return new Promise((resolve, reject) => {
    let query = "select * from SaleItems where sale=?";
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [saleId], (tx, registros) => {
          if (registros.rows.length > 0) {
            var retorno = [];
            for (let n = 0; n < registros.rows.length; n++) {
              let obj = {
                id: registros.rows.item(n).id,
                sale: registros.rows.item(n).sale,
                product: registros.rows.item(n).product,
                product_name: registros.rows.item(n).product_name,
                quantity: registros.rows.item(n).quantity,
                price: registros.rows.item(n).price,
              };
              retorno.push(obj);
            }
            resolve(retorno);
          }
        }
        );
      }
    );
  }
  );
}

export function mostSellingProducts() {
  return new Promise((resolve, reject) => {
    let query = "select product, product_name, sum(quantity) as total from SaleItems group by product order by total desc limit 5";
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, registros) => {
          if (registros.rows.length > 0) {
            var retorno = [];
            for (let n = 0; n < registros.rows.length; n++) {
              let obj = {
                product: registros.rows.item(n).product,
                product_name: registros.rows.item(n).product_name,
                total: registros.rows.item(n).total,
              };
              retorno.push(obj);
            }
            resolve(retorno);
          }
        }
        );
      }
    );
  }
  );
}

export function getSalesGroupByDate() {
  return new Promise((resolve, reject) => {
    let query = "select date(time) as date, count(*) as count from Sales group by date(time)";
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, registros) => {
          if (registros.rows.length > 0) {
            var retorno = [];
            for (let n = 0; n < registros.rows.length; n++) {
              let obj = {
                date: registros.rows.item(n).date,
                count: registros.rows.item(n).count,
              };
              retorno.push(obj);
            }
            resolve(retorno);
          }
        }
        );
      }
    );
  }
  );
}
