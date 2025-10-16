import { useEffect, useState, useTransition } from "react";
import { supabase } from "../../utils/supabase";
import {
	Box,
	Button,
	ColorInput,
	Flex,
	Group,
	LoadingOverlay,
	Select,
	SimpleGrid,
	Stack,
	Text,
} from "@mantine/core";
import useQueryParams from "../../hooks/useQueryParams";
import type { ColorPreset, ThemeType } from "../../types/theme";
import { IconDeviceFloppy, IconPlus, IconRefresh } from "@tabler/icons-react";
import { useForm, type UseFormReturnType } from "@mantine/form";

const ThemePage = () => {
	const [themes, setThemes] = useState<ThemeType[]>([]);
	const [isPending, startTransition] = useTransition();
	const query = useQueryParams();

	const themeOptions = themes.map((theme) => ({
		label: theme.name,
		value: theme.code,
	}));

	const selected = query.getQueryParamByKey("select") || "default";

	const selectedTheme = themes.find((theme) => theme.code === selected);

	const form = useForm<ColorPreset>({
		mode: "controlled",
		initialValues: {} as any,
	});

	const fetchThemes = async () => {
		const { data: themes, error } = await supabase.from("themes").select("*");

		if (!error && themes && themes?.length > 1) {
			startTransition(() => setThemes(themes));
		}
	};

	const handleSelect = (value: string | null) => {
		value && query.setQueryParam("select", value);
	};

	const handleSubmit = (values: ColorPreset) => {
		startTransition(async () => {
			const { error } = await supabase
				.from("themes")
				.update({ config: values })
				.eq("code", selected);
			error && console.log(error);
		});
	};

	const handleResetForm = (values?: ColorPreset) => {
		if (!values) return;
		form.setValues(values);
		form.resetDirty();
	};

	useEffect(() => {
		startTransition(fetchThemes);
	}, []);

	useEffect(() => {
		if (selectedTheme) {
			handleResetForm(selectedTheme.config);
		}
	}, [selectedTheme]);

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<LoadingOverlay
				visible={isPending}
				zIndex={1000}
				overlayProps={{ blur: 3 }}
				loaderProps={{ color: "violet.7" }}
			/>
			<Stack gap={25}>
				<Group align="flex-end">
					<Select
						flex={1}
						label="Theme"
						placeholder="Chọn theme"
						data={themeOptions}
						value={selected}
						defaultValue={selected}
						onChange={handleSelect}
					/>
					<Button color="violet.7" leftSection={<IconPlus size={18} />}>
						Thêm mới
					</Button>
				</Group>

				{selectedTheme && <ThemeForm form={form} />}

				<Group>
					<Button
						flex={1}
						color="violet.7"
						leftSection={<IconRefresh size={18} />}
						onClick={() => handleResetForm(selectedTheme?.config)}
						disabled={!form.isDirty()}
						variant="outline"
					>
						Khôi phục
					</Button>

					<Button
						flex={1}
						type="submit"
						color="violet.7"
						leftSection={<IconDeviceFloppy size={18} />}
						disabled={!form.isDirty()}
					>
						Lưu
					</Button>
				</Group>
			</Stack>
		</form>
	);
};

export default ThemePage;

const ThemeForm = ({ form }: { form: UseFormReturnType<any> }) => {
	return (
		<SimpleGrid cols={{ base: 1, xs: 2 }} style={{ alignItems: "flex-end" }}>
			{Object.keys(form.values).map((k, idx) => {
				const color = (form.values as any)[k];
				if (color instanceof Array)
					// gradient color pair
					return (
						<Stack gap={0} key={`grad-${idx}`}>
							<Text fw={500} fz="sm">
								{k}
							</Text>
							<Flex direction="row" gap={10} align="center">
								{color.map((c, idx) => (
									<ColorInput
										key={idx}
										placeholder="Màu"
										value={c}
										w={"50%"}
										onChange={(value) => {
											const newArr = [...color];
											newArr[idx] = value;
											form.setFieldValue(k, newArr);
										}}
									/>
								))}

								<Box
									h={30}
									w={50}
									style={{
										background: `linear-gradient(${color[0]}, ${color[1]}`,
									}}
								/>
							</Flex>
						</Stack>
					);
				return (
					<ColorInput
						key={form.key(k)}
						label={k}
						placeholder="Màu"
						value={color}
						{...form.getInputProps(k)}
					/>
				);
			})}
		</SimpleGrid>
	);
};

