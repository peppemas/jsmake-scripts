/***************************************************
 *
 * GCC TOOLS for jsmake
 *
 * Copyright (C) 2020-2022 Victrix Games
 *
 ***************************************************/

var CMT_FILE_CACHE = "";
var CMT_LOCAL_CACHE = "";

function dependencyExists(func) {
    return typeof func === "function";
}

function initCache()
{
    var tmp = Directory.collectFilesWithExt(Directory.getCurrent(), ".jscache", false, false);
    if (tmp.length > 0) {
        Log.info("use cache file: " + arrayToString(tmp));
        CMT_FILE_CACHE = Directory.readTextFile(tmp[0]);
    }
}

/**
 * Call an array of functions (ex. TARGETS)
 *
 * @param arr is the array of functions to call
 * @returns {number}
 */
function compile(arr)
{
    for (var i=0; i<arr.length; i++) {
        if (arr[i]() < 0) {
            Log.error("Compilation Stopped due to errors.");
            return -1;
        }
    }
    return 0;
}

function arrayToString(arr)
{
    var str = arr.join(' ').replace(/,/g," ");
    return str;
}

function arrayToStringD(arr)
{
    var res = arrayToString(arr);
    Log.bold(res);
    return res;
}

function removeItemContainingString(arr, search_term)
{
    for (var i=arr.length-1; i>=0; i--) {
        if (arr[i].includes(search_term)) {
            arr.splice(i, 1);
        }
    }

    return arr;
}

function compileLibrary(libname, sources, cflags, includes, dparams)
{
    var OBJ_FILES = [];
    for (var i=0; i<sources.length; i++) {
        var SOURCE = sources[i];
        var OUTPUT = TARGET_PATH_DIR + "/" + Path.getFilename(SOURCE).replace(".cpp",".o").replace(".c",".o").replace(".m",".o");
        OBJ_FILES.push(OUTPUT);
        var tmp = arrayToString([CXX, "-c", SOURCE, "-o", OUTPUT, cflags, includes, dparams]);
        var res = Processor.run(tmp);
        if (res < 0) return res;
    }

    var tmp = arrayToString([AR, "rcs", TARGET_PATH_DIR + "/" + libname, OBJ_FILES]);
    return Processor.run(tmp);
}

function compileLibraryGCC(libname, sources, cflags, includes, dparams)
{
    var OBJ_FILES = [];
    for (var i=0; i<sources.length; i++) {
        var SOURCE = sources[i];
        var OUTPUT = TARGET_PATH_DIR + "/" + Path.getFilename(SOURCE).replace(".cpp",".o").replace(".c",".o").replace(".m",".o");
        OBJ_FILES.push(OUTPUT);
        var tmp = arrayToStringD([CC, "-c", SOURCE, "-o", OUTPUT, cflags, includes, dparams]);
        var res = Processor.run(tmp);
        if (res < 0) return res;
    }

    var tmp = arrayToStringD([AR, "rcs", TARGET_PATH_DIR + "/" + libname, OBJ_FILES]);
    return Processor.run(tmp);
}

function compileGCC(SOURCES, CFLAGS, INCLUDES, DPARAMS, PREFIX_OUTPUT)
{
    for (var i=0; i<SOURCES.length; i++) {
        var SOURCE = SOURCES[i];
        var OUTPUT;
        if (PREFIX_OUTPUT !== undefined) {
            OUTPUT = TARGET_PATH_DIR + "/" + PREFIX_OUTPUT + "_" + Path.getFilename(SOURCE).replace(".cpp",".o").replace(".cc",".o").replace(".c",".o");
        } else {
            OUTPUT = TARGET_PATH_DIR + "/" + Path.getFilename(SOURCE).replace(".cpp",".o").replace(".cc",".o").replace(".c",".o");
        }
        var tmp = arrayToString([CC, "-c", SOURCE, "-o", OUTPUT, CFLAGS, INCLUDES, DPARAMS]);
        var res = Processor.run(tmp);
        if (res < 0) return res;
    }
    return 0;
}

function DLL2Library(dll_filename)
{
    // step 1
    // example: gendef fbxsdk.dll  (produce libfbxsdk.a)
    var tmp = arrayToString(["gendef", dll_filename]);
    var res = Processor.run(tmp);
    Log.info("Result from gendef :"+res);

    // step 2
    // example: dlltool --as-flags=--64 -m i386:x86-64 -k --output-lib libmylib.a --input-def libfbxsdk.def
    tmp = arrayToString(["dlltool","--as-flags=--64","i386:x86-64","-k","--output-lib",output,"--input-def",inputdef]);
    res = Processor.run(tmp);
    Log.info("Result from dlltool :"+res);
}

function debugArray(array)
{
    for (var i=0; i<array.length; i++) {
        Log.info(array[i]);
    }
}

function banner(str)
{
    Log.warn("*************************************************");
    Log.bold(str);
    Log.warn("*************************************************");
}
