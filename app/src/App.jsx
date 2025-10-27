import { Routes, Route, Navigate } from "react-router-dom"
import Test from "./pages/Test"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
    const ProtectedRoutes = ({children}) => {
        if (localStorage.getItem("jwt")) {
            return children
        }
        return <Navigate to="/login" />
    }

    return <>
        {localStorage.getItem("jwt") && <Navbar />}

        <main>
            <Routes>

                {/* public Routes */}
                <Route path="/login" element={<Login />} />

                {/* private Routes */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoutes>
                            <Routes>
                                <Route path="/" element={<Test />} />
                            </Routes>
                        </ProtectedRoutes>
                    }
                />
            
            </Routes>
        </main>

        {localStorage.getItem("jwt") && <Footer />}
    </>
}

export default App;