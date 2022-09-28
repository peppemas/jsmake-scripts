function toml() {
    Log.info("### Compile TOML++ (Header Only)");

    var GITHUB_URL = "https://github.com/marzer/tomlplusplus.git";
    var VERSION = "v2.3.0";

    var DIR = INSTALL_LIB_DIR + "/toml";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "-D",PLATFORM,
    ];
    var INCLUDES = [
        "-I",INSTALL_LIB_DIR + "/include",
    ];
    var SOURCES = [];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}