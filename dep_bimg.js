// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function bimg() {

    Log.info("### Compile BIMG");

    var GITHUB_URL = "https://github.com/bkaradzic/bimg.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/bimg";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        "-I", DIR + "/include",
        "-I", DIR + "/3rdparty/astc-codec/include",
        "-I", DIR + "/3rdparty/iqa/include",
        "-I", DIR + "/3rdparty",
        "-I", DIR + "/3rdparty/astc-codec",
        "-I", INSTALL_LIB_DIR + "/bx/include",
        "-I", INSTALL_LIB_DIR + "/miniz"
    ];

    if (TARGET_PLATFORM === T_TARGET_PLATFORM.WINDOWS) {
        INCLUDES = INCLUDES.concat([
            "-I", INSTALL_LIB_DIR + "/bx/include/compat/mingw"
        ]);
        DPARAMS = DPARAMS.concat([
            "-D","BX_PLATFORM_WINDOWS",
            "-D","BX_CONFIG_DEBUG=0"
        ])
    } else {
        Log.error("TARGET PLATFORM compilation not yet implemented.");
        System.exit(-1);
    }

    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".cpp", true, false);
    SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/3rdparty/astc-codec/src/decoder", ".cc", false, false));

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "bimg");
}
