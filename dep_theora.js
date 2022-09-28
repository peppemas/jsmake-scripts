// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function theora()
{
    Log.info("### Compile THEORA");

    var GITHUB_URL = "https://github.com/xiph/theora.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/theora";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "-D",PLATFORM
    ];
    var INCLUDES = [
        "-I",INSTALL_LIB_DIR+"/libogg/include",
        "-I",DIR+"/include"
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/lib", ".c", false, false);

    if (TARGET_PLATFORM === T_TARGET_PLATFORM.WINDOWS) {
        SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/lib/x86", ".c", false, false));
    }

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "theora");
}
