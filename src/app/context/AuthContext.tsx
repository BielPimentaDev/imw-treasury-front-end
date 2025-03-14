'use client';
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import { TransactionInterface } from '../types/TransactionInterface';

interface TotalsInterface {
	total: number;
	totalIncome: number;
	totalExpense: number;
}

interface AuthContextType {
	transactions: TransactionInterface[];
	setTransactions: Dispatch<SetStateAction<TransactionInterface[]>>;

	totals: TotalsInterface;
	setTotals: Dispatch<SetStateAction<TotalsInterface>>;

	yearFilter: string;
	setYearFilter: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [yearFilter, setYearFilter] = useState<string>('2025');
	const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
	const [totals, setTotals] = useState<TotalsInterface>({
		total: 0,
		totalExpense: 0,
		totalIncome: 0,
	});
	return (
		<AuthContext.Provider
			value={{
				transactions,
				setTransactions,
				totals,
				setTotals,
				yearFilter,
				setYearFilter,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return useContext(AuthContext);
}
