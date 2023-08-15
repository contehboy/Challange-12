function display(text) {
	return Promise.resolve(
		setTimeout(() => {
			console.log(text);
		}, 3000)
	);
}

async function main() {
	console.log("Start of file");
	await display("Middle of file");
	console.log("End of file");
}

main();
