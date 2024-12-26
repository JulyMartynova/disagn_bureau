import MainPage from "../pages/mainPage";
import ContactPage from "../pages/contactPage";
import AboutPage from "../pages/aboutPage";
import TechSupportPage from "../pages/techSupport";
import {Route, Routes} from "react-router-dom";
import ProjectsPage from "../pages/projectsPage"
import ProjectPage from "../pages/projectPage"

const AllRoutes = () => {
    return (
        <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/techSupport" element={<TechSupportPage/>}/>
        <Route path="/projects" element = {<ProjectsPage/>}/>
        <Route path="/projects/:projectName" element = {<ProjectPage/>}/>
    </Routes>)
}

export default AllRoutes;