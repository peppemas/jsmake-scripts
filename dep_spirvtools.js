// [] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function spirvtools()
{
    Log.warn("### Compile SPIRV-Tools");

    var GITHUB_URL = "https://github.com/KhronosGroup/SPIRV-Tools.git";
    var VERSION = "v2024.2";

    var DIR = INSTALL_LIB_DIR + "/spirv-tools";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS =
        [
            PLATFORM
        ];

    // common for all platforms
    var SOURCES = Directory.collectFilesWithExt(DIR+"/source", ".cpp", true, false);

    var INCLUDES = [
        "-I",DIR+"/src/include"
    ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);

    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "spirvtools");
}