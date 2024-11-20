import app from "./app"
const port = process.env.PORT || 8000; // Fallback to 8000 if no environment variable is set
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

