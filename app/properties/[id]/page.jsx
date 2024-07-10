'use client';
import { useEffect, useState } from 'react';
import { fetchProperty } from '@/utils/requests';
import { useParams } from 'next/navigation';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import Link from 'next/link';
import PropertyDetails from '@/components/PropertyDetails';
import { FaArrowLeft, FaShare } from 'react-icons/fa';
import Spinner from '@/components/Spinner';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';
import PropertContactForm from '@/components/PropertContactForm';

const PropertyPage = () => {
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPropertyData = async () => {
			if (!id) return;
			try {
				const property = await fetchProperty(id);
				setProperty(property);
			} catch (error) {
				console.error('Error fetching Property', error);
			} finally {
				setLoading(false);
			}
		};
		if (property === null) {
			fetchPropertyData();
		}
	}, [id, property]);

	if (!property && !loading) {
		return (
			<h1 className='text-xenter text-2xl font-bold mt-10'>
				Property Not Found
			</h1>
		);
	}
	return (
		<>
			{loading && <Spinner loading={loading} />}
			{!loading && property && (
				<>
					<PropertyHeaderImage image={property.images[0]} />
					<section>
						<div className='container m-auto py-6 px-6'>
							<Link
								href='/properties'
								className='text-blue-500 hover:text-blue-600 flex items-center'
							>
								<FaArrowLeft className='mr-2' /> Back to Properties
							</Link>
						</div>
					</section>

					<section className='bg-blue-50'>
						<div className='container m-auto py-10 px-6'>
							<div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
								{/* Property Details */}
								<PropertyDetails property={property} />

								{/* <!-- Sidebar --> */}
								<aside className='space-y-4'>
									<BookmarkButton property={property} />

									<ShareButtons property={property} />

									{/* <!-- Contact Form --> */}
									<PropertContactForm property={property} />
								</aside>
							</div>
						</div>
					</section>
					<PropertyImages images={property.images} />
				</>
			)}
		</>
	);
};
export default PropertyPage;
