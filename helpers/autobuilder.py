import os, subprocess, sys, signal, time 

class AutoBuildAngular:
    BUILD_PATHS_TO_IGNORE = ['helpers', 'static', 'templates', 'venv']
    PROCESS_INFO_FILE = "_build_pid.txt"

    @staticmethod
    def __getCurrentWorkingDirectory():
        return os.getcwd()

    @staticmethod
    def __getFlaskStaticPath():
        return os.path.join(AutoBuildAngular.__getCurrentWorkingDirectory(), 'static')

    @staticmethod
    def __getFlaskTemplatePath():
        return os.path.join(AutoBuildAngular.__getCurrentWorkingDirectory(), 'templates')

    @staticmethod
    def __getAngularProjectPath():
        return AutoBuildAngular.__findAngularProjectPath()

    @staticmethod
    def __findAngularProjectPath():
        angularProjectPath = None
        # Get the list of all files and directories of currrent directory
        resources = os.listdir(AutoBuildAngular.__getCurrentWorkingDirectory())

        # Ignore the resource if it is a file (identified by the presence of ".")
        # Resource is also ignored if it is part of the ignorable build paths
        for resource in resources:
            if "." not in resource and resource not in AutoBuildAngular.BUILD_PATHS_TO_IGNORE:
                angularProjectPath = os.path.join(AutoBuildAngular.__getCurrentWorkingDirectory(), resource)
                break
        return angularProjectPath

    @staticmethod
    def __getAngularDistPath():
        projectPath = AutoBuildAngular.__getAngularProjectPath()
        return os.path.join(projectPath, 'dist', projectPath.split('/')[-1])
    
    # save build process info to file
    @staticmethod
    def __saveProcessInfo(processId):
        if(not bool(processId)):
            print("Invalid process Id..")
            return
        
        # write the PID to a file
        with open(AutoBuildAngular.PROCESS_INFO_FILE, "w") as file:
            file.write(str(processId))

    @staticmethod
    def __setInterrup():
        print("Press Ctrl+C to terminate..")
        signal.signal(signal.SIGINT, AutoBuildAngular.signalHandler)

    @staticmethod
    def build(devMode=False):
        command = 'cd ' + AutoBuildAngular.__getAngularProjectPath() + ' && ng build --watch --base-href /static/ &'
        # start the process in the background
        process = subprocess.Popen(command, shell=True)
        AutoBuildAngular.__saveProcessInfo(process.pid)
        AutoBuildAngular.__setInterrup()
        if(devMode):
            while(True):
                AutoBuildAngular.copyAngularDistToFalsk()
                time.sleep(10.0)
        else:
            # For Non-DevMode wait for 15sec before copying as it might take some time to build project
            time.sleep(15.0)
            AutoBuildAngular.copyAngularDistToFalsk()
            # Now terminate the build job running in background
            AutoBuildAngular.terminateBuild()

    # Copy angular distribution app to static folders 
    @staticmethod
    def copyAngularDistToFalsk():
        angularDistPath = AutoBuildAngular.__getAngularDistPath()
        try:
            files = os.listdir(angularDistPath)
            static_files = ""
            html_files = ""
            for file in files:
                if '.js' in file or '.js.map' in file or '.ico' in file:
                    static_files += (file + ' ')
                if '.html' in file:
                    html_files += (file + ' ')
            if len(static_files) > 0:
                subprocess.call(('cd ' + angularDistPath + ' &&' + ' mv ' + static_files + AutoBuildAngular.__getFlaskStaticPath()), shell=True)
            if len(html_files) > 0:
                subprocess.call(('cd ' + angularDistPath + ' &&' + ' mv ' + html_files + AutoBuildAngular.__getFlaskTemplatePath()), shell=True)
        except Exception as e:
            print(e)

    @staticmethod
    def terminateBuild():
        # write the PID to a file
        with open(AutoBuildAngular.PROCESS_INFO_FILE, "r") as file:
            processId = file.read()
        if(bool(processId)):
            print(f"Killing build process {processId}")
            os.kill(int(processId), 9)

    @staticmethod
    def signalHandler(signal, frame):
        print("Received interrupt signal, exiting...")
        AutoBuildAngular.terminateBuild()
        sys.exit(0)
    
