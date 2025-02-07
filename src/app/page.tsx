'use client';

import { useEffect, useState } from 'react';
import { fileObject, TransactionInterface } from './types/TransactionInterface';
import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';
import AddModal from './modals/AddModal';
import axios from 'axios';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AddModal from './modals/AddModal';
// import EditModal from './modals/EditModal';
// import { TransactionInterface } from './types/TransactionInterface';
// import DeleteModal from './modals/DeleteModal';

export default function Home() {
	const [deleteTransactionId, setDeleteTransactionId] = useState<
		string | null
	>();
	const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
	const [selectedTransaction, setSelectedTransaction] =
		useState<TransactionInterface | null>(null);

	const baixarArquivos = (files: fileObject[]) => {
		const file_ = files[0];
		const link = document.createElement('a');
		link.href = file_.filePath;
		link.setAttribute('download', file_.fileName);
		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		link.click();
	};

	const [openTransactionModal, setOpenTransactionModal] = useState(true);
	const [openDeleteTransaction, setOpenDeleteTransaction] = useState(false);
	const [openTransactionEditModal, setOpenTransactionEditModal] =
		useState(false);

	const handleMultipleDownloads = (files: fileObject[]) => {
		files.forEach((file) => handleDownload(file.filePath, file.fileName));
	};

	const handleDownload = async (fileUrl: string, fileName: string) => {
		const response = await fetch(fileUrl);
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = fileName; // Nome do arquivo baixado
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Revogar o objeto URL para liberar memória
		window.URL.revokeObjectURL(url);
	};

	useEffect(() => {
		// Função para buscar os dados
		const fetchTransactions = async () => {
			try {
				const response = await axios.get(
					'https://vx3g7pz02b.execute-api.sa-east-1.amazonaws.com/dev/transactions'
				);
				setTransactions(response.data.items);
				console.log(transactions);
			} catch (error) {
				console.error('Erro ao buscar transações:', error);
			}
		};

		fetchTransactions();
	}, []);
	return (
		<main className='px-4 max-w-[1700px] mx-auto bg-white'>
			<section className='rounded-lg flex justify-center items-center gap-12'>
				<div className='p-6 rounded-xl'>
					<p className='text-gray-500 font-medium'>Valor Total:</p>
					<p className='font-medium text-3xl'>R$43.324,50</p>
				</div>

				<div>
					<div className='flex items-center gap'>
						<p className='font-medium text-gray-500'>Valor entrada</p>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='green'>
							<polygon points='12,4 4,20 20,20'></polygon>
						</svg>
					</div>
					<p className='font-medium text-3xl'>R$3.324,50</p>
				</div>
				<div>
					<div className='flex items-center gap'>
						<p className='font-medium text-gray-500'>Valor saida</p>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='14'
							height='14'
							viewBox='0 0 24 24'
							fill='red'>
							<polygon points='12,20 4,4 20,4'></polygon>
						</svg>
					</div>
					<p className='font-medium text-3xl'>R$324,50</p>
				</div>
			</section>

			<header className='bg-white flex justify-between p-4 px-4 items-center'>
				<div>
					<h1 className='font-bold text-3xl'>Transações</h1>
					<p className='text-zinc-400'>Ultima transacao registrada : 24/05</p>
				</div>
				<div className='flex gap-4 items-center'>
					<form className='max-w-md mx-auto'>
						<label
							htmlFor='default-search'
							className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
							Search
						</label>
						<div className='relative'>
							<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
								<svg
									className='w-4 h-4 text-gray-500 dark:text-gray-400'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 20 20'>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
									/>
								</svg>
							</div>
							<input
								type='search'
								id='default-search'
								className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Buscar...'
								required
							/>
						</div>
					</form>

					{openTransactionModal && (
						<AddModal setOpenTransactionModal={setOpenTransactionModal} />
					)}
					<button
						type='submit'
						onClick={() => setOpenTransactionModal((curr) => !curr)}
						className='bg-blue-500 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
						Adicionar Transação
					</button>
				</div>
			</header>
			<section className='relative max-h-[550px] overflow-auto bg-white p-4 rounded-lg mt-4'>
				<table className='w-full text-sm text-left shadow-md rtl:text-right text-gray-500 dark:text-gray-400 border-collapse'>
					<thead className='sticky -top-4 bg-white p-2 dark:bg-gray-700 text-gray-700 dark:text-gray-400 uppercase text-xs z-[1]'>
						<tr className='text-center border-b border-gray-300'>
							<th scope='col' className='px-6 py-3'>
								Data da movimentação
							</th>

							<th scope='col' className='px-6 py-3'>
								Tipo
							</th>
							<th scope='col' className='px-6 py-3'>
								Preço
							</th>
							<th scope='col' className='px-6 py-3'>
								Descrição
							</th>
							<th scope='col' className='px-6 py-3'>
								Comprovante
							</th>
							<th scope='col' className='px-6 py-3'>
								Trismetre
							</th>
							<th scope='col' className='px-6 py-3'>
								Categoria
							</th>
							<th scope='col' className='px-6 py-3'></th>
						</tr>
					</thead>
					<tbody id='transactionTableBody' className='text-gray-800'>
						{transactions &&
							transactions?.map((item, index) => (
								<tr
									key={index}
									className='bg-white border-b border-gray-300 text-center dark:bg-gray-800 dark:border-gray-700 group'>
									<td className='px-6 py-4'>{item.date}</td>

									<td className='px-6 py-4'>
										<span
											className={`${
												item.type === 'entrada'
													? 'text-green-600'
													: 'text-red-600'
											} font-semibold p-1 rounded-full px-4 inline-flex items-center gap-2`}>
											{item.type === 'entrada' ? '+ Entrada' : '- Saída'}
										</span>
									</td>
									<td className='px-6 py-4'>{item.price}</td>
									<td className='px-6 py-4'>{item.description}</td>
									<td className='px-6 py-4 text-center'>
										<button
											className='text-blue-500 underline'
											onClick={() => handleMultipleDownloads(item.file)}>
											Baixar
										</button>
									</td>
									<td className='px-6 py-4'>
										<span className='text-purple-600 font-semibold p-1 rounded-full px-4 bg-purple-500/20 inline-block'>
											{item.quarter}
										</span>
									</td>
									<td className='px-6 py-4'>
										<span className='text-purple-600 font-semibold p-1 rounded-full px-4 bg-purple-500/20 inline-block'>
											{item.category}
										</span>
									</td>
									<td className='px-6 py-4'>
										<button
											onClick={() => {
												setOpenTransactionEditModal((curr) => !curr);

												setSelectedTransaction(item);
											}}
											id='openEditModalButton'
											className='edit-btn p-2 rounded-lg border-gray-300 border invisible cursor-pointer h-full group-hover:visible'>
											<i className='fas fa-pencil-alt'>Editar</i>
										</button>
										<button
											onClick={() => {
												setOpenDeleteTransaction((curr) => !curr);
												setDeleteTransactionId(item.id);
											}}
											id='openEditModalButton'
											className='edit-btn p-2 rounded-lg border-gray-300 border invisible cursor-pointer h-full group-hover:visible'>
											<i className='fas fa-pencil-alt'>Deletar</i>
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				{openTransactionEditModal && (
					<EditModal
						setOpenTransactionModal={setOpenTransactionEditModal}
						selectedTransaction={selectedTransaction}
					/>
				)}
				{openDeleteTransaction && (
					<DeleteModal
						setOpenDeleteModal={setOpenDeleteTransaction}
						transactionId={deleteTransactionId}
					/>
				)}
			</section>
		</main>
	);
}
