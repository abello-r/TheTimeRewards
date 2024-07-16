import React from 'react'
import ReactDOM from 'react-dom/client'
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<KindeProvider
			clientId={import.meta.env.KINDE_CLIENT_ID}
			domain={import.meta.env.KINDE_DOMAIN}
			redirectUri={import.meta.env.KINDE_REDIRECT_URI}
			logoutUri={import.meta.env.KINDE_LOGOUT_URI}
		>
			<App />
		</KindeProvider>
	</React.StrictMode>,
)