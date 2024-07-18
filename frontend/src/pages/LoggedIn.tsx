import { useState, useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import BoxReveal from "@/components/magicui/box-reveal";
import style from "./styles/LoggedIn.module.css";
import toast, { Toaster } from 'react-hot-toast';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp"

interface User {
	id: string;
	given_name: string;
	family_name: string;
	email: string;
	picture: string;
}

// Constants:
const baseURL = "http://localhost:3001";

export default function LoggedIn() {
	const [ otp, setOtp ] = useState("");
	const { user, logout } = useKindeAuth();

	function addUser(user: User) {
		try {
			fetch(`${baseURL}/users/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			console.log('User added successfully');
		} catch (error) {
			console.error('Error adding user:', error);
		}
	}

	useEffect(() => {
		addUser(user as User);
	}, [user]);

	// TODO: Recuerda borrar el restrict mode al pasar a produccion
	useEffect(() => {
		if (otp.length === 6) {
			toast.success('Código correcto, desbloqueando recompensas', {
				duration: 2000,
			});
		}
	}, [otp]);

	// Debugging
	console.log(user);
	console.log(otp);

	return (
		<div className={style.father}>
			<Toaster
				position="bottom-center"
				reverseOrder={false}
				toastOptions={{
					style: {
						fontFamily: 'Avenir',
						fontWeight: '500',
						backgroundColor: 'transparent',
						color: 'white',
						zIndex: 1,
					},
					iconTheme: {
						primary: '#5AE2D7',
						secondary: 'white',
					},
				}}
			/>
			<div className={style.bgPalmTree}>
				<img src="/boat.svg" alt="Logo" />
			</div>
			<div className="h-full w-full max-w-[32rem] items-center justify-center overflow-hidden pt-8">
				<BoxReveal boxColor={"rgba(255,204,255,0.43)"} duration={1}>
					<p className="text-[3.5rem] font-semibold">
						Hola, <span className="text-[#ffccff] text-[2rem]">{user?.given_name}.</span>
					</p>
				</BoxReveal>

				<BoxReveal boxColor={"rgba(255,204,255,0.43)"} duration={1}>
					<h2 className="mt-[.5rem] text-[1rem]">
						Sigue los pasos para desbloquear{" "}
						<span className="text-[#ffccff]"><b>RECOMPENSAS</b></span>
					</h2>
				</BoxReveal>

				<BoxReveal boxColor={"rgba(255,204,255,0.43)"} duration={1}>
					<div className="mt-[1.5rem]">
						<p>
							1. Introduce el código de referido de tu<br />
							<span className="font-semibold text-[#ffccff]"><b> amigo.</b></span> <br />
							<br />
							2. Espera la validación de tu<br />
							<span className="font-semibold text-[#ffccff]"> <b>código de 8 caracteres.</b></span> <br />
							<br />
							3. Enseña el código QR al<br />
							<span className="font-semibold text-[#ffccff]"> <b>responsable.</b></span> <br />
							<br />
							4. Desbloquea el panel de recompensas y<br />
							<span className="font-semibold text-[#ffccff]"> <b>disfruta.</b></span>
						</p>
					</div>
				</BoxReveal>

				<div className="mt-[1.5rem] flex justify-center items-center direction-column">
						<div className="mt-[1.5rem] flex justify-center">
							<InputOTP
								maxLength={6}
								pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
								value={otp}
								onChange={(value) => setOtp(value.toUpperCase())}
								>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						</div>
				</div>
				<p className="mt-[1.5rem] text-[#ffccff] text-[1rem] font-semibold flex justify-center">Introduce el código</p>


			</div>
		</div>
	);
}


/*import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

<button onClick={logout} type="button" className="mt-[1.5rem] bg-[#ffccff] text-[#ff99ff] py-2 px-4 rounded-md"> Cerrar Sesión </button>
export default function LoggedIn() {
	const { user, logout } = useKindeAuth();

	console.log(user);

	return (
		<div>
			<h1>Welcome, {user?.given_name}</h1>
			<button onClick={logout} type="button">Log Out</button>
		</div>
	);
}*/



