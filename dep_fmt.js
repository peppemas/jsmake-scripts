function fmt() {

    Log.info("### Compile FMT");

    var GITHUB_URL = "https://github.com/fmtlib/fmt.git";
    var VERSION = "7.1.3";

    var DIR = INSTALL_LIB_DIR + "/fmt";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        DIR + "/include"
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".cc", false, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "fmt");
}