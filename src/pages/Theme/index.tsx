import { useEffect, useState, useTransition } from "react";
import { supabase } from "../../utils/supabase";
import {
	Button,
	Center,
	ColorInput,
	Group,
	Loader,
	Select,
	SimpleGrid,
	Stack,
} from "@mantine/core";
import { APP_SHELL_MAIN_HEIGHT_STYLE_STRING } from "../../utils/const";
import useQueryParams from "../../hooks/useQueryParams";
import type { ThemeType } from "../../types/theme";
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react";

const ThemePage = () => {
	const [themes, setThemes] = useState<ThemeType[]>([]);
	const [isPending, startTransition] = useTransition();
	const query = useQueryParams();

	const selection = themes.map((theme) => ({
		label: theme.name,
		value: theme.code,
	}));

	const selected = query.getQueryParamByKey("select") || "default";

	const selectedTheme = themes.find((theme) => theme.code === selected);

	const fetchThemes = async () => {
		const { data: themes, error } = await supabase.from("themes").select("*");

		if (!error && themes && themes?.length > 1) {
			startTransition(() => setThemes(themes));
		}
	};

	const handleSelect = (value: string | null) => {
		value && query.setQueryParam("select", value);
	};

	useEffect(() => {
		startTransition(fetchThemes);
	}, []);

	if (isPending)
		return (
			<Center h={APP_SHELL_MAIN_HEIGHT_STYLE_STRING}>
				<Loader color="violet.7" size="lg" />
			</Center>
		);

	return (
		<Stack gap={25}>
			<Group align="flex-end">
				<Select
					flex={1}
					label="Theme"
					placeholder="Chọn theme"
					data={selection}
					value={selected}
					defaultValue={selected}
					onChange={handleSelect}
				/>
				<Button color="violet.7" leftSection={<IconPlus size={18} />}>
					Thêm mới
				</Button>
			</Group>

			{selectedTheme && (
				<SimpleGrid
					cols={{ base: 1, xs: 2 }}
					style={{ alignItems: "flex-end" }}
				>
					{Object.keys(selectedTheme.config).map((k) => {
						const color = selectedTheme.config[k];
						if (color instanceof Array) return null;
						return (
							<ColorInput key={k} label={k} placeholder="Màu" value={color} />
						);
					})}
				</SimpleGrid>
			)}

			<Button color="violet.7" leftSection={<IconDeviceFloppy size={18} />}>
				Lưu
			</Button>
		</Stack>
	);
};

export default ThemePage;

