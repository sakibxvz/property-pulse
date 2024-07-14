'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PropertContactForm = ({ property }) => {
	const { data: session } = useSession();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');
	const [wasSubmitted, setWasSubmitted] = useState(false);
	const [errors, setErrors] = useState({});

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const validatePhone = (phone) => {
		const phonePattern = /^\d{11}$/;
		return phonePattern.test(phone);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = {};

		if (!validateEmail(email)) {
			newErrors.email = 'Please enter a valid email address.';
		}
		if (!validatePhone(phone)) {
			newErrors.phone = 'Please enter a valid 11-digit phone number.';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			setErrors({});
			// Submit the form data

			const data = {
				name,
				email,
				phone,
				message,
				recipient: property.owner,
				property: property._id,
			};

			try {
				const res = await fetch(`/api/messages`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				const resData = await res.json();
				if (res.status === 200) {
					toast.success('Message sent successfully');
					setWasSubmitted(true);
					console.log(data);
				} else if (res.status === 400 || res.status === 401) {
					toast.error(resData.message || 'Error in sending form');
				} else {
					toast.error('Error in sending form');
				}
			} catch (error) {
				console.log(error);
				toast.error('Error in sending form');
			} finally {
				// Reset form fields if needed
				setName('');
				setEmail('');
				setPhone('');
				setMessage('');
			}
		}
	};

	return (
		<div className='bg-white p-6 rounded-lg shadow-md'>
			<h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
			{!session ? (
				<p className='font-semibold text-red-500'>
					You must be logged in to send message
				</p>
			) : wasSubmitted ? (
				<p className='text-green-500 mb-4'>
					Your message has been sent successfully
				</p>
			) : (
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='name'
						>
							Name:
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='name'
							type='text'
							placeholder='Enter your name'
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='email'
						>
							Email:
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='email'
							type='email'
							placeholder='Enter your email'
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{errors.email && (
							<p className='text-red-500 text-xs mt-2'>{errors.email}</p>
						)}
					</div>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='phone'
						>
							Phone:
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='phone'
							type='text'
							placeholder='Enter your phone number'
							required
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
						{errors.phone && (
							<p className='text-red-500 text-xs mt-2'>{errors.phone}</p>
						)}
					</div>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='message'
						>
							Message:
						</label>
						<textarea
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
							id='message'
							placeholder='Enter your message'
							required
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						></textarea>
					</div>
					<div>
						<button
							className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
							type='submit'
						>
							<FaPaperPlane className='mr-2' /> Send Message
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default PropertContactForm;
