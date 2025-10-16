export type ThemeType = {
	code: string;
	name: string;
	config: ColorPreset;
};

export type ColorPreset = {
	primary: string;
	primaryDark?: string;
	primaryLight?: string;
	secondary: string;
	gradientPrimary: GradientColorType;
	gradientSecondary?: GradientColorType;
	textLight?: string;
	textDark?: string;
	success?: string;
	warning?: string;
	error?: string;
	active?: string;
	disabled?: string;
};


type GradientColorType = [string, string]