function toml() {
    Log.info("### Compile TOML++ (Header Only)");

    var GITHUB_URL = "https://github.com/ToruNiina/toml11.git";
    var VERSION = "v3.7.1";

    var DIR = INSTALL_LIB_DIR + "/toml";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        PLATFORM,
    ];
    var INCLUDES = [
        INSTALL_LIB_DIR,
    ];
    var SOURCES = [];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}