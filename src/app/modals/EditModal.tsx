import React, { useEffect, useState } from 'react';
import { TransactionInterface } from '../types/TransactionInterface';
import UploadForm from './UploadForm';
import { useTransactionsApi } from '../api/useTransactionsApi';

type EditModalProps = {
	setOpenTransactionModal: React.Dispatch<React.SetStateAction<boolean | null>>;
	selectedTransaction: TransactionInterface;
};
export type oldTransactionType = {
	type: string;
	price: number;
};

const EditModal = ({
	setOpenTransactionModal,
	selectedTransaction,
}: EditModalProps) => {
	const { editTransaction } = useTransactionsApi();

	const [oldTransaction, setOldTransaction] = useState<oldTransactionType>({
		price: 0,
		type: '',
	});

	const [formData, setFormData] = useState({
		id: '',
		price: '',
		date: '',
		category: '',
		transactionType: '',
		description: '',
		quarter: 0,
		type: '',
		file: [{ fileName: '', filePath: '' }],
	});

	useEffect(() => {
		if (selectedTransaction) {
			setFormData({
				id: selectedTransaction.id || '',
				quarter: selectedTransaction.quarter || 0,
				type: selectedTransaction.type || '',
				price: selectedTransaction.price || '',
				date: selectedTransaction.date || '',
				category: selectedTransaction.category || '',
				description: selectedTransaction.description || '',
				file: selectedTransaction.file || [{ fileName: '', filePath: '' }],
			});
			setOldTransaction({ type: formData.type, price: Number(formData.price) });
		}
	}, [selectedTransaction]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value, files } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Evitar recarregar a página

		editTransaction(formData, oldTransaction);
		setOpenTransactionModal(false);
	};

	return (
		<div
			id='modal'
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className=' max-w-screen overflow-hidden left-0 lg:relative h-screen w-screen  bg-white rounded-lg shadow dark:bg-gray-700'>
				<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
						Editar transacao
					</h3>
					<button
						onClick={() => {
							setOpenTransactionModal((curr) => !curr);
						}}
						id='closeModalButton'
						className='absolute top-3 right-3 text-gray-400 hover:text-gray-600'>
						✕
					</button>
				</div>

				<form className='p-4 md:p-5' onSubmit={handleSubmit}>
					<div className='grid gap-4 mb-4 grid-cols-2'>
						<div className='col-span-2 sm:col-span-1'>
							<label
								htmlFor='price'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Valor
							</label>
							<input
								type='number'
								name='price'
								id='price'
								value={formData?.price}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='R$29,99'
								onChange={handleChange}
							/>
						</div>

						<div className='col-span-2 sm:col-span-1'>
							<label
								htmlFor='date'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Data
							</label>
							<input
								value={formData?.date}
								type='date'
								name='date'
								id='date'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								onChange={handleChange}
							/>
						</div>

						<div className='col-span-2 sm:col-span-1'>
							<label
								htmlFor='category'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Categoria
							</label>
							<select
								id='category'
								name='category'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								onChange={handleChange}>
								<option value='Departamento 1'>Departamento 1</option>
								<option value='Departamento 2'>Departamento 2</option>
								<option value='Departamento 3'>Departamento 3</option>
								<option value='Departamento 4'>Departamento 4</option>
								<option value='Departamento 5'>Departamento 5</option>
							</select>
						</div>
						<div className='col-span-1'>
							<label
								htmlFor='categoryType'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Tipo
							</label>
							<div className='flex items-center mb-1'>
								<input
									id='entrada'
									type='radio'
									onChange={handleChange}
									value='entrada'
									checked={formData.type == 'entrada'}
									name='type'
									className='w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label
									htmlFor='entrada'
									className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
									Entrada
								</label>
							</div>
							<div className='flex items-center mb-4'>
								<input
									id='saida'
									type='radio'
									onChange={handleChange}
									value='saida'
									name='type'
									checked={formData.type == 'saida'}
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
								/>
								<label
									htmlFor='saida'
									className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
									Saida
								</label>
							</div>
						</div>

						<div className='col-span-2'>
							<label
								htmlFor='description'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Descrição
							</label>
							<textarea
								value={formData?.description}
								id='description'
								name='description'
								rows={4}
								className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Escreva a descrição da transação aqui...'
								onChange={handleChange}></textarea>
						</div>
						<UploadForm setFormData={setFormData} />
					</div>

					<button
						type='submit'
						className='text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
						Editar Transação
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditModal;
