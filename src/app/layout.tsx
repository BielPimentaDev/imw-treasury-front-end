import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<header className='shadow-lg bg-white p-2 flex items-center justify-between px-4 max-w-[1700px] mx-auto'>
					<div className='flex items-center'>
						{/* <img src='/imw-logo.png' className='w-16' /> */}
						<h1 className='font-medium text-lg'>Metodista Wesleyana</h1>
					</div>
					<nav className='ml-12'>
						<ul className='flex gap-4 text-gray-500'>
							<li className='text-black font-medium'>Historico</li>
							<li>Relatorios</li>
							<li>Relatorios</li>
							<li>Relatorios</li>
						</ul>
					</nav>
					<div className='flex items-center gap-4'>
						{/* <img src='/profile.png' /> */}
					</div>
				</header>
				{children}
			</body>
		</html>
	);
}
