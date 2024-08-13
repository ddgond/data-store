const fs = require('fs').promises;
const path = require('path');
const os = require('os');

class DataStore {
	constructor(appName, fileName, getDefault) {
		const dataDir = process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local', 'share');
		this.appDataDir = path.join(dataDir, appName);
		this.stateFile = path.join(this.appDataDir, fileName);
		if (typeof getDefault !== 'function') {
			this.getDefault = () => getDefault;
		} else {
			this.getDefault = getDefault;
		}
	}

	async ensureDataDir() {
		await fs.mkdir(this.appDataDir, { recursive: true });
	}

	async readState() {
		try {
			await this.ensureDataDir();
			const data = await fs.readFile(this.stateFile, 'utf8');
			return JSON.parse(data);
		} catch (error) {
			return this.getDefault();
		}
	}

	async writeState(state) {
		await this.ensureDataDir();
		await fs.writeFile(this.stateFile, JSON.stringify(state), 'utf8');
	}
}

module.exports = DataStore;
