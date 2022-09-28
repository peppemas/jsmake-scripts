function gainput() {

    Log.info("### Compile GAINPUT");

    var GITHUB_URL = "https://github.com/jkuhlmann/gainput.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/gainput";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        "-I", DIR + "/lib/include"
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/lib/source/", ".cpp", true, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "gainput");
}