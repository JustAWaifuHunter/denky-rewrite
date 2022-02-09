export default class ReadyEvent extends null {
	static run() {
		if (!global.IS_MAIN_PROCESS) return;
		console.log(`${client.user.tag} connected successfully!`);
	}
}
