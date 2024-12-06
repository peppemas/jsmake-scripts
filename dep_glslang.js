// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function glslang()
{
    Log.warn("### Compile Glslang");

    var GITHUB_URL = "https://github.com/KhronosGroup/glslang.git";
    var VERSION = "15.0.0";

    var DIR = INSTALL_LIB_DIR + "/glslang";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS =
        [
            "-D",PLATFORM
        ];

    // common for all platforms
    var SOURCES = Directory.collectFilesWithExt(DIR+"/glslang", ".cpp", true, false);

    // remove the following files based on the platform
    if (TARGET_PLATFORM === T_TARGET_PLATFORM.WINDOWS) {
        SOURCES = removeItemContainingString(SOURCES,"OSDependent/Linux");
        SOURCES = removeItemContainingString(SOURCES,"OSDependent/Web");
    }
    if (TARGET_PLATFORM === T_TARGET_PLATFORM.LINUX) {
        SOURCES = removeItemContainingString(SOURCES,"OSDependent/Windows");
        SOURCES = removeItemContainingString(SOURCES,"OSDependent/Web");
    }

    var INCLUDES = [
        "-I",DIR+"/glslang/include"
    ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);

    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "glslang");
}
