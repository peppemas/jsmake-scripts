// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function openxr() {
    Log.info("### Compile OPENXR");

    var GITHUB_URL = "https://github.com/KhronosGroup/OpenXR-SDK.git";
    var VERSION = " release-1.0.29";

    var DIR = INSTALL_LIB_DIR + "/openxr";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        PLATFORM,
        "XR_OS_WINDOWS"
    ];
    var INCLUDES = [
        DIR + "/include",
        DIR + "/src",
        DIR + "/src/common",
        DIR + "/src/external/jsoncpp/include"
    ];
    var SOURCES = [];

    /*
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".c", true, false);
    var SOURCES_CPP = Directory.collectFilesWithExt(DIR + "/src", ".cpp", true, false);
    SOURCES = SOURCES.concat(SOURCES_CPP);

    if (TARGET_PLATFORM === T_TARGET_PLATFORM.WINDOWS) {
        SOURCES = removeItemContainingString(SOURCES,"jnipp");
        SOURCES = removeItemContainingString(SOURCES,"android");
    }
    SOURCES = removeItemContainingString(SOURCES,"example");
     */

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}