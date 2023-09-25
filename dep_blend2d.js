// *** REQUIRE ASMJIT ***
function blend2d() {
    Log.info("### Compile BLEND2D");

    var GITHUB_URL = "https://github.com/blend2d/blend2d.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/blend2D";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = ["-D",PLATFORM];
    var INCLUDES = [
        "-I", DIR + "/src",
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".cpp", false, true);

    AMALGAMATED_INCLUDES.push(INCLUDES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "blend2d");
}