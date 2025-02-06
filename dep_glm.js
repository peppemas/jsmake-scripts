function glm()
{
    Log.info("### Compile GLM");

    var GITHUB_URL = "https://github.com/g-truc/glm.git";
    var VERSION = "0.9.9.8";

    var DIR = INSTALL_LIB_DIR + "/glm";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        PLATFORM,
        "GLM_FORCE_INTRINSICS",            // enable SIMD optimizations
        "GLM_FORCE_INLINE",                // inline code where possible
        "GLM_FORCE_EXPLICIT_CTOR",         // no implicit conversions
        "GLM_FORCE_SIZE_T_LENGTH"          // length() returns size_t instead of int
    ];
    var INCLUDES = [
        DIR,
    ];
    var SOURCES = [];

    AMALGAMATED_INCLUDES.push(INCLUDES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "glm");
}
