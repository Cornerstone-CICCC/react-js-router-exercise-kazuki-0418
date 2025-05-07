import React from "react";
import { useNavigate } from "react-router-dom";

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	sku: string;
	weight: number;
	dimentions: {
		height: number;
		width: number;
		depth: number;
	};
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: {
		rating: number;
		comment: string;
		date: string;
		reviewerName: string;
		reviewerEmail: string;
	}[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: {
		createdAt: string;
		updatedAt: string;
		barcode: string;
		qrCode: string;
	};
	images: string[];
	thumbnail: string;
};

export function ProductList() {
	const [products, setProducts] = React.useState<Product[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<{
		message: string;
	} | null>(null);

	const navigate = useNavigate();

	console.log("ProductList component rendered");
	console.log("Products:", products);

	React.useEffect(() => {
		fetch("https://dummyjson.com/products")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setProducts(data.products);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);

	const handleProductClick = (productId: number) => {
		// Handle product click, e.g., navigate to product details page
		navigate(`/products/${productId}`);
	};

	return (
		<div>
			<h1>Product List</h1>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{!loading && !error && (
				<ul>
					{products.map((product) => (
						<div
							key={product.id}
							onClick={() => handleProductClick(product.id)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleProductClick(product.id);
								}
							}}
							style={{ cursor: "pointer" }}
						>
							<li key={product.id}>
								<h2>{product.title}</h2>
								<p>Price: ${product.price}</p>
								<p>{product.description}</p>
								<img
									src={product.images[0]}
									alt={product.title}
									style={{ width: "100px", height: "100px" }}
								/>
							</li>
						</div>
					))}
				</ul>
			)}
		</div>
	);
}
