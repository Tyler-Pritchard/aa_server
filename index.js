const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connection Successful!"))
    .catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log("AA Server is running!")
});
