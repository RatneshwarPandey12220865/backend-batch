import express from "express";

const app = express();
// middleware for parsing json data
app.use(express.json());
const PORT = process.env.PORT || 8000;

const userData = [
  { id: 1, name: "John Doe", displayname: "John D" },
  { id: 2, name: "Jane Doe", displayname: "Jane D" },
  { id: 3, name: "John Smith", displayname: "John S" },
  { id: 4, name: "Jane Smith", displayname: "Jane S" },
  { id: 5, name: "John Wick", displayname: "John W" },
  { id: 6, name: "Jane Wick", displayname: "Jane W" },
  { id: 7, name: "John Cena", displayname: "John C" },
  { id: 8, name: "Jane Cena", displayname: "Jane C" },
];

// * GET REQUESTS
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World" });
});

// Industry standards
app.get("/api/v1/users", (req, res) => {
  console.log(req.query);
  res.status(200).send(userData);
});

// routes parameters
app.get("/api/v1/users/:id", (req, res) => {
  const id = req.params.id;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    res.status(400).send({ msg: "Invalid ID" });
  }

  const user = userData.find((user) => user.id === parsedId);
  res.status(200).send(user);
});

app.get("/api/v1/producsts", (req, res) => {
  res.status(200).send([
    { id: 1, name: "Iphone 13" },
    { id: 2, name: "Samsung S21" },
    { id: 3, name: "One Plus 9" },
    { id: 4, name: "Google Pixel 6" },
  ]);
});

// * POST REQUESTS

app.post("/api/v1/users", (req, res) => {
  console.log(req.body);
  const newUser = { id: userData.length + 1, ...req.body };
  userData.push(newUser);

  res.status(201).send(newUser);
});

// * PUT REQUESTS ( update all fields)
app.put("/api/v1/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    res.status(400).send({ msg: "Invalid ID" });
  }

  const userIndex = userData.findIndex((user) => user.id === parsedId);

  if (userIndex === -1) {
    res.status(404).send({ msg: "User not found" });
  }

  userData[userIndex] = { id: parsedId, ...body };

  res.status(200).send(userData[userIndex]);
});

// * PATCH REQUESTS ( update only specific fields)
app.patch("/api/v1/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    res.status(400).send({ msg: "Invalid ID" });
  }

  const userIndex = userData.findIndex((user) => user.id === parsedId);

  if (userIndex === -1) {
    res.status(404).send({ msg: "User not found" });
  }

  userData[userIndex] = { ...userData[userIndex], ...body };

  res.status(200).send(userData[userIndex]);
});
// * DELETE REQUESTS

app.delete("/api/v1/users/:id", (req, res) => {
    const {
        params: { id },
    } = req;
    
    const parsedId = parseInt(id);
    
    if (isNaN(parsedId)) {
        res.status(400).send({ msg: "Invalid ID" });
    }
    
    const userIndex = userData.findIndex((user) => user.id === parsedId);
    
    if (userIndex === -1) {
        res.status(404).send({ msg: "User not found" });
    }
    
    userData.splice(userIndex, 1);
    
    res.status(204).send(userData);
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

// loclahost:8000
