const app = require('./app/index');

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Server running on Port ${port}`)
});