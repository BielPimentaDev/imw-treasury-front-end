'use client';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
// import { MdDownload } from 'react-icons/md';
import { FaFileDownload } from 'react-icons/fa';

interface PDFDownloadProps {
	text: string;
	year: string;
	quarter?: string;
	withItems?: boolean;
	isBienio?: boolean;
}
export default function PDFDownload({
	text,
	year,
	quarter,
	withItems = true,
	isBienio = false,
}: PDFDownloadProps) {
	const generatePDF = async () => {
		const fetchYearData = async (year: string) => {
			const response = await axios.get(
				`https://vx3g7pz02b.execute-api.sa-east-1.amazonaws.com/dev/transactions?year=${year}&quarter=${quarter}`
			);
			return response.data;
		};

		const currentYearData = await fetchYearData(year);
		let nextYearData = null;
		let nextYear = (parseInt(year) + 1).toString();

		if (isBienio) {
			nextYearData = await fetchYearData(nextYear);
		}

		// Combinar os itens dos dois anos se for biênio
		const items = nextYearData
			? [...currentYearData.items, ...nextYearData.items]
			: currentYearData.items;

		// Criar documento PDF
		const doc = new jsPDF();
		doc.setFontSize(16);
		doc.text(
			text + ' ' + (isBienio ? `${year} e ${nextYear}` : year),
			105,
			15,
			{ align: 'center' }
		);

		if (withItems) {
			const columns = [
				'Data',
				'Categoria',
				'Descrição',
				'Valor',
				'Tipo',
				'Bimestre',
			];
			const rows = items.map((item) => [
				item.date,
				item.category,
				item.description,
				`R$ ${item.price.toFixed(2)}`,
				item.type,
				item.quarter || '-',
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
					5: { halign: 'center' },
				},
			});
		}

		// Definir posição do resumo financeiro
		const finalY = withItems ? (doc as any).lastAutoTable?.finalY || 30 : 30;
		doc.setDrawColor(0);
		doc.setLineWidth(0.5);
		doc.line(14, finalY + 5, 196, finalY + 5);

		doc.setFontSize(14);
		doc.setFont('helvetica', 'bold');
		doc.text(`Resumo Financeiro`, 105, finalY + 15, { align: 'center' });

		const summaryData = [];

		// Adicionar dados de 2025
		summaryData.push(
			[
				`Saldo Anterior ${year}:`,
				`R$ ${currentYearData.previousYearTotal.toFixed(2)}`,
			],
			[
				`Total Entradas ${year}:`,
				`R$ ${currentYearData.totalIncome.toFixed(2)}`,
			],
			[
				`Total Saídas ${year}:`,
				`R$ ${currentYearData.totalExpense.toFixed(2)}`,
			],
			[`Total a transportar ${year}:`, `R$ ${currentYearData.total.toFixed(2)}`]
		);

		// Se for biênio, adicionar dados de 2026 e o total do biênio
		if (isBienio && nextYearData) {
			summaryData.push(
				['', ''], // Linha em branco
				[
					`Saldo Anterior ${nextYear}:`,
					`R$ ${nextYearData.previousYearTotal.toFixed(2)}`,
				],
				[
					`Total Entradas ${nextYear}:`,
					`R$ ${nextYearData.totalIncome.toFixed(2)}`,
				],
				[
					`Total Saídas ${nextYear}:`,
					`R$ ${nextYearData.totalExpense.toFixed(2)}`,
				],
				[`Total ${nextYear}:`, `R$ ${nextYearData.total.toFixed(2)}`],
				['', ''], // Linha separadora
				[
					`Saldo Anterior Biênio:`,
					`R$ ${currentYearData.previousYearTotal.toFixed(2)}`,
				],
				[
					`Total Entradas Biênio:`,
					`R$ ${(
						currentYearData.totalIncome + nextYearData.totalIncome
					).toFixed(2)}`,
				],
				[
					`Total Saídas Biênio:`,
					`R$ ${(
						currentYearData.totalExpense + nextYearData.totalExpense
					).toFixed(2)}`,
				],
				[
					`Total Biênio:`,
					`R$ ${(currentYearData.total + nextYearData.total).toFixed(2)}`,
				]
			);
		}

		autoTable(doc, {
			startY: finalY + 20,
			body: summaryData,
			theme: 'grid',
			styles: { halign: 'right' },
			columnStyles: { 0: { halign: 'left', fontStyle: 'bold' } },
		});

		doc.save(`${text} ${year}${isBienio ? `_${nextYear}` : ''}.pdf`);
	};

	return (
		<button
			onClick={generatePDF}
			className='flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'>
			<FaFileDownload size={24} />
			<p className=''>{text}</p>
		</button>
	);
}
