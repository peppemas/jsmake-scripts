function skia()  {
    Log.info("### Compile SKIA");

    var GITHUB_URL = "https://github.com/google/skia.git";
    var VERSION = "canvaskit/0.34.0";

    var DIR = INSTALL_LIB_DIR + "/skia";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        PLATFORM,
    ];
    var INCLUDES = [
        "-I",INSTALL_LIB_DIR + "/include",
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".cpp", true, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}