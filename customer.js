var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;

    allInvenotry();
});

function allInvenotry(){
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res){
        if (err) throw err;

        console.table(res);

        customerResponse();

    });
};

function validatenumber(number)
{
   var reg = /^\d+$/;
   return reg.test(number) || "ID should be a number! Press CTRL + C to exit"
}

function customerResponse(){
    inquirer.prompt([{
        type: "input",
        name: "SelectedproductID",
        message: "What is the ID of the product that you would like to buy?",
        validate: validatenumber
    },
    {
        type: "input",
        name: "quantity",
        message: "How many units do you need?",
        validate: validatenumber
    }
])
.then(function(data){
    var quantityRequired = parseInt(data.quantity);
    var productRequired = data.SelectedproductID;

    connection.query("SELECT item_id, product_name, stock_quantity, price FROM products", function(err, res){

    var availablestock = 0;
    var productID = 0;
    var productprice = 0;

    if (err) throw err;
    
    for (var i=0; i < res.length; i++){
        if (res[i].item_id == productRequired){
            availablestock = res[i].stock_quantity;
            productID = res[i].item_id;
            productprice = res[i].price;
        }
    }
    if (availablestock < quantityRequired) {
        console.log("Insuffecient Quantity. Please select some other item or try again later !!");
        console.log("Press CTRL + C to Quit");
        allInvenotry();
    }
    else {
        var stockLeft = availablestock - quantityRequired;
        var total = quantityRequired * productprice;

        var updateproducts = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";

        connection.query(updateproducts, [stockLeft, productID], function(err, res){
            if (err) throw err;
            else{
                console.log("Stock has been updated");
                console.log("Your total is $" + total);
                console.log("Press Ctrl + C to quit!!")
            }
        })
    }

    })
    
})
}
