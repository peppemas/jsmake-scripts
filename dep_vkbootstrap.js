// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function vkbootstrap() {
    Log.warn("### Compile VKBOOTSTRAP");

    var GITHUB_URL = "https://github.com/charles-lunarg/vk-bootstrap.git";
    var VERSION = "v0.7";

    var DIR = INSTALL_LIB_DIR + "/vkbootstrap";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        PLATFORM_STANDARD
    ];
    var INCLUDES = [
        DIR + "/src"
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".cpp", true, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "vkbootstrap");
}