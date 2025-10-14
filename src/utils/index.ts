const formatCurrency = (value: number) => {
	const formatter = new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	});
	return formatter.format(value);
};

const updateArray = <T extends { code: string }>({
	item,
	array,
	type,
}: {
	item: T;
	array: T[];
	type: "add" | "remove";
}): T[] => {
	if (type === "add") {
		return [...array, item];
	} else {
		return array.filter((i: T) => i.code !== item.code);
	}
};

export { formatCurrency, updateArray };

