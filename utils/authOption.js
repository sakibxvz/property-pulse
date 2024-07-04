import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	callbacks: {
		// Invoke on sucessfull sign-in
		async signIn({ profile }) {
			// 1.Connect to the database
			// 2.Check if uder exists
			// 3.If not, then add user to database
			// 4. retun true to allow sign-in
		},
		//Modifies the seesion Object
		async session({ session }) {
			// 1. Get user from database
			// 2. Assign the user id to the session
			// 3. return session
		},
	},
};
