var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
// mongoose.connect( "mongodb://localhost:27017/TodoApp").catch(e=>
// {
//     mongoose.connect( "mongodb://testuser:password777@ds227168.mlab.com:27168/testdb777").catch(e=>
//     {
//         console.log(JSON.stringify(e))
//     })
// });
mongoose.connect(process.env.MONGODB_URI); 
module.exports={mongoose};