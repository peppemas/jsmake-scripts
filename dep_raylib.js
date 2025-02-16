// [X] Windows [X] Linux [X] OSX [] Android [] UWP [] WEB
function raylib() {
    Log.info("### Compile RAYLIB");

    var GITHUB_URL = "https://github.com/raysan5/raylib.git";
    var VERSION = "4.2.0";

    var DIR = INSTALL_LIB_DIR + "/raylib";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var CUSTOM_CFLAGS = "-fno-strict-aliasing -O3 -DNDEBUG -std=c99"
    var DPARAMS = [
        PLATFORM,
        "UNICODE",
        "WINVER=0x0501",
        "_CRT_SECURE_NO_WARNINGS",
        "PLATFORM_DESKTOP"
    ];
    var INCLUDES = [
        INSTALL_LIB_DIR + "/glfw/include",
        DIR + "/src",
        DIR + "/src/external"
    ];


    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".c", false, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC_Debug(SOURCES, CUSTOM_CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "raylib");
}