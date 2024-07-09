export { default } from 'next-auth/middleware';
export const config = {
	matcher: [
		'/properties/add',
		'/profile',
		'/properties/saved',
		'/messages',
		'/properties/:path*/edit',
	],
};
// http://localhost:3000/properties/668bb1a64f1d341992e901f3/edit