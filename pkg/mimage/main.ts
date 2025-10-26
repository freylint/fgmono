import { execSync } from 'child_process';

/**
 * Podman Manager
 */
class PodmanMgr {

    /**
     * Reset the default podman machine to rootful
     */
    public static resetToRootfulMachine(): void {
        // Reset podman to rootful state
        PodmanMgr.stopMachine();
        PodmanMgr.setRootfulMachine();
        PodmanMgr.startMachine();
    }

    /**
     * Start the default podman machine
     */
    public static startMachine(): void {
        try {
            execSync("podman machine start", { stdio: ['ignore', 'inherit', 'inherit'] });
        } catch (err) {
            console.error("startMachine error:", err);
        }
    }

    /**
     * Stop the default podman machine
     */
    public static stopMachine(): void {
        try {
            execSync("podman machine stop", { stdio: ['ignore', 'inherit', 'inherit'] });
        } catch (err) {
            console.error("stopMachine error:", err);
        }
    }

    /**
     * Make the default podman machine rootful
     */
    public static setRootfulMachine(): void {
        try {
            execSync("podman machine set --rootful", { stdio: ['ignore', 'inherit', 'inherit'] });
        } catch (err) {
            console.error("setRootfulMachine error:", err);
        }
    }

    /**
     * Build a podman bootc image from a containerfile
     * 
     * @param path Path to containerfile to build.
     * @param tag Tag to give image
     */
    public static buildImage(path: string, tag: string): void {
        const cmd = `podman build --tag ${tag} -f ${path} .`;
        try {
            execSync(cmd, { stdio: ['ignore', 'inherit', 'inherit'] });
        } catch (err) {
            console.error("buildImage error:", err);
        }
    }

    /**
     * Switch the podman bootc image with the given tag
     * 
     * @param tag Tag of image to switch to
     */
    public static switchImage(tag: string): void {
        const cmd = `bootc switch --transport containers-storage ${tag}`;
        try {
            execSync(cmd, { stdio: ['ignore', 'inherit', 'inherit'] });
        } catch (err) {
            console.error("switchImg error:", err);
        }
    }

}

function cli(): boolean {
    const args = process.argv.slice(2);

    if (args.includes('--help') || args.includes('-h')) {
        console.log('Usage: ts-node main.ts [--switch]');
        console.log('  --switch    Reset the default podman machine to rootful before building');
        return false;
    }

    return args.includes('--switch');
}


function main(): void {
    const doSwitch = cli();
    const uuid = crypto.randomUUID();

    console.log('Switching podman machine to rootful...');
    PodmanMgr.resetToRootfulMachine();

    // Build GDW image
    console.log('Building machine image...');
    PodmanMgr.buildImage("desktop.containerfile", `fgbootimg-gdw:${uuid}`);

    // Switch to new image
    if (doSwitch) {
        console.log("Switching to new image...")
        PodmanMgr.switchImage(`localhost/fgbootimg-gdw:${uuid}`);
    }
}

main();