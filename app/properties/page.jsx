import Properties from '@/components/Properties';
import PropertySearchForm from '@/components/PropertySearchForm';
import { fetchProperties } from '@/utils/requests';

const PropertiesPage = async () => {
	const properties = await fetchProperties();

	//Sort Properties by date
	properties.properties.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

	return (
		<>
			<section className='bg-blue-700 py-4'>
				<div className='max-w-7xl mx-auto px-4 flex flex-col items-start mb-3.5 sm:px-8 lg:px-8'>
					<PropertySearchForm />
				</div>
			</section>

			<Properties />
		</>
	);
};

export default PropertiesPage;
