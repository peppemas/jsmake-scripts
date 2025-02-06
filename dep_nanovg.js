function nanovg()
{
    var GITHUB_URL = "https://github.com/memononen/nanovg.git";
    var VERSION = "master";
    var DIR = INSTALL_LIB_DIR + "/nanovg";
    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var GITHUB_URL_2 = "https://github.com/memononen/nanosvg.git";
    var VERSION_2 = "master";
    var DIR_2 = INSTALL_LIB_DIR + "/nanosvg";
    GitCloneIfNotExists(GITHUB_URL_2, VERSION_2, DIR_2);

    // TODO: Comment #define STB_IMAGE_IMPLEMENTATION in nanovg.c line 29

    if (TARGET_GRAPHICS === T_TARGET_GRAPHICS.BGFX)
    {
        Log.info("### Compile NANOVG + NANOSVG (BGFX) ---> COMPILE LATER!");
        return 0;
    }

    Log.info("### Compile NANOVG + NANOSVG");
    return compile_nanovg_gl();
}

function compile_nanovg_gl() {
    var DIR = INSTALL_LIB_DIR + "/nanovg/src";
    var SOURCES = Directory.collectFilesWithExt(DIR, ".c", true, false);
    var INCLUDES = [
        DIR,
        INSTALL_LIB_DIR + "/nanosvg/src"
    ];
    var DPARAMS = [PLATFORM_STANDARD, "_CRT_SECURE_NO_WARNINGS"];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "nanovg");
}

/*
function nanovg_bgfx() {
    var DIR = LIBS_TIER1_PATH + "/bgfx/examples/common";
    var SOURCES = Directory.collectFilesWithExt(DIR + "/nanovg", ".c", false, false);
    SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/nanovg", ".cpp", false, false));
    var INCLUDES = [
        DIR + "/nanovg",
        LIBS_TIER1_PATH + "/stb",
        LIBS_TIER1_PATH + "/bx/include",
        LIBS_TIER1_PATH + "/bx/include/compat/mingw",
        LIBS_TIER1_PATH + "/bx/3rdparty",
        LIBS_TIER1_PATH + "/bgfx/include",
        LIBS_TIER1_PATH,      // this is an include error of fontstash.h: #include <stb/stb_truetype.h>
        LIBS_TIER1_PATH + "/nanosvg/src"
    ];
    var DPARAMS = [PLATFORM_STANDARD, "BX_PLATFORM_WINDOWS",  "_CRT_SECURE_NO_WARNINGS"];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "nanovg");
}
*/