var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

function validatenumber(number)
{
   var reg = /^\d+$/;
   return reg.test(number) || "ID should be a number!";
}

connection.connect(function (err){
    if (err) throw err;
    managerView();
})

function managerView(){
    inquirer.prompt({
        type: "list",
        name: "choice",
        messsage: "Below is your Menu",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
    .then (function(res){
        switch (res.choice) {
            case "View Products for Sale":
                viewproducts();
                break;
            case "View Low Inventory":
                lowInvenotry();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
        }
    })
}
function viewproducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
        managerView();
    })
};

function lowInvenotry(){
    connection.query("SELECT * FROM products where stock_quantity <= 5", function(err, res){
        if (err) throw err;
        console.table(res);
        managerView();
    })
};

function addInventory(){
    inquirer.prompt([{
        type: "input",
        name: "productID",
        messsage: "What is the product ID of the item?",
        validate: validatenumber
    },
    {
        type: "input",
        name: "quantityadded",
        messsage: "What is the quantity that you want to add?",
        validate: validatenumber
    }])
    .then (function(res){
        var PID = res.productID;
        var quantityadded = parseInt(res.quantityadded);
        
        connection.query("SELECT item_id, stock_quantity FROM products", function(err,res){
            var productInventory = 0;
            var addedproductID = 0;

            if (err) throw err;

            for (var i=0; i < res.length; i++){
                if (res[i].item_id == PID){
                    productInventory = res[i].stock_quantity;
                    addedproductID = res[i].item_id;
                }
            }

            var newquantity = quantityadded + productInventory;

            var updateSQL = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";

            connection.query(updateSQL, [newquantity, addedproductID], function(err, res){
                if (err) throw err;
                else{
                console.log("Stock has been updated");}
                connection.end();
            });

        });
    });
}

function addProduct() {
    inquirer
    .prompt([
        {
        type: "input",
        name: "newProduct",
        message: "Input the PRODUCT NAME of the new item:"
        },
        {
        type: "input",
        name: "productDept",
        message: "Input the DEPARTMENT of the new item:"
        },
        {
        type: "input",
        name: "productPrice",
        message: "Input the PRICE of the new item:"
        },
        {
        type: "input",
        name: "productQuantity",
        message: "Input the QUANTITY of the new item:"
        }
    ])
    .then(function(data) {
       
        connection.query(
            "INSERT INTO products SET ?", [{
                product_name: data.newProduct,
                department_name: data.productDept,
                price: data.productPrice,
                stock_quantity: data.productQuantity
            }],
            function (err, res) {
                if (err) throw err;
    
                console.log("Number of records inserted: " + res.affectedRows);
    
                connection.end();
            });
    });
}