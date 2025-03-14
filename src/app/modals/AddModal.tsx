import React, { useState } from 'react';
import UploadForm from './UploadForm';
import { useTransactionsApi } from '../api/useTransactionsApi';
import { TransactionSendedInterface } from '../types/TransactionInterface';

const AddModal = ({
	setOpenTransactionModal,
}: {
	setOpenTransactionModal: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
	const [formData, setFormData] = useState<TransactionSendedInterface>({
		price: '',
		type: '',
		date: '',
		category: '',
		description: '',
		file: [{ fileName: '', filePath: '' }],
	});

	const [selectedType, setSelectedType] = useState('entrada');
	const categoriasEntrada = [
		'Saldo repassado',
		'Aporte do FIW',
		'Oferta recebida',
		'Outros',
	];

	const categoriasSaida = [
		'Ajuda de Custo',
		'Ajuda Social',
		'IPTU',
		'Condomínio',
		'Material de escritório',
		'Material de informática',
		'Gastos com cartório',
		'Manutenção do site',
		'Doação',
		'Almoço',
		'Estorno Excedente',
		'Inscrição Concílio',
		'Estacionamento',
		'Utensílios domésticos',
		'Obras',
		'Pedágio',
		'Combustível',
		'Lanche',
		'Pagamento Imposto/Taxa',
		'Tarifa bancária',
		'TED e DOC',
		'Pix',
		'Empréstimo',
		'Pagamentos diversos',
		'Serviços diversos',
		'Outros',
		'Ajuda de custo secretário',
		'Ajuda de custo tesoureiro',
	];

	const { addTransaction } = useTransactionsApi();

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value, // Salva o valor normalmente
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		addTransaction({
			price: formData.price,
			type: formData.type,
			date: formData.date,
			category: formData.category,
			description: formData.description,
			file: formData.file,
		});

		setFormData({
			price: '',
			type: '',
			date: '',
			category: '',
			description: '',
			file: [{ fileName: '', filePath: '' }],
		});
	};

	return (
		<div
			id='modal'
			className=' absolute w-screen h-screen top-0  left-0  z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='absolute overflow-hidden z-100   pt-12   bg-white rounded-lg shadow dark:bg-gray-700'>
				<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
						Criar nova Transação
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

				<form className='p-4 md:p-5 max-w-screen ' onSubmit={handleSubmit}>
					<div className='grid gap-4 mb-4 lg:grid-cols-2 grid-cols-1'>
						<div className='col-span-2 sm:col-span-1'>
							<label
								htmlFor='price'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Valor
							</label>
							<input
								value={formData.price}
								type='number'
								name='price'
								id='price'
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
								value={formData.date}
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
								{selectedType == 'entrada'
									? categoriasEntrada.map((item) => {
											return (
												<option key={item} value={item}>
													{item}
												</option>
											);
									  })
									: categoriasSaida.map((item) => {
											return (
												<option key={item} value={item}>
													{item}
												</option>
											);
									  })}
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
									onClick={() => setSelectedType('entrada')}
									onChange={handleChange}
									value='entrada'
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
									onClick={() => setSelectedType('saida')}
									onChange={handleChange}
									value='saida'
									name='type'
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
								value={formData.description}
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
