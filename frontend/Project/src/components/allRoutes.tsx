import MainPage from "../pages/mainPage";
import ContactPage from "../pages/contactPage";
import {Route, Routes} from "react-router-dom";

const AllRoutes = () => {
    return (
        <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
    </Routes>)
}

export default AllRoutes;