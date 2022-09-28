function tinygltf() {
    Log.info("### Compile TINYGLTF (Header Only)");

    var GITHUB_URL = "https://github.com/syoyo/tinygltf.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/tinygltf";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "-D",PLATFORM,
    ];
    var INCLUDES = [
        "-I",INSTALL_LIB_DIR,
    ];
    var SOURCES = [];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}