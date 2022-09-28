/***************************************************
 *
 * GITHUB TOOLS for jsmake
 *
 * Copyright (C) 2020-2022 Victrix Games
 *
 ***************************************************/

function GitCloneIfNotExists(url, version, destPath) {

    if (!Directory.exists(destPath)) {
        var res = GitClone(url, version, destPath);
        if (res < 0) {
            Log.error("Cannot clone the library "+url);
            System.exit(1);
        }
    }

}

function GitClone(url, version, destPath) {

    Log.info("Cloning " + url + "...");

    var tmp;
    var res;

    if (version.startsWith("rev:")) {
        var revision = version.substring(4);
        tmp = arrayToStringD(["git", "clone", "--recursive", url, destPath]);
    } else if (version === "master") {
        tmp = arrayToStringD(["git", "clone", "--recursive", url, destPath]);
        res = Processor.run(tmp);
        return res;
    } else {
        tmp = arrayToStringD(["git", "clone", "--recursive", "--single-branch", "--branch", version, url, destPath]);
        res = Processor.run(tmp);
        return res;
    }

}

