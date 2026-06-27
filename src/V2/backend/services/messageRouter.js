import modifyAction from "./actions/modify.js";

export async function handleWebviewMessage({ message, panel, toPath, toConfigPath, inTargetPath }) {
    switch (message.action) {
        case "modify":
            await modifyAction({
                panel,
                tableName: message.tableName,
                toPath,
                toConfigPath,
                inTargetPath
            });
            break;
    }
}
