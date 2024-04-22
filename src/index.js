const express = require("express");
const dotenv = require("dotenv")
const app = express();
dotenv.config();

const port = process.env.PORT;
const hostname = "127.0.0.1";

app.get("/api",(req, res)=> {
  res.send("Hello World!")
})
// ====================================================================================================================
// app.get("/", (req, res) => res.send("Hello World"));
// app.get("/about", (req, res) =>
//   res.status(200).json({
//     status: "success",
//     message: "About Page",
//     data: [],
//   })
// );
// app.post("/contoh", (req, res) => res.send("Request dengan method POST"));

// app.put("/contoh", (req, res) => res.send("Request dengan method PUT"));

// app.patch("/contoh", (req, res) => res.send("Request dengan method PATCH"));

// app.delete("/contoh", (req, res) => res.send("Request dengan method DELETE"));

// //Params
// app.get("/post/:id", (req, res) => {
//   const id = req.params.id;
//   res.send(`Post dengan ID ${id}`);
// });
// //Query string
// app.get("/post", (req, res) => {
//   const { page } = req.query;
//   res.send(`Data yang didapatkan adalah ${page}`);
// });

// ====================================================================================================================

app.listen(port, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);