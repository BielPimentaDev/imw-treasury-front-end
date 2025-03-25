import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
	TransactionInterface,
	TransactionSendedInterface,
} from '../types/TransactionInterface';
import { useTotalsHandler } from '../hooks/useTotalsHandler';
import { oldTransactionType } from '../modals/EditModal';

export function useTransactionsApi() {
	const { transactions, setTransactions, setTotals, yearFilter } = useAuth();
	const { totalsHandler, totalsHandlerRemove } = useTotalsHandler();
	const fetchTransactions = async () => {
		try {
			const response = await axios.get(
				`https://vx3g7pz02b.execute-api.sa-east-1.amazonaws.com/dev/transactions?year=${yearFilter}`
			);

			setTransactions(response.data.items);
			setTotals({
				total: response.data.total,
				totalExpense: response.data.totalExpense,
				totalIncome: response.data.totalIncome,
			});
		} catch (error) {
			console.error('Erro ao buscar transações:', error);
		}
	};

	const addTransaction = async (body: TransactionSendedInterface) => {
		try {
			const response = await axios.post(
				'https://vx3g7pz02b.execute-api.sa-east-1.amazonaws.com/dev/transactions',
				body,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			console.log(response);
			// setTransactions((curr) => [...curr, response.data.item]);
			// totalsHandler({ price: Number(body.price), type: body.type });
			fetchTransactions();
		} catch (error) {
			console.error('Erro ao enviar dados:', error);
		}
	};

	const editTransaction = async (
		newTransaction: TransactionInterface,
		oldTransaction: oldTransactionType
	) => {
		console.log(newTransaction);
		try {
			await axios.put(
				'https://vx3g7pz02b.execute-api.sa-east-1.amazonaws.com/dev/transactions',
				JSON.stringify(newTransaction),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			fetchTransactions();
		} catch (error) {
			console.error('Erro ao editar transação:', error);
		}
	};

	const deleteTransaction = async (id: string, price: number, type: string) => {
		try {
			const response = await axios.delete(
				'https://vx3g7pz02b.execute-api.sa-east-1.amazonaws.com/dev/transactions',
				{
					params: { id },
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			console.log('Transação deletada:', response.data);

			setTransactions(
				transactions.filter((transaction) => transaction.id !== id)
			);
			fetchTransactions();
		} catch (error) {
			console.error('Erro ao excluir transação:', error);
		}
	};

	return {
		fetchTransactions,
		addTransaction,
		deleteTransaction,
		editTransaction,
	};
}
