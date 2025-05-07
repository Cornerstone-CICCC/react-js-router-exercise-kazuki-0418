import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ContactUs } from "./pages/Contact";
import { ProductList } from "./pages/ProductList";
import { ProductDetail } from "./pages/ProductDetail";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact-us" element={<ContactUs />} />
				<Route path="/products">
					<Route index element={<ProductList />} />
					<Route path=":id" element={<ProductDetail />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
