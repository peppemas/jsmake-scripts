// *** REQUIRE ASMJIT ***
function blend2d() {
    Log.info("### Compile BLEND2D");

    var GITHUB_URL = "https://github.com/blend2d/blend2d.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/blend2D";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        PLATFORM,
        "BL_STATIC",
        "BL_TARGET_OPT_SSE4_2",
        "BL_BUILD_OPT_SSE4_2",
        "BL_BUILD_NO_JIT"  // ASMJIT actually is disabled because it's not support ARM32/ARM64
    ];
    var INCLUDES = [
        DIR + "/src",
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".cpp", true, false);
    SOURCES = removeItemContainingString(SOURCES, "_test");

    AMALGAMATED_INCLUDES.push(INCLUDES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_SOURCES.push(SOURCES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "blend2d");
}