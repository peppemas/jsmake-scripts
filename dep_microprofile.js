function microprofile()
{
    Log.info("### Compile MICROPROFILE");

    var GITHUB_URL = "https://github.com/zeux/microprofile.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/microprofile";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [PLATFORM];
    var INCLUDES = arrayToString([
        "-I",DIR,
    ]);
    var SOURCES = [];

    AMALGAMATED_INCLUDES.push(INCLUDES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, INCLUDES, DPARAMS);
}
