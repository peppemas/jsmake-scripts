function soloud()
{

    Log.info("### Compile Soloud");

    var GITHUB_URL = "https://github.com/jarikomppa/soloud.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/soloud";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        "-I",DIR+"/include"
    ];

    var SOURCES = [];
    var SOURCES_CORE = Directory.collectFilesWithExt(DIR + "/src/core", ".cpp", true, false);
    var SOURCES_FILTERS = Directory.collectFilesWithExt(DIR + "/src/filter", ".cpp", true, false);
    var SOURCES_AUDIO = Directory.collectFilesWithExt(DIR + "/src/audiosource/wav", ".cpp", true, false);
    SOURCES_AUDIO = SOURCES_AUDIO.concat(Directory.collectFilesWithExt(DIR + "/src/audiosource/wav", ".c", true, false));
    var SOURCE_BACKEND = DIR + "/src/backend/miniaudio/soloud_miniaudio.cpp";
    var DPARAMS = arrayToString(["-D",PLATFORM,"-D","WITH_MINIAUDIO"]);

    SOURCES = SOURCES.concat(SOURCES_CORE, SOURCES_FILTERS, SOURCES_AUDIO, SOURCE_BACKEND);
    SOURCES.push(SOURCE_BACKEND);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "soloud");
}
