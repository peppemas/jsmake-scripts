function minimp3() {
    Log.info("### Compile MINIMP3 (header only)");

    var GITHUB_URL = "https://github.com/lieff/minimp3.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/minimp3";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        DIR
    ];
    var SOURCES = [];

    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}