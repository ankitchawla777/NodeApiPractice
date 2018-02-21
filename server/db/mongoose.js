var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect( "mongodb://localhost:27017/TodoApp").catch(e=>
{
    mongoose.connect( "mongodb://localhost:27017/TodoApp").catch(e=>
    {
        console.log(JSON.stringify(e))
    })
});

module.exports={mongoose};