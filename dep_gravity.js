// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function gravity()
{
    Log.warn("### Compile Gravity");

    var GITHUB_URL = "https://github.com/marcobambini/gravity.git";
    var VERSION = "0.8.5";

    var DIR = INSTALL_LIB_DIR + "/gravity";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS =
        [
            "-D",PLATFORM,
            "-D","NDEBUG",
            "-D","USING_GENERATED_CONFIG_H",
            "-D","_MBCS",
            "-D","ENABLE_OPENGL"
        ];

    // common for all platforms
    var SOURCES = Directory.collectFilesWithExt(DIR+"/src",".c",false,false);

    var INCLUDES = arrayToString([
        "-I",DIR+"/src",
    ]);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);

    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, INCLUDES, arrayToString(DPARAMS));
}
