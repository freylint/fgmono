import { exec } from 'child_process';

/**
 * Podman Manager
 */
class PodmanMgr {

    /**
     * Reset the default podman machine to rootful
     */
    public static resetToRootfulMacine(): void {
        // Reset podman to rootful state
        PodmanMgr.stopMachine();
        PodmanMgr.setRootfulMachine();
        PodmanMgr.startMachine();
    }

    /**
     * Start the default podman machine
     */
    public static startMachine(): void {
        exec("podman machine start");
    }

    /**
     * Stop the default podman machine
     */
    public static stopMachine(): void {
        exec("podman machine stop");
    }

    /**
     * Make the default podman machine rootful
     */
    public static setRootfulMachine(): void {
        exec("podman machine set --rootful");
    }

    public static buildImage(path: string): void {
        let cmd ="podman build -f " +  path + " ."; 
        console.log(cmd);
        exec(cmd);
    }

}


function main():void  {
    PodmanMgr.buildImage("desktop.containerfile");
}

main();