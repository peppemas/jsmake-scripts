function theorafile()
{
    Log.info("### Compile THEORAFILE");

    var GITHUB_URL = "https://github.com/FNA-XNA/Theorafile.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/theorafile";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        PLATFORM
    ];
    var INCLUDES = [
        DIR,
        INSTALL_LIB_DIR+"/libogg/include",
        INSTALL_LIB_DIR+"/vorbis/include",
        INSTALL_LIB_DIR+"/theora/include"
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR, ".c", false, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "theorafile");
}
