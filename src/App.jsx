import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar/Navbar";

function App() {
  console.log("APP IS RENDERING");

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;