const app = require('./index');

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`Server is live at localhost:${PORT}`);
});
