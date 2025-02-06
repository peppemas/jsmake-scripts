function delaunatorcpp() {
    Log.info("### Compile DELAUNATOR-CPP (header only)");

    var GITHUB_URL = "https://github.com/delfrrr/delaunator-cpp.git";
    var VERSION = "v0.4.0";

    var DIR = INSTALL_LIB_DIR + "/delaunatorcpp";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var INCLUDES = [
        DIR + "/include"
    ];

    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}

