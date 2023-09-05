const { exec } = require("child_process");
const fs = require("fs");
const path = require('path');

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
    // [dad30017-c669-4666-830f-ed089b26c47d, cpp]
    const jobId = path.basename(filepath).split(".")[0];
    const exepath = path.join(outputPath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filepath} -o ${exepath} && cd ${outputPath} && ./${jobId}.out`,
            (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeCpp,
};