var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("conneted as id: " + connection.threadId)
    showProducts();
  });

 var choiceArray = [];
  //var chosenItem = "";

  function showProducts() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      console.log("");
      console.log("");
      console.log("*************  PRODUCTS FOR SALE  **************");
      console.log("");

      for(i=0;i<res.length;i++){
        console.log("Item ID: " + res[i].item_id + " || " +  "  Product Name: " + res[i].product_name + "  ||  " +  "     Price: $" + res[i].price)
      }
      console.log("");
      console.log("=================================================");
      console.log("");
      placeOrder();
      })

function placeOrder(){
    inquirer.prompt([{
      name: "selectId",
      message: "Enter the ID of the product you wish to purchase.",
      validate: function(value){
        var valid = value.match(/^[0-9]+$/)
        if(valid){
          return true
        }
        console.log("");
        return "*************  Please enter a valid Product ID  *************";
        console.log("");
      }
    },{
    name:"selectQuantity",
		message: "How many of this product would you like to order?",
		validate: function(value){
			var valid = value.match(/^[0-9]+$/)
			if(valid){
				return true
      }
        console.log("");
        return "*************  Please enter a numerical value  *************";
        console.log("");

		}

    }]).then(function(answer){
      connection.query("SELECT * from products where item_id = ?", [answer.selectId], function(err, res){
        if(answer.selectQuantity > res[0].stock_quantity){
          console.log("");
          console.log("************  Insufficient Quantity  *************");
          console.log("************  This order has been cancelled  *************");
          console.log("");
          showProducts();
        }
        else{
          console.log("");
          console.log("*************  Thanks for your order!  **************");
          console.log("");
          connection.query("UPDATE products SET ? Where ?", [{
            stock_quantity: res[0].stock_quantity - answer.selectQuantity
          },{
            item_id: answer.selectId
          }], function(err, res){});
          showProducts();
        }
      })
    
    }, function(err, res){})
    };

}










     