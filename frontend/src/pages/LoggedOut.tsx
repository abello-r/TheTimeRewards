import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import style from "./styles/LoggedOut.module.css";

// Magic UI Components
import SparklesText from "../components/magicui/sparkles-text";
import WordRotate from "../components/magicui/word-rotate";

export default function LoggedOut() {
	const { login, register } = useKindeAuth();

	const handleRegister = async () => {
		try {
			await register();
		} catch (error) {
			console.error(error);
		}
	}

	const handleLogin = async () => {
		try {
			await login();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<div className={style.father}>
				<img src="/palmtree.svg" alt="Logo" className={style.bg}/>
				<WordRotate
					  className="text-4xl font-bold dark:text-white text-white text-center drop-shadow-sm font-[Dancing]"
					  words={["¡Invita Amigos!", "¡Gana Recompensas!"]}
				/>
				<div className={style.logoBox}>
					<img src="/triangle.svg" alt="Logo" className={style.triangle}/>
					<h3 className={style.titleTextTop}>The</h3>
					<h1 className={style.titleTextBottom}>Time</h1>
					<SparklesText 
						text="Rewards" 
						className={style.dynamicTitleText}
						colors={
							{first: '#FFFFFF', second: '#FFFFFF'}
						}
						sparklesCount={5}
					/>
				</div>
				<div className={style.actionBox}>
					<button className={style.actBtn} onClick={handleRegister} type="button">Registrate</button>
					<button className={style.actBtn} onClick={handleLogin} type="button">Iniciar Sesión</button>
				</div>
				<footer className={style.footerBox}>
					<p className={style.footerText}>© 2024 - The Time Hair Studio</p>
					<a href="http://localhost:3000/disclaimer" target="_blank" rel="noreferrer" className={style.footerText}>Términos y condiciones</a>
				</footer>
			</div>
		</>
	);
}