import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./Authentication/Login";
import Registration from "./Authentication/Registration";
import RequiredAuth from "./Authentication/RequiredAuth";
import Header from "./Header";
import Home from "./Pages/Home";
import AddTask from "./Pages/Tasks/AddTask";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Registration />} />
				<Route
					path='/addTask'
					element={
						<RequiredAuth>
							<AddTask />
						</RequiredAuth>
					}
				/>
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
