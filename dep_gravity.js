// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function gravity()
{
    Log.warn("### Compile Gravity");

    var GITHUB_URL = "https://github.com/marcobambini/gravity.git";
    var VERSION = "0.8.5";

    var DIR = INSTALL_LIB_DIR + "/gravity";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS =
        [
            PLATFORM
        ];

    // common for all platforms
    var SOURCES = Directory.collectFilesWithExt(DIR+"/src", ".c", true, false);
    SOURCES = removeItemContainingString(SOURCES,"cli/gravity"); // remove the CLI exec

    var INCLUDES = [
        "-I",DIR+"/src",
        "-I",DIR+"/src/runtime",
        "-I",DIR+"/src/shared",
        "-I",DIR+"/src/utils",
        "-I",DIR+"/src/optionals",
        "-I",DIR+"/src/compiler",
    ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);

    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "gravity");
}
