function lohmann_json() {
    Log.info("### Compile LOHMANN JSON (HEADER ONLY)");

    var GITHUB_URL = "https://github.com/nlohmann/json.git";
    var VERSION = "v3.11.3";

    var DIR = INSTALL_LIB_DIR + "/lohmannjson";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "-D",PLATFORM,
    ];
    var INCLUDES = [
        "-I",INSTALL_LIB_DIR + "/single_include",
    ];
    var SOURCES = [];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}