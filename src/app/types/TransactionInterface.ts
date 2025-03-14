export type TransactionInterface = {
	price: string;
	date: string;
	type: string;
	category: string;
	file: fileObject[] | string;
	description: string;
	id: string;
	quarter: number;
};

export type TransactionSendedInterface = {
	price: string;
	date: string;
	type: string;
	category: string;
	file: string | fileObject[];
	description: string;
};

export type fileObject = {
	fileName: string;
	filePath: string;
};

export interface deleteTransactionInterface {
	id: string;
	price: number;
	type: string;
}
