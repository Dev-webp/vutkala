import {Routes , Route} from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Jobs from "../pages/Jobs/Jobs";
import Services from "../pages/Servicess/Services"
import Hire from "../pages/Hire/Hire"

function AppRoutes(){
    return (
        <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs/>} />

        <Route path="/services" element={<Services/>}/>

        <Route path="/hire" element={<Hire />}/>


        </Routes>
    )
}

export default AppRoutes;