import {exec} from "child_process";


// Start webpage development server
exec("npm run --workspace=webpage dev", (error, stdout, stderr) => {
    if (stdout)
    if (error) {
        console.error(`Error executing dev script: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

process.on('exit', (code) => {
    console.log(`Dev script exited with code: ${code}`);
});