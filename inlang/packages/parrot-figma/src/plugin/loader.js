const loadPlugin = async () => {
	const result = await fetch("[[PLUGIN_CODE_BASE_URL]]" + "plugin.js", {
		cache: "no-cache",
	});
	const plugin_code = await result.text();

	// inject the url into the code
	eval('const url = "[[PLUGIN_CODE_BASE_URL]]" + "ui/index.html"; \n' + plugin_code);
};
loadPlugin();
