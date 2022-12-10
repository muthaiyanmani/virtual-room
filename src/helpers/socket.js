import { createServer } from 'http';
import { Server } from 'socket.io';

export default function initSocket(app) {
	const httpServer = createServer(app);
	const io = new Server(httpServer, {
		cors: {
			origin: 'http://localhost:3000',
			methods: ['GET', 'POST']
		}
	});
	io.on('connection', socket => {
		console.log('A user connected', socket.id);
		socket.on('ping', cb => {
			console.log('ping');
			cb();
		});

		//Whenever someone disconnects this piece of code executed
		socket.on('disconnect', function () {
			console.log('A user disconnected');
		});
	});

	httpServer.listen(6000, () => {
		console.log('listening on *:6000');
	});
}
