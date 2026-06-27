import { modify } from 'kschema-fs-api-gen-put-actions';

// import { withHeader } from "json-crud-ui-table";
import { executeGenerationTask } from "../generatorService.js";

const startFunc = async ({ panel, tableName, toPath, toConfigPath, inTargetPath }) => {
    await executeGenerationTask({
        panel,
        actionLabel: "With Header",
        tableName,
        toPath,
        toConfigPath,
        inTargetPath,
        generateFunc: modify
    });
};

export default startFunc;
