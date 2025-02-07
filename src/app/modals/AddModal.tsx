import axios from 'axios';
import React, { useState } from 'react';
import UploadForm from './UploadForm';

const AddModal = ({
	setOpenTransactionModal,
}: {
	setOpenTransactionModal: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
	const [formData, setFormData] = useState({
		price: '',
		type: '',
		date: '',
		category: '',
		description: '',
		file: '',
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;

		// Verificar se o campo é um input do tipo file

		// Para outros tipos de input
		setFormData((prev) => ({
			...prev,
			[name]: value, // Salva o valor normalmente
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Evitar recarregar a página
		console.log(formData);
		// Verificar se o arquivo foi selecionado e converter para base64

		const body = JSON.stringify({
			price: formData.price,
			type: formData.type,
			date: formData.date,
			category: formData.category,
			description: formData.description,
			file: formData.file,
		});

		try {
			// Enviar os dados com o arquivo base64
			const response = await axios.post(
				'https://vx3g7pz02b.execute-api.sa-east-1.amazonaws.com/dev/transactions',
				body,
				{
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json',
					},
				}
			);
			console.log(response.data);
		} catch (error) {
			console.error('Erro ao enviar dados:', error);
		}

		setOpenTransactionModal(false);
	};

	return (
		<div
			id='modal'
			className='lg:fixed absolute  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='absolute max-w-screen top-0 overflow-hidden left-0 lg:relative h-screen w-screen pt-12 lg:pt-0 lg:h-auto bg-white rounded-lg shadow dark:bg-gray-700'>
				<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
						Criar nova Transação
					</h3>
					<button
						onClick={() => setOpenTransactionModal((curr) => !curr)}
						id='closeModalButton'
						className='absolute top-3 right-3 text-gray-400 hover:text-gray-600'>
						✕
					</button>
				</div>

				<form className='p-4 md:p-5 max-w-screen ' onSubmit={handleSubmit}>
					<div className='grid gap-4 mb-4 lg:grid-cols-2 grid-cols-1'>
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
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='R$29,99'
								required
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
								type='date'
								name='date'
								id='date'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								required
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
									name='transactionType'
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
									name='transactionType'
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
						className='lg:w-auto w-full text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
						Adicionar Transação
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddModal;
