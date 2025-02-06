function cereal() {
    Log.info("### Compile CEREAL (header only)");

    var GITHUB_URL = "https://github.com/USCiLab/cereal.git";
    var VERSION = "v1.3.0";

    var DIR = INSTALL_LIB_DIR + "/cereal";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        DIR + "/include"
    ];
    var SOURCES = [];

    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}