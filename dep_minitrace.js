function minitrace()
{
    Log.info("### Compile MINITRACE");

    var GITHUB_URL = "https://github.com/hrydgard/minitrace.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/minitrace";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = ["-D",PLATFORM];
    var INCLUDES = [
        "-I", DIR,
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR, ".c", true, false);

    if (TARGET_BUILD === T_TARGET_BUILD.DEBUG) {
        DPARAMS = DPARAMS.concat(["-D","MTR_ENABLED"]);
    }

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS));
}
