const exec = require('child_process').execSync;
const read = require('fs').readFileSync;
const write = require('fs').writeFileSync;

/* Placeholder data */
const game = {
	name: 'Testname',
	author: 'Testman',
	description: 'A game for testing the add-game.js script',
	url: 'https://github.com/iglosiggio/Kokoban',
	img: null
}

const index = read('index.md', 'utf8').replace("<!-- Insert games here -->",
`### [${game.name}](${game.url}) by ${game.author}
${game.description}

<!-- Insert games here -->
`);
write('index.md', index);

exec('git add index.md');
exec(`git commit -m "updated index, added ${game.name} by ${game.author}"`);
exec('git push', { env: { GIT_SSH_COMMAND: 'ssh -i ./key.gamedev-dcuba.github.io -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no' } });
