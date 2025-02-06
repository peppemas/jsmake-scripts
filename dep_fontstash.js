function fontstash() {

    Log.info("### Compile FONTSTASH (header only)");

    var GITHUB_URL = "https://github.com/memononen/fontstash.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/fontstash";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var SOURCES = [];
    var DPARAMS = [];
    var INCLUDES = [
        DIR + "/src"
    ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}