'use client';

import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SavedPropertiesPage = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSavedProperties = async () => {
			try {
				const res = await fetch(`/api/bookmarks`);
				if (res.status === 200) {
					const data = await res.json();
					setProperties(data);
				} else {
					console.log(res.statusText);
					toast.error('Failed to fetch saved properties');
				}
			} catch (error) {
				console.log(error);
				toast.error('Failed to fetch saved properties');
			} finally {
				setLoading(false);
			}
		};
		fetchSavedProperties();
	}, []);

	return loading ? (
		<Spinner loading={loading} />
	) : (
		<section className='px-4 py-6'>
			<h1 className='text-4xl mb-4 text-center'>Saved Properties</h1>
			<div className='container-xl lg:container m-auto px-4 py-6'>
				{properties.length === 0 ? (
					<div className='text-center'>
						<p className=' text-2xl'>No Saved Properties found</p>
						<p className=' text-2xl'>Go and browse some</p>
						<Link
							href={`/properties`}
							className='inline-block mt-5 bg-blue-500  text-white rounded-lg px-4 py-2 hover:opacity-80'
						>
							Browse Properties
						</Link>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{properties.map((property) => (
							<PropertyCard key={property._id} property={property} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};
export default SavedPropertiesPage;
