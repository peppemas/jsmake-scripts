function im3d() {
    Log.info("### Compile IM3D");

    var GITHUB_URL = "https://github.com/john-chapman/im3d.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/im3d";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = ["-D",PLATFORM];
    var INCLUDES = [
        "-I", DIR,
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR, ".cpp", false, false);

    AMALGAMATED_INCLUDES.push(INCLUDES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "im3d");
}