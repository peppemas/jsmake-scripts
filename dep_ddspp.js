function ddspp() {
    Log.info("### Compile DDSPP (header only)");

    var GITHUB_URL = "https://github.com/redorav/ddspp.git";
    var VERSION = "1.11";

    var DIR = INSTALL_LIB_DIR + "/ddspp";

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