var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect( "mongodb://localhost:27017/TodoApp" || "mongodb://testuser:password777@ds227168.mlab.com:27168/testdb777");

module.exports={mongoose};