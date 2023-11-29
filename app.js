const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute');
require('./middleware/passport');

const url = 'mongodb://127.0.0.1:27017/UserDB';


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(url, options)
.then(() => {
    console.log("Connection successful");
})
.catch((e) => {
    console.error("Error in connection:", e.message);
});

app.use('/auth',authRoutes);

app.listen(3000,()=>{console.log("App is Running on port 3000");})