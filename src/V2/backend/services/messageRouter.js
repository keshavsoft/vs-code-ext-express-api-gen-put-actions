import modifyAction from "./actions/modify.js";

export async function handleWebviewMessage({ message, panel, toPath, schemasPath, inTargetPath }) {
    switch (message.action) {
        case "modify":
            await modifyAction({
                panel,
                tableName: message.tableName,
                toPath,
                schemasPath,
                inTargetPath
            });
            break;
    }
}
