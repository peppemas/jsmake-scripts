// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function rtaudio() {

    if (TARGET_AUDIO !== T_TARGET_AUDIO.RTAUDIO) {
        return 0; // skip
    }

    Log.info("### Compile RTAUDIO");

    var GITHUB_URL = "https://github.com/thestk/rtaudio.git";
    var VERSION = "6.0.1";

    var DIR = INSTALL_LIB_DIR + "/rtaudio";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = ["-D","__WINDOWS_WASAPI__"];
    var INCLUDES = [
        "-I", DIR,
        "-I", DIR + "/include"
    ];

    var SOURCES = [ DIR + "/RtAudio.cpp" ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "rtaudio");
}