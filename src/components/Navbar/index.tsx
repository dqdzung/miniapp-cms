import { useState } from "react";
import {
	IconDatabaseImport,
	IconLogout,
	IconSettings,
	IconSwitchHorizontal,
} from "@tabler/icons-react";
import classes from "./style.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const data = [
	{ link: "/content", label: "Nội dung", icon: IconDatabaseImport },
	{ link: "/theme", label: "Theme", icon: IconSettings },
];

export function Navbar() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [active, setActive] = useState(pathname || data[0].link);

	const links = data.map((item) => (
		<a
			className={classes.link}
			data-active={item.link === active || undefined}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				event.preventDefault();
				setActive(item.link);
				navigate(item.link);
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</a>
	));

	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarMain}>{links}</div>

			<div className={classes.footer}>
				<a
					href="#"
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					<IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
					<span>Change account</span>
				</a>

				<a
					href="#"
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span>Logout</span>
				</a>
			</div>
		</nav>
	);
}

