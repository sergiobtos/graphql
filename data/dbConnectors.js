import mongoose from "mongoose";
import _ from "lodash";
import casual from "casual";
import { Sequelize, DataTypes } from "sequelize";


//Mongoose connection

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/widgets", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log('Error line 12', err);
});

const widgetSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    price: {
        type: Number
    },    
    soldout: {
        type: String
    },
    inventory: {
        type: String
    },
    stores: {
        type: Array
    },
})

 const Widgets = mongoose.model("widgets", widgetSchema);  

 const sequelize = new Sequelize('sqlite::memory:');
 const Categories = sequelize.define('categories', {
    category: DataTypes.STRING,
    description: DataTypes.STRING,
 })

 Categories.sync({ force: true }).then(() => {
    _.times(5, (i) => {
        Categories.create({
            category: casual.word,
            description: casual.sentence,
        })
    })
    console.log("Categories table created");

})
 
 export { Widgets, Categories };