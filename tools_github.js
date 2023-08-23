/***************************************************
 *
 * GITHUB TOOLS for jsmake
 *
 * Copyright (C) 2020-2022 Victrix Games
 *
 ***************************************************/

var __jsmake__use_submodules = false;

function GitCloneIfNotExists(url, version, destPath) {

    if (!Directory.exists(destPath)) {
        var res;
        if (__jsmake__use_submodules) {
            res = GitAddSubmodule(url, version, destPath);
        } else {
            res = GitClone(url, version, destPath);
        }
        if (res < 0) {
            Log.error("Cannot clone the library "+url);
            System.exit(1);
        }
    }

}

function GitAddSubmodule(url, version, destPath) {
    Log.info("Adding submodule " + url + "...");

    var tmp;
    var res;

    if (version.startsWith("rev:")) {
        var revision = version.substring(4);
        tmp = arrayToStringD(["git", "submodule", "add", "--force", "--name", destPath, "--branch", revision, url, destPath]);
        res = Processor.run(tmp);
    } else if (version === "master") {
        tmp = arrayToStringD(["git", "submodule", "add", "--force", "--name", destPath, url, destPath]);
        res = Processor.run(tmp);
    } else {
        tmp = arrayToStringD(["git", "submodule", "add", "--force", "--name", destPath, "--branch", version, url, destPath]);
        res = Processor.run(tmp);
    }

    return res;
}

function GitClone(url, version, destPath) {

    Log.info("Cloning " + url + "...");

    var tmp;
    var res;

    if (version.startsWith("rev:")) {
        var revision = version.substring(4);
        tmp = arrayToStringD(["git", "clone", "--recursive", url, destPath]);
        res = Processor.run(tmp);
    } else if (version === "master") {
        tmp = arrayToStringD(["git", "clone", "--recursive", url, destPath]);
        res = Processor.run(tmp);
    } else {
        tmp = arrayToStringD(["git", "clone", "--recursive", "--single-branch", "--branch", version, url, destPath]);
        res = Processor.run(tmp);
    }

    return res;
}

function GitUseSubmodules(value) {
    __jsmake__use_submodules = value;
}

