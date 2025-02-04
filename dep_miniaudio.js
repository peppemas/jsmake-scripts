function miniaudio() {

    if (TARGET_AUDIO !== T_TARGET_AUDIO.MINIAUDIO) {
        return 0; // skip
    }

    Log.info("### Compile MINIAUDIO");

    var GITHUB_URL = "https://github.com/mackron/miniaudio.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/miniaudio";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = ["STB_VORBIS_NO_STDIO", "MA_SUPPORT_WASAPI"];
    var INCLUDES = [
        "-I", DIR + "/extras/miniaudio_split",
        "-I", DIR + "/extras"
    ];

    var SOURCES = Directory.collectFilesWithExt(DIR + "/extras/miniaudio_split", ".c", false, false);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "miniaudio");
}