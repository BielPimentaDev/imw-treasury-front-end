'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { TransactionInterface } from '../types/TransactionInterface';

interface UploadFormInterface {
	setFormData: (
		e: React.Dispatch<React.SetStateAction<TransactionInterface>>
	) => void;
}

interface FileObject {
	filePath: string;
	fileName: string;
}

const UploadForm = (props: UploadFormInterface) => {
	const { setFormData } = props;

	const [fileArray, setFileArray] = useState<FileObject[]>([]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		const files = Array.from(event.target.files);

		files.map((file) => {
			fetchSignedUrl(file);
		});
	};

	const fetchSignedUrl = async (file: File) => {
		const body = {
			file_type: file.type,
			file_name: file.name,
		};
		try {
			const response = await axios.post(
				'https://vx3g7pz02b.execute-api.sa-east-1.amazonaws.com/dev/sign-url',
				body
			);

			uploadFileForSignedUrl(
				file,
				response.data.presigned_url,
				response.data.file_path,
				file.name
			);
		} catch (error) {
			console.log('signed url error ', error);
		}
	};

	const uploadFileForSignedUrl = async (
		file: File,
		presignedUrl: string,
		filePath: string,
		fileName: string
	) => {
		try {
			await axios.put(presignedUrl, file, {
				headers: { 'Content-Type': file.type },
			});

			setFileArray((curr) => [
				...curr,
				{
					fileName: fileName,
					filePath: `https://imw-treasury.s3.sa-east-1.amazonaws.com/${filePath}`,
				},
			]);
			console.log(fileArray);

			setFormData((curr) => ({ ...curr, file: fileArray }));
		} catch (error) {
			console.log('upload to signed url error', error);
		}
	};

	return (
		<div>
			<div>
				{fileArray.length > 0 &&
					fileArray.map((file, index) => {
						return <p key={index}>{file.fileName}</p>;
					})}
			</div>
			{/* 
			<label htmlFor='file-input'>
				<button
					type='button'
					className='bg-blue-500 text-white p-2 rounded-lg'
					// Evita comportamento inesperado
				>
					Selecionar arquivos
				</button>
			</label> */}

			<input
				id='file-input'
				type='file'
				className=''
				onChange={handleFileChange}
				multiple
			/>
		</div>
	);
};

export default UploadForm;
