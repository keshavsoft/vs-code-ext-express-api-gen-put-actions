import * as vscode from 'vscode';
import path from 'path';

import { getHtmlWithScripts } from "./utils/htmlLoader.js";
import { handleWebviewMessage } from "./services/messageRouter.js";

const activateHtml = (context, uri) => {
    const panel = vscode.window.createWebviewPanel(
        "showHtml",
        "Show Html",
        vscode.ViewColumn.One,
        { enableScripts: true }
    );

    panel.webview.html = getHtmlWithScripts();

    panel.webview.onDidReceiveMessage(async (message) => {
        const userRootFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        const folderPath = path.dirname(uri.fsPath);
        const text = await vscode.workspace.fs.readFile(uri);

        const fileText = Buffer
            .from(text)
            .toString("utf8");
        const match = fileText.match(
            /const\s+tableName\s*=\s*["'`](.*?)["'`]/
        );

        const tableName = match?.[1];
        const toConfigPath = userRootFolder ? path.join(userRootFolder, "Config", "Schemas", `${tableName}.json`) : undefined;

        await handleWebviewMessage({
            message,
            panel,
            toPath: folderPath,
            toConfigPath,
            inTargetPath: userRootFolder
        });
    });
};

export default activateHtml;
