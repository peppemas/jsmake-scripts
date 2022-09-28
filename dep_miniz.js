// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function miniz() {

    Log.info("### Compile MINIZ");

    var GITHUB_URL = "https://github.com/richgel999/miniz.git";
    var VERSION = "2.2.0";

    var DIR = INSTALL_LIB_DIR + "/miniz";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        "-I", DIR
    ];
    var SOURCES = Directory.collectFilesWithExt(DIR, ".c", false, false);

    var miniz_export_h = '\
    #ifndef MINIZ_EXPORT\n \
    #define MINIZ_EXPORT\n \
    #endif\n';

    Directory.writeTextFile(DIR + "/miniz_export.h", miniz_export_h);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "miniz");
}