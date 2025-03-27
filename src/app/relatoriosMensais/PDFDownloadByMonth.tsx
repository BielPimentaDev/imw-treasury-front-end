'use client';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import { FaFileDownload } from 'react-icons/fa';

interface PDFDownloadByMonthProps {
	text: string;
	year: string;
	month: number;
	withItems?: boolean;
	monthName: string;
}

export default function PDFDownloadByMonth({
	text,
	year,
	month,
	withItems = true,
	monthName,
}: PDFDownloadByMonthProps) {
	const getMonthName = (month: number) => {
		const months = [
			'Janeiro',
			'Fevereiro',
			'Março',
			'Abril',
			'Maio',
			'Junho',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro',
		];
		return months[month - 1];
	};

	const getPreviousMonth = (month: number, year: number) => {
		if (month === 1) {
			return { month: 12, year: year - 1 };
		}
		return { month: month - 1, year };
	};

	const getNextMonth = (month: number, year: number) => {
		if (month === 12) {
			return { month: 1, year: year + 1 };
		}
		return { month: month + 1, year };
	};

	const generatePDF = async () => {
		const fetchMonthData = async (year: string, month: number) => {
			const response = await axios.get(
				`https://vx3g7pz02b.execute-api.sa-east-1.amazonaws.com/dev/gettransactions?year=${year}&month=${month}`
			);
			return response.data;
		};

		const data = await fetchMonthData(year, month);
		const items = data.items;

		const doc = new jsPDF();
		doc.setFontSize(16);
		doc.text(`${text} ${year} - ${month}`, 105, 15, { align: 'center' });

		if (withItems) {
			const columns = ['Data', 'Categoria', 'Descrição', 'Valor', 'Tipo'];
			const rows = items.map((item) => [
				item.date,
				item.category,
				item.description,
				`R$ ${Number(item.price).toFixed(2)}`,
				item.type,
			]);

			autoTable(doc, {
				startY: 30,
				head: [columns],
				body: rows,
				theme: 'grid',
				styles: { halign: 'center' },
				columnStyles: {
					0: { halign: 'left' },
					1: { halign: 'left' },
					2: { halign: 'left' },
					3: { halign: 'right' },
					4: { halign: 'center' },
				},
			});
		}

		const previousMonth = getPreviousMonth(month, parseInt(year));
		const nextMonth = getNextMonth(month, parseInt(year));
		const previousMonthName = getMonthName(previousMonth.month);
		const nextMonthName = getMonthName(nextMonth.month);

		const finalY = withItems ? (doc as any).lastAutoTable?.finalY || 30 : 30;
		doc.setDrawColor(0);
		doc.setLineWidth(0.5);
		doc.line(14, finalY + 5, 196, finalY + 5);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'bold');
		doc.text('Resumo Financeiro', 105, finalY + 15, { align: 'center' });

		const summaryData = [
			[
				`Saldo do mês de ${previousMonthName} de ${previousMonth.year}:`,
				`R$ ${data.previousMonthTotal.toFixed(2)}`,
			],
			[
				`Total entradas de ${monthName} de ${year}:`,
				`R$ ${data.totalIncome.toFixed(2)}`,
			],
			[
				`Total saídas de ${monthName} de ${year}:`,
				`R$ ${data.totalExpense.toFixed(2)}`,
			],
			[
				`Total a transportar para ${nextMonthName} de ${nextMonth.year}:`,
				`R$ ${
					Number(data.total.toFixed(2)) +
					Number(data.previousMonthTotal.toFixed(2))
				}`,
			],
		];

		autoTable(doc, {
			startY: finalY + 20,
			body: summaryData,
			theme: 'grid',
			styles: { halign: 'right' },
			columnStyles: { 0: { halign: 'left', fontStyle: 'bold' } },
		});

		doc.save(`${text} ${year}-${monthName}.pdf`);
	};

	return (
		<button
			onClick={generatePDF}
			className='flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'>
			<FaFileDownload size={24} />
			<p>{text}</p>
		</button>
	);
}
