'use client';
import { useEffect, useState } from 'react';
import { fetchProperty } from '@/utils/requests';
import { useParams } from 'next/navigation';

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
			fetchPropertyData()
		}
	}, [id, property]);
	return <div>PropertyPage</div>;
};
export default PropertyPage;
