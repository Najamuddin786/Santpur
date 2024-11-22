import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "../Pages/Home";
import { Route,Router,Routes,Navigate } from "react-router-dom";

export default function AllRouter(){

    return <>
       
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
            </Routes>
        


    </>
}