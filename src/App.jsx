import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/Navbar/Navbar"


function App(){

 console.log("APP IS RENDERING");

 

  return (<div>
   <div>
  
   <Navbar/>

  <AppRoutes />
    </div>
  </div>)

}
export default App ;