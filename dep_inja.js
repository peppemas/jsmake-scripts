// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function inja() {

    Log.info("### Compile INJA (header only)");

    var GITHUB_URL = "https://github.com/pantor/inja.git";
    var VERSION = "v3.4.0";

    var DIR = INSTALL_LIB_DIR + "/inja";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var SOURCES = [];
    var DPARAMS = [];
    var INCLUDES = [
        DIR + "/include/single-include"
    ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;

}
