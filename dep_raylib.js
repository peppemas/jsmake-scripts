function raylib() {
    Log.info("### Compile RAYLIB");

    var GITHUB_URL = "https://github.com/raysan5/raylib.git";
    var VERSION = "4.2.0";

    var DIR = INSTALL_LIB_DIR + "/raylib";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "-D",PLATFORM,
    ];
    var INCLUDES = [
        "-I",INSTALL_LIB_DIR + "/src",
    ];
    var SOURCES = [];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}