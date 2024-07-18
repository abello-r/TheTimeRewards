import ReactDOM from 'react-dom/client'
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<KindeProvider
		clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
		domain={import.meta.env.VITE_KINDE_DOMAIN}
		redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
		logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URI}
	>
		<App />
	</KindeProvider>
)
