import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function LoggedIn() {
	const { user, logout } = useKindeAuth();

	console.log(user);

	return (
		<div>
			<h1>Welcome, {user?.given_name}</h1>
			<button onClick={logout} type="button">Log Out</button>
		</div>
	);
}