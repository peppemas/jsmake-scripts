function openfbx() {
    Log.info("### Compile OPENFBX");

    var GITHUB_URL = "https://github.com/nem0/OpenFBX.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/openfbx";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        PLATFORM,
    ];
    var INCLUDES = [
        "-I",INSTALL_LIB_DIR + "/src",
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".c", true, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}