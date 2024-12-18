import MainPage from "../pages/mainPage";
import {Route, Routes} from "react-router-dom";

const AllRoutes = () => {
    return (
        <Routes>
        <Route path="/" element={<MainPage/>}/>
    </Routes>)
}

export default AllRoutes;