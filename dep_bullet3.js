// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function bullet3() {

    Log.info("### Compile Bullet3");

    var GITHUB_URL = "https://github.com/bulletphysics/bullet3.git";
    var VERSION = "3.25";

    var DIR = INSTALL_LIB_DIR + "/bullet3";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        "-I", DIR + "/src"
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".cpp", true, false);
    removeItemContainingString(SOURCES, "Bullet3OpenCL");

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "bullet3");
}