// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function vfspp()
{
    Log.info("### Compile VFSPP");

    var GITHUB_URL = "https://github.com/peppemas/vfspp.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/vfspp";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "-D", PLATFORM_STANDARD
    ];
    var INCLUDES = [
        "-I", DIR + "/include"
    ];
    var SOURCES = [];

    var SOURCES_CPP = Directory.collectFilesWithExt(DIR + "/src", ".cpp", true, false);
    var SOURCES_C = Directory.collectFilesWithExt(DIR + "/src", ".c", true, false);

    SOURCES = SOURCES.concat(SOURCES_CPP, SOURCES_C);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "vfspp");
}
