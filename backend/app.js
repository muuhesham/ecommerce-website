const express = require("express");
const connectDB = require("./Config/db.config");
const userRouter = require("./Routes/user.router");
const productRouter = require("./Routes/product.router");
const orderRouter = require("./Routes/order.router");
const cartRouter = require("./Routes/cart.router");
const categoryRouter = require("./Routes/category.router");
const cors = require("cors");
const path = require("path");

port = 3000;
const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
connectDB();

app.use('/products',productRouter);
app.use('/user',userRouter);
app.use('/cart',cartRouter);
app.use('/orders',orderRouter);
app.use('/categories',categoryRouter);
app.use("/imgs", express.static(path.join(__dirname, "imgs")));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
