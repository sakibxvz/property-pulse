import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import { fetchProperties } from '@/utils/requests';

const PropertiesPage = async () => {
	const properties = await fetchProperties();

	//Sort Properties by date
	properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	return (
		<>
			<section className='bg-blue-700 py-4'>
				<div className='max-w-7xl mx-auto px-4 flex flex-col items-start mb-3.5 sm:px-8 lg:px-8'>
					<PropertySearchForm />
				</div>
			</section>

			<section className='px-4 py-6'>
				<div className='container-xl lg:container m-auto px-4 py-6'>
					{properties.length === 0 ? (
						<p>No Properties found</p>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{properties.map((property) => (
								<PropertyCard key={property._id} property={property} />
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default PropertiesPage;
