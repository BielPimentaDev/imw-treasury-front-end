'use client';

import React, { useState } from 'react';
import PDFDownloadByMonth from './PDFDownloadByMonth';

const months = [
	{ name: 'Janeiro', value: 1 },
	{ name: 'Fevereiro', value: 2 },
	{ name: 'Março', value: 3 },
	{ name: 'Abril', value: 4 },
	{ name: 'Maio', value: 5 },
	{ name: 'Junho', value: 6 },
	{ name: 'Julho', value: 7 },
	{ name: 'Agosto', value: 8 },
	{ name: 'Setembro', value: 9 },
	{ name: 'Outubro', value: 10 },
	{ name: 'Novembro', value: 11 },
	{ name: 'Dezembro', value: 12 },
];

export default function RelatoriosMensais() {
	const [year, setYear] = useState(new Date().getFullYear());

	return (
		<div className='mt-12 p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg'>
			<h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>
				Relatórios Mensais
			</h1>
			<div className='mb-4 flex justify-center items-center gap-4'>
				<label htmlFor='year' className='text-lg font-medium text-gray-700'>
					Selecione o Ano:
				</label>
				<select
					id='year'
					value={year}
					onChange={(e) => setYear(parseInt(e.target.value))}
					className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
					{Array.from({ length: 5 }, (_, i) => {
						const currentYear = new Date().getFullYear();
						const yearOption = currentYear - i;
						return (
							<option key={yearOption} value={yearOption}>
								{yearOption}
							</option>
						);
					})}
				</select>
			</div>
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
				{months.map((month) => (
					<PDFDownloadByMonth
						key={month.value}
						year={year.toString()}
						month={month.value}
						text={month.name}
						monthName={month.name}
					/>
				))}
			</div>
		</div>
	);
}
