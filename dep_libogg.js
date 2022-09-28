// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function libogg()
{
    Log.info("### Compile LIBOGG");

    var GITHUB_URL = "https://github.com/gcp/libogg.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/libogg";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "-D",PLATFORM
    ];
    var INCLUDES = [
        "-I",DIR+"/include"
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".c", true, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "libogg");
}
