function cairo() {
    Log.info("### Compile CAIRO");

    var GITHUB_URL = "https://github.com/behdad/cairo.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/cairo";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [PLATFORM];
    var INCLUDES = [
        "-I", DIR,
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".cpp", false, false);

    AMALGAMATED_INCLUDES.push(INCLUDES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "cairo");
}