import React from 'react'
import ReactDOM from 'react-dom/client'
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import App from './App.tsx'
import './index.css'

console.log(import.meta.env)
console.log(import.meta.env.KINDE_REDIRECT_URI)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<KindeProvider
			clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
			domain={import.meta.env.VITE_KINDE_DOMAIN}
			redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
			logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URI}
		>
			<App />
		</KindeProvider>
	</React.StrictMode>,
)
