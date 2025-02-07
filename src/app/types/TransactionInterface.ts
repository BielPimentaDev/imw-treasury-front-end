export type TransactionInterface = {
	price: string;
	date: string;
	type: string;
	category: string;
	file: fileObject[];
	description: string;
	id: string;
	quarter: number;
};

export type TransactionSendedInterface = {
	price: string;
	date: string;

	category: string;
	file: fileObject[];
	description: string;
	id: string;
};

export type fileObject = {
	fileName: string;
	filePath: string;
};
