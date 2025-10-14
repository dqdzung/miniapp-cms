import { MantineProvider } from "@mantine/core";
import { appRouter } from "./router";
import { RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";

function App() {
	return (
		<MantineProvider>
			<RouterProvider router={appRouter} />;
		</MantineProvider>
	);
}

export default App;

