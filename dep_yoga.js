function yoga() {
    Log.info("### Compile YOGA");

    var GITHUB_URL = "https://github.com/facebook/yoga.git";
    //var VERSION = "1.18.0";
    var VERSION = "v2.0.1";

    var DIR = INSTALL_LIB_DIR + "/yoga";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        DIR
    ];

    var SOURCES = Directory.collectFilesWithExt(DIR + "/yoga", ".cpp", true, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "yoga");
}