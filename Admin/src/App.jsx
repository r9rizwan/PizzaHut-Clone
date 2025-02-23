import { ThemeProvider } from "./components/providers";
import Router from "./routes";
import AuthProvider from "./components/providers/auth-provider";
import { AlertProvider } from "./components/providers/alert-provider";

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
