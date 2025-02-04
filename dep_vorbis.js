// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function vorbis()
{
    Log.info("### Compile VORBIS");

    var GITHUB_URL = "https://github.com/xiph/vorbis.git";
    var VERSION = "v1.3.7";

    var DIR = INSTALL_LIB_DIR + "/vorbis";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        PLATFORM,
        "-Wno-undef"
    ];
    var INCLUDES = [
        "-I",INSTALL_LIB_DIR+"/libogg/include",
        "-I",DIR+"/lib",
        "-I",DIR+"/include"
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/lib", ".c", true, false);

    // Remove Psychoacoustics
    SOURCES = removeItemContainingString(SOURCES,"psytune");
    SOURCES = removeItemContainingString(SOURCES,"barkmel");
    SOURCES = removeItemContainingString(SOURCES,"tone");

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "vorbis");
}
