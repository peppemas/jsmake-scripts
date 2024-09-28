// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function ozz_animation()
{
    Log.warn("### Compile Ozz Animation");

    var GITHUB_URL = "https://github.com/guillaumeblanc/ozz-animation.git";
    var VERSION = "0.15.0";

    var DIR = INSTALL_LIB_DIR + "/ozz_animation";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS =
        [
            "-D",PLATFORM,
            "-D","OZZ_SIMD_SSE3"
        ];

    // common for all platforms
    var SOURCES = Directory.collectFilesWithExt(DIR+"/src", ".cc", true, false);
    SOURCES = removeItemContainingString(SOURCES,"animation/offline"); // remove the CLI exec

    var INCLUDES = [
        "-I",DIR+"/include",
        "-I",DIR+"/src",
    ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);

    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "gravity");
}
