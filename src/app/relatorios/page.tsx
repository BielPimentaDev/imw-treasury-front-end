'use client';

import React from 'react';

import PDFDownload from './PDFDownload';

// import { FaFileDownload } from 'react-icons/fa';

// const PDFDownload = ({ text, year, quarter }) => (
// 	<button className='flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'>
// 		<FaFileDownload /> {text}
// 	</button>
// );

export default function Relatorios() {
	return (
		<div className='mt-12 p-6 max-w-4xl mx-auto'>
			<h1 className='font-bold text-2xl pb-2 border-b-2 mb-4'>
				Relatórios 2025/2026
			</h1>
			<p className='font-medium text-gray-600 mb-6'>
				Clique no botão para baixar o relatório desejado.
			</p>
			<div className='flex gap-4 mb-12'>
				<PDFDownload
					text='Relatório Geral 2025/2026'
					year='2025'
					quarter=''
					isBienio
				/>

				<PDFDownload
					text='Relatório Geral sem itens 2025/2026'
					year='2025'
					quarter=''
					isBienio
					withItems={false}
				/>
			</div>
			<br />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{['2025', '2026'].map((year) => (
					<div key={year} className='p-4 border rounded-lg shadow-md'>
						<h2 className='font-bold text-xl mb-6 border-b pb-2'>{year}</h2>
						<PDFDownload text='Relatório Geral' year={year} quarter='' />
						<div className='mt-6 space-y-2'>
							{[1, 2, 3, 4].map((quarter) => (
								<PDFDownload
									key={quarter}
									text={`Relatório ${quarter}º Bimestre`}
									year={year}
									quarter={String(quarter)}
								/>
							))}
						</div>
						<div className='mt-6'>
							<PDFDownload
								text='Resumo de gastos'
								year={year}
								quarter=''
								withItems={false}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

// export default function Reposts() {
// 	return (
// 		<div className='mt-12'>
// 			<h1 className='font-bold text-2xl flex items-center pb-2 '>
// 				Relatorios 2025/2026
// 			</h1>
// 			<p className='font-medium text-gray-600 mb-4'>
// 				Clique no botão para baixar o relatório desejado.
// 			</p>
// 			<PDFDownload text='Relatorio Geral do bienio' year='2025' quarter='' />
// 			<div className='flex items-center  gap-64'>
// 				<div className='mt-12 flex flex-col   items-start gap-2'>
// 					<h2 className='font-bold text-3xl mb-2 border-b-2'>2025</h2>
// 					<PDFDownload text='Relatório Geral' year='2025' quarter='' />
// 					<br />

// 					<PDFDownload text='Relatório 1º Bimestre' year='2025' quarter='1' />
// 					<PDFDownload text='Relatório 2º Bimestre' year='2025' quarter='2' />
// 					<PDFDownload text='Relatório 3º Bimestre' year='2025' quarter='3' />
// 					<PDFDownload text='Relatório 4º Bimestre' year='2025' quarter='4' />
// 					<br />
// 					<PDFDownload
// 						text='Relatorio total'
// 						year='2025'
// 						quarter='4'
// 						withItems={false}
// 					/>
// 				</div>
// 				<div className='mt-12 flex flex-col  items-start gap-2'>
// 					<h2 className='font-bold text-3xl mb-2 border-b-2'>2026</h2>
// 					<PDFDownload text='Relatório Geral' year='2026' quarter='' />
// 					<br />

// 					<PDFDownload text='Relatório 1º Bimestre' year='2026' quarter='1' />
// 					<PDFDownload text='Relatório 2º Bimestre' year='2026' quarter='2' />
// 					<PDFDownload text='Relatório 3º Bimestre' year='2026' quarter='3' />
// 					<PDFDownload text='Relatório 4º Bimestre' year='2026' quarter='4' />
// 					<br />
// 					<PDFDownload
// 						text='Relatório total'
// 						year='2025'
// 						quarter='4'
// 						withItems={false}
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
