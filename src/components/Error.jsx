import React from "react";
import useCotizador from "../hooks/useCotizador";

const Error = () => {
	const { error } = useCotizador();

	return (
		<div className="border text-center border-red-400 py-3 text-red-700 bg-red-100">
			<p>{error}</p>
		</div>
	);
};

export default Error;
