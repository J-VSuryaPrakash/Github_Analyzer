function languageStatsHelper(languagesData) {
	const ignore = new Set([
	  "Jupyter Notebook",
	  "Dockerfile",
	  "Makefile",
	  "Batchfile",
	  "Procfile",
	  "Shell",
	  "PowerShell",
	  "SCSS",
	  "Mako",
	  "Go Template",
	  "Starlark",
	  "ANTLR",
	  "jq",
	  "Nix",
	]);

	const filteredLanguages = Object.fromEntries(
	  Object.entries(languagesData).filter(([language]) => !ignore.has(language)),
	);

	const total = Object.values(filteredLanguages).reduce((sum, count) => sum + count, 0);

	if (!total) {
		console.log("No language data available");
		return;
	}

	const topLanguages = Object.entries(filteredLanguages)
		.map(([language, count]) => ({
			language,
			percentage: Math.ceil(((count / total) * 100) * 10) / 10,
		}))
		.sort((first, second) => second.count - first.count)
		.slice(0, 5);

	return topLanguages;
}

export default languageStatsHelper;