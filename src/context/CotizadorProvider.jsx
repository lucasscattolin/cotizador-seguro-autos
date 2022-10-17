import { createContext, useState } from "react";
import { calcularMarca, calcularPlan, formatearDinero, obtenerDiferenciaYear } from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
	const [datos, setDatos] = useState({
		marca: "",
		year: "",
		plan: "",
	});

	const [error, setError] = useState("");
	const [resultado, setResultado] = useState(0);
	const [cargando, setCargando] = useState(false);

	const handleChangeDatos = (e) => {
		setDatos({ ...datos, [e.target.name]: e.target.value });
	};

	const cotizarSeguro = () => {
		// Base
		let resultado = 2000;

		// Obtener diferencia de años
		const diferencia = obtenerDiferenciaYear(datos.year);

		// Restar 2% por cada año
		resultado -= diferencia * 0.02 * resultado;

		// Europeo 30% - Americano 15% - Asiatico 5%
		resultado *= calcularMarca(datos.marca);

		//Basico 20% - Premium 40% - Platinium 60%
		resultado *= calcularPlan(datos.plan);

		setCargando(true);
		setTimeout(() => {
			setResultado(formatearDinero(resultado));
			setCargando(false);
		}, 3000);
	};

	return (
		<CotizadorContext.Provider
			value={{ datos, handleChangeDatos, error, setError, cotizarSeguro, resultado, cargando }}
		>
			{children}
		</CotizadorContext.Provider>
	);
};

export { CotizadorProvider };

export default CotizadorContext;
