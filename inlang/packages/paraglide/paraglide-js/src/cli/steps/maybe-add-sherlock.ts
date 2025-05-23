import type { Logger } from "../../services/logger/index.js";
import { prompt } from "../utils.js";
import type { CliStep } from "../utils.js";
import type { InlangProject } from "@inlang/sdk";
import * as Sherlock from "@inlang/recommend-sherlock";

export const maybeAddSherlock: CliStep<
	{
		fs: typeof import("node:fs/promises");
		logger: Logger;
		project: InlangProject;
	},
	unknown
> = async (ctx) => {
	const isCertainlyVsCode = process?.env?.TERM_PROGRAM === "vscode";

	let response = isCertainlyVsCode;
	if (!isCertainlyVsCode) {
		response = await prompt(`Are you using Visual Studio Code?`, {
			type: "confirm",
			initial: true,
		});
	}
	if (response === false) return ctx;

	const settings = await ctx.project.settings.get();

	// m function matcher is not installed
	if (
		settings.modules?.some((m) => m.includes("plugin-m-function-matcher")) ===
		false
	) {
		// add the m function matcher plugin
		settings.modules.push(
			"https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@latest/dist/index.js"
		);
		await ctx.project.settings.set(settings);
	}

	try {
		if (!(await Sherlock.isAdopted({ fs: ctx.fs }))) {
			await Sherlock.add({ fs: ctx.fs });
			ctx.logger.success(
				"Added the Sherlock VSCode extension to the workspace recommendations."
			);
		}
	} catch (error) {
		ctx.logger.error(
			[
				"Failed to add the Sherlock VSCode extension. Please open an issue",
				error,
			].join("\n")
		);
	}

	return ctx;
};
