import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./components/MainLayout";
import ThemePage from "./pages/Theme";

export const appRouter = createBrowserRouter([
	{
		path: "/",

		element: <AppLayout />,
		children: [
			{
				// matches "/" path to redirect
				index: true,
				element: <Navigate to="/theme" replace />,
			},
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

