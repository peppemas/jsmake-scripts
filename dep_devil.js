// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
/*
    Developer's Image Library (DevIL) is a cross-platform image library
    utilizing a simple syntax to load, save, convert, manipulate, filter,
    and display a variety of images with ease.
    It is highly portable and has been ported to several platforms.
    License: LGPL-2.1 license
 */
function devil() {

    Log.info("### Compile DEVIL");

    var GITHUB_URL = "https://github.com/DentonW/DevIL.git";
    var VERSION = "v1.8.0";

    var DIR = INSTALL_LIB_DIR + "/devil";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        "-I", DIR + "DevIL/include"
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "Devil/src/-IL/src", ".cpp", false, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "devil");


}



