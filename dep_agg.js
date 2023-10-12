// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function agg() {
    Log.info("### Compile AGG (Anti Grain Geometry Library)");

    var GITHUB_URL = "https://github.com/ghaerr/agg-2.6.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/agg";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "-D", PLATFORM
    ];
    var INCLUDES = [
        "-I", DIR + "/agg-src/include",
    ];

    var SOURCES = [];
    var SOURCES_AGG = Directory.collectFilesWithExt(DIR + "/agg-src/src", ".cpp", true, false);
    var SOURCES_AGG_CTRL = Directory.collectFilesWithExt(DIR + "/agg-src/src/ctrl", ".cpp", false, false);
    SOURCES = SOURCES.concat(
        SOURCES_AGG,
        SOURCES_AGG_CTRL
    );

    AMALGAMATED_INCLUDES.push(SOURCES);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "agg");
}