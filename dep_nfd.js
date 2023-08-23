// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function nfd()
{
    Log.info("### Compile NFD");

    var GITHUB_URL = "https://github.com/mlabbe/nativefiledialog.git";
    var VERSION = "release_116";

    var DIR = INSTALL_LIB_DIR + "/nfd";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "-D", PLATFORM_STANDARD
    ];
    var INCLUDES = [
        "-I", DIR + "/src/include",
    ];
    var SOURCES = [
        DIR + "/src/nfd_common.c"
    ];
    if (TARGET_PLATFORM === T_TARGET_PLATFORM.WINDOWS) {
        SOURCES.push(DIR + "/src/nfd_win.cpp");
    } else if (TARGET_PLATFORM === TARGET_PLATFORM.LINUX) {
        SOURCES.push(DIR + "/src/nfd_gtk.c");
    } else if (TARGET_PLATFORM === TARGET_PLATFORM.OSX) {
        SOURCES.push(DIR + "/src/nfd_cocoa.m");
    }

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "nfd");
}
