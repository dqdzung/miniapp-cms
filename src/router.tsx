import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/MainLayout";
import ThemePage from "./pages/Theme";

export const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/content",
				element: <div>content</div>,
			},
			{
				path: "/theme",
				element: <ThemePage />,
			},
		],
	},
]);

