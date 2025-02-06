function stb() {
    Log.info("### Compile STB");

    var GITHUB_URL = "https://github.com/nothings/stb.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/stb";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    //TODO: with cmake not working ... var DPARAMS = ["STBI_NO_STDIO"];
    var DPARAMS = [];
    var INCLUDES = [
        DIR
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR, ".c", false, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "stb");
}