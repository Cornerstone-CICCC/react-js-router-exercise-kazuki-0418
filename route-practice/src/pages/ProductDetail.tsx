import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "./ProductList";

export function ProductDetail() {
	const { id } = useParams<{ id: string }>();

	const [product, setProduct] = useState<Product | null>(null);

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await fetch(`https://dummyjson.com/products/${id}`);
				const data = await response.json();
				console.log("Product details:", data);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				setProduct(data);
			} catch (error) {
				console.error("Error fetching product details:", error);
			}
		};

		fetchProductDetails();
	}, [id]);

	return (
		<div>
			<h1>Product Detail</h1>
			{product ? (
				<div>
					<h2>{product.title}</h2>
					<img
						src={product.images[0]}
						alt={product.title}
						style={{ width: "200px", height: "200px" }}
					/>
					<p>Price: ${product.price}</p>
					<p>Description: {product.description}</p>
					<p>Category: {product.category}</p>
					<p>Rating: {product.rating}</p>
					<p>Stock: {product.stock}</p>
					<p>Brand: {product.brand}</p>
					<p>SKU: {product.sku}</p>
					<p>Weight: {product.weight} kg</p>
					<p>Warranty Information: {product.warrantyInformation}</p>
					<p>Shipping Information: {product.shippingInformation}</p>
					<p>Availability Status: {product.availabilityStatus}</p>
					<p>Return Policy: {product.returnPolicy}</p>
					<p>Minimum Order Quantity: {product.minimumOrderQuantity}</p>
					<p>Meta Information:</p>
					<ul>
						<li>Created At: {product.meta.createdAt}</li>
						<li>Updated At: {product.meta.updatedAt}</li>
						<li>Barcode: {product.meta.barcode}</li>
						<li>QR Code: {product.meta.qrCode}</li>
					</ul>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}
