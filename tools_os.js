/***************************************************
 *
 * OS TOOLS for jsmake
 *
 * Copyright (C) 2020-2023 Victrix Games
 *
 ***************************************************/

function WindowsPath(path) {
    return path.replace(/\//g, "\\");
}

function LinuxPath(path) {
    return path.replace(/\\/g, "/");
}

function AddBrackets(path) {
    return "\"" + path + "\"";
}

function CopyDirectory(source, destination) {
    if (!Directory.exists(source)) {
        Log.error("Cannot copy directory " + source + " because it does not exist.");
        System.exit(1);
    }
    Log.info("Copying directory " + source + " to " + destination + "...");
    var tmp;
    if (Platform.isWindows()) {
        tmp = arrayToStringD(["xcopy", AddBrackets(WindowsPath(source)), AddBrackets(WindowsPath(destination)), "/E", "/I", "/Y"]);
    } else {
        tmp = arrayToStringD(["cp", "-r", source, destination]);
    }
    Log.info("current dir: " + Directory.getCurrent());
    Log.info("Running command: " + tmp);
    var res = Processor.run(tmp);
    if (res < 0) {
        Log.error("Cannot copy directory " + source + " to " + destination + ".");
        System.exit(1);
    }
}