function tinygltf() {
    Log.info("### Compile TINYGLTF (Header Only)");

    var GITHUB_URL = "https://github.com/syoyo/tinygltf.git";
    var VERSION = "v2.8.14";

    var DIR = INSTALL_LIB_DIR + "/tinygltf";

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