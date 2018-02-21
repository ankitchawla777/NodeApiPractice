var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect( "mongodb://testuser:password777@ds227168.mlab.com:27168/testdb777" || "mongodb://localhost:27017/TodoApp");

module.exports={mongoose};