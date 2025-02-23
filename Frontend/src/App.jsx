import Routes from "./routes";
import { AlertProvider } from "./components/providers/alert-provider";
import { DealsProvider } from "./components/providers/deals-provider";

function App() {
  return (
    <DealsProvider>
      <AlertProvider>
        <Routes />
      </AlertProvider>
    </DealsProvider>
  );
}

export default App;
