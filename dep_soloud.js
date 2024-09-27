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
    var SOURCES_WAV = Directory.collectFilesWithExt(DIR + "/src/audiosource/wav", ".cpp", true, false);
    SOURCES_WAV = SOURCES_WAV.concat(Directory.collectFilesWithExt(DIR + "/src/audiosource/wav", ".c", true, false));
    var SOURCES_AY = Directory.collectFilesWithExt(DIR + "/src/audiosource/ay", ".cpp", true, false);
    var SOURCES_NOISE = Directory.collectFilesWithExt(DIR + "/src/audiosource/noise", ".cpp", true, false);
    var SOURCES_OPENMPT = Directory.collectFilesWithExt(DIR + "/src/audiosource/openmpt", ".cpp", true, false);
    var SOURCES_SFXR = Directory.collectFilesWithExt(DIR + "/src/audiosource/sfxr", ".cpp", true, false);
    var SOURCES_SPEECH = Directory.collectFilesWithExt(DIR + "/src/audiosource/speech", ".cpp", true, false);
    var SOURCES_TEDSID = Directory.collectFilesWithExt(DIR + "/src/audiosource/tedsid", ".cpp", true, false);

    var SOURCES_MONOTONE = Directory.collectFilesWithExt(DIR + "/src/audiosource/monotone", ".cpp", true, false);
    var SOURCES_BACKEND = DIR + "/src/backend/miniaudio/soloud_miniaudio.cpp";

    var DPARAMS = arrayToString(["-D",PLATFORM,"-D","WITH_MINIAUDIO"]);

    SOURCES = SOURCES.concat(
        SOURCES_CORE,
        SOURCES_FILTERS,
        SOURCES_WAV,
        SOURCES_AY,
        SOURCES_MONOTONE,
        SOURCES_NOISE,
        SOURCES_OPENMPT,
        SOURCES_SFXR,
        SOURCES_SPEECH,
        SOURCES_TEDSID,
        SOURCES_BACKEND);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "soloud");
}
