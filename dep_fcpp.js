// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function fcpp() {

    Log.info("### Compile FCPP (bgfx 3rdparty)");

    if (!dependencyExists(bgfx)) {
        Log.error("FCPP depends on bgfx");
        return 0;
    }

    var DIR = INSTALL_LIB_DIR + "/bgfx/3rdparty/fcpp";

    var DPARAMS = [PLATFORM_STANDARD];
    var INCLUDES = [
        DIR
    ];

    var SOURCES = Directory.collectFilesWithExt(DIR, ".c", false, false);
    removeItemContainingString(SOURCES, "usecpp.c"); // remove the example test

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "fcpp");
}
