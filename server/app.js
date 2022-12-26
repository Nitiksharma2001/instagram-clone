const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const {MONGOURI, PORT} = require("./keys");

app.use(express.json());
app.use(cors());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
	console.log("connected to db");
})
mongoose.connection.on("error", (error) => {
	console.log("error :", error);
})

app.listen(PORT, () => {
	console.log("server is listening to port", PORT || 3000);
})
