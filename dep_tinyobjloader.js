// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function tinyobjloader()
{
    Log.info("### Compile TINYOBJLOADER");

    var GITHUB_URL = "https://github.com/tinyobjloader/tinyobjloader.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/tinyobjloader";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "PLATFORM_STANDARD"
    ];
    var INCLUDES = [
        "-I", DIR
    ];
    var SOURCES = [ DIR + "/tiny_obj_loader.cc" ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "tinyobj");
}
