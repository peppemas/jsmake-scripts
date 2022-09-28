function soloud()
{
    Log.info("### Compile SOLOUD");
    var WITH_RAYLIB = true;

    var DIR = INSTALL_LIB_DIR + "/soloud-RELEASE_20200207";
    var INCLUDES = arrayToString(["-I",DIR+"/include"]);
    var SOURCES = [];
    var SOURCES_CORE = Directory.collectFilesWithExt(DIR + "/src/core", ".cpp", true, false);
    var SOURCES_FILTERS = Directory.collectFilesWithExt(DIR + "/src/filter", ".cpp", true, false);
    var SOURCES_AUDIO = Directory.collectFilesWithExt(DIR + "/src/audiosource/wav", ".cpp", true, false);
    SOURCES_AUDIO = SOURCES_AUDIO.concat(Directory.collectFilesWithExt(DIR + "/src/audiosource/wav", ".c", true, false));
    var SOURCE_CAPI = DIR + "/src/c_api/soloud_c.cpp";
    if (WITH_RAYLIB) {
        var SOURCE_BACKEND = DIR + "/src/backend/null/soloud_null.cpp";
        var DPARAMS = arrayToString(["-D",PLATFORM,"-D","WITH_NULL"]);
    } else {
        var SOURCE_BACKEND = DIR + "/src/backend/miniaudio/soloud_miniaudio.cpp";
        var DPARAMS = arrayToString(["-D",PLATFORM,"-D","WITH_MINIAUDIO"]);
    }

    SOURCES = SOURCES.concat(SOURCES_CORE, SOURCES_FILTERS, SOURCES_AUDIO, SOURCE_BACKEND);
    SOURCES.push(SOURCE_BACKEND);
    SOURCES.push(SOURCE_CAPI);

    if (WITH_RAYLIB) {
        //SOURCES = removeItemContainingString(SOURCES,"dr_impl");
    }

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, INCLUDES, DPARAMS);

    /*
    for (var i=0; i<SOURCES.length; i++) {
        var SOURCE = SOURCES[i];
        var OUTPUT = TARGET_PATH_DIR + "/" + Path.getFilename(SOURCE).replace(".cpp",".o").replace(".c",".o");
        var tmp = arrayToString([CC, "-c", SOURCE, "-o", OUTPUT, CFLAGS, INCLUDES, DPARAMS]);
        Processor.run(tmp);
    }

    return 0;
     */
}
