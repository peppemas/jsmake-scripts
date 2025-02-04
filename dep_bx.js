// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function bx() {

    Log.info("### Compile BX");

    var GITHUB_URL = "https://github.com/bkaradzic/bx.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/bx";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        "-I", DIR + "/include",
        "-I", DIR + "/bx/include/compat/mingw",
        "-I", DIR + "/3rdparty"
    ];

    if (TARGET_PLATFORM === T_TARGET_PLATFORM.WINDOWS) {
        INCLUDES = INCLUDES.concat([
            "-I", DIR + "/include/compat/mingw"
        ]);
        DPARAMS = DPARAMS.concat([
            "BX_PLATFORM_WINDOWS",
            "BX_CONFIG_DEBUG"
        ])
    } else {
        Log.error("TARGET PLATFORM compilation not yet implemented.");
        System.exit(-1);
    }

    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".cpp", true, false);
    removeItemContainingString(SOURCES, "amalgamated.cpp");
    removeItemContainingString(SOURCES, "debug.cpp");

    // create a dummy debug patch file
    if (!Directory.exists(DIR + "/src/patch_debug.cpp")) {
        Log.ongreen("PATCHING debug.cpp...\n");
        var patch_dummy_debug = '#include <bx/debug.h>\n \
        namespace bx {\n \
        void debugBreak() {};\n \
        void debugOutput(const char* _out) {};\n \
        void debugOutput(const StringView& _str) {};\n \
        void debugPrintfVargs(const char* _format, va_list _argList) {};\n \
        void debugPrintf(const char* _format, ...) {};\n \
        void debugPrintfData(const void* _data, uint32_t _size, const char* _format, ...) {};\n \
        }\n \
        ';
        Directory.writeTextFile(DIR + "/src/patch_debug.cpp", patch_dummy_debug);
    }
    SOURCES.push(DIR + "/src/patch_debug.cpp");

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "bx");
}