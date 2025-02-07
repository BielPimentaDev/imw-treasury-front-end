import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TransactionInterface } from '../types/TransactionInterface';

type DeleteModalProps = {
	setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	transactionId: string;
};

const DeleteModal = ({
	setOpenDeleteModal,
	transactionId,
}: DeleteModalProps) => {
	const deleteTransaction = async (id: string) => {
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
			setOpenDeleteModal(false); // Fecha o modal ao concluir
		} catch (error) {
			console.error('Erro:', error);
		}
	};

	return (
		<div
			id='modal'
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
				<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
						Deletar transacao
					</h3>
					<button
						onClick={() => setOpenDeleteModal((curr) => !curr)}
						id='closeModalButton'
						className='absolute top-3 right-3 text-gray-400 hover:text-gray-600'>
						✕
					</button>
				</div>
				<div className='m-4'>
					<h2 className='font-bold text-lg'>
						Tem certeza que deseja deletar esta transacao ?
					</h2>
					<p className='text-gray-500 mb-12'>
						Essa ação nao pode ser desfeita posteriormente
					</p>
					<button
						onClick={() => deleteTransaction(transactionId)}
						className='text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
						Deletar
					</button>
					<button
						onClick={() => setOpenDeleteModal((curr) => !curr)}
						className=' inline-flex items-center  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
						Voltar
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
