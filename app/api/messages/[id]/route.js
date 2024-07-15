import { default as connectDB } from '@/config/database';
import { default as Message } from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// PUT /api/messages
export const PUT = async (request, { params }) => {
	try {
		await connectDB();

		const { id } = params;
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return new Response('User ID is required', {
				status: 401,
			});
		}

		const { userId } = sessionUser;

		const message = await Message.findById(id);

		if (!message)
			return new Response('Message could not found', { status: 404 });

		//Verify ownership
		if (message.recipient.toString() !== userId) {
			Response('Unauthorize', { status: 401 });
		}

		//Update the message to read/unread depending on current status
		message.read = !message.read;
		await message.save();

		return new Response(JSON.stringify(message), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Message could not fetched', { status: 500 });
	}
};

// Delete /api/messages
export const DELETE = async (request, { params }) => {
	try {
		await connectDB();

		const { id } = params;
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return new Response('User ID is required', {
				status: 401,
			});
		}

		const { userId } = sessionUser;

		const message = await Message.findById(id);

		if (!message)
			return new Response('Message could not found', { status: 404 });

		//Verify ownership
		if (message.recipient.toString() !== userId) {
			Response('Unauthorize', { status: 401 });
		}

		//DELETE Messsage
		await message.deleteOne();

		return new Response('Message Deleted', { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Message could not deleted', { status: 500 });
	}
};
