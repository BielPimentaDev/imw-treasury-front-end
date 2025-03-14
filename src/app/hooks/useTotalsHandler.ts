import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

interface totalsProps {
	type: string;
	price: number;
}

export function useTotalsHandler() {
	const { setTotals } = useAuth();

	const totalsHandler = useCallback(
		(props: totalsProps) => {
			if (props.type == 'entrada') {
				setTotals((curr) => ({
					...curr,
					totalIncome: curr.totalIncome + props.price,
				}));
			}
			if (props.type == 'saida') {
				setTotals((curr) => ({
					...curr,
					totalExpense: curr.totalExpense + props.price,
				}));
			}
		},
		[setTotals]
	);

	const totalsHandlerRemove = useCallback(
		(props: totalsProps) => {
			setTotals((curr) => {
				const price = Number(props.price);

				return props.type === 'entrada'
					? { ...curr, totalIncome: curr.totalIncome - price }
					: props.type === 'saida'
					? { ...curr, totalExpense: curr.totalExpense - price }
					: curr;
			});
		},
		[setTotals]
	);

	return { totalsHandler, totalsHandlerRemove };
}
