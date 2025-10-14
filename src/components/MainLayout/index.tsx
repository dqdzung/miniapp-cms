import {
	AppShell,
	Group,
	Burger,
	Image,
	Center,
	Loader,
	ScrollArea,
} from "@mantine/core";
import { Navbar } from "../Navbar";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import logoIris from "../../assets/logoiris.png";
import { Suspense } from "react";
import { APP_SHELL_MAIN_HEIGHT_STYLE_STRING } from "../../utils/const";

export default function AppLayout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
		>
			<AppShell.Header
				withBorder={false}
				style={{ boxShadow: "var(--mantine-shadow-xs)" }}
			>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

					<Image h={50} w="auto" fit="cover" src={logoIris} />
				</Group>
			</AppShell.Header>

			<AppShell.Navbar>
				<Navbar />
			</AppShell.Navbar>

			<AppShell.Main p="none">
				<Suspense
					fallback={
						<Center h={APP_SHELL_MAIN_HEIGHT_STYLE_STRING}>
							<Loader color="violet.7" size="lg" />
						</Center>
					}
				>
					<ScrollArea
						bg="gray.0"
						p="md"
						h={APP_SHELL_MAIN_HEIGHT_STYLE_STRING}
						scrollbarSize={10}
						type="auto"
					>
						<Outlet />
					</ScrollArea>
				</Suspense>
			</AppShell.Main>
		</AppShell>
	);
}

