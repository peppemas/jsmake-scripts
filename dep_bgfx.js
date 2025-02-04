// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function bgfx() {

    Log.info("### Compile BGFX");

    var GITHUB_URL = "https://github.com/bkaradzic/bgfx.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/bgfx";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "BGFX_CONFIG_RENDERER_DIRECT3D12=1",
        //"BGFX_CONFIG_RENDERER_DIRECT3D11=1",
        //"BGFX_CONFIG_RENDERER_DIRECT3D9=1",
        //"BGFX_CONFIG_RENDERER_WEBGPU=1",
        "BGFX_CONFIG_RENDERER_VULKAN=1",
        "BGFX_CONFIG_RENDERER_OPENGL=1",
    ];
    var INCLUDES = [
        "-I", DIR + "/include",
        "-I", DIR + "/3rdparty",
        "-I", DIR + "/3rdparty/dxsdk/include",
        "-I", DIR + "/3rdparty/khronos",
        "-I", INSTALL_LIB_DIR + "/bimg/include",
        "-I", INSTALL_LIB_DIR + "/bx/include"
    ];

    if (TARGET_PLATFORM === T_TARGET_PLATFORM.WINDOWS) {
        INCLUDES = INCLUDES.concat([
            "-I", INSTALL_LIB_DIR + "/bx/include/compat/mingw"
        ]);
        DPARAMS = DPARAMS.concat([
            "BX_PLATFORM_WINDOWS",
            "BGFX_CONFIG_RENDERER_OPENGL=44" //if you want to use OpenGL 4.4
        ]);
    } else {
        Log.error("TARGET PLATFORM compilation not yet implemented.");
        System.exit(-1);
    }

    if (TARGET_BUILD === T_TARGET_BUILD.DEBUG) {
        DPARAMS = DPARAMS.concat([
            "BGFX_CONFIG_PROFILER",
            "BX_CONFIG_DEBUG=0",
            "PRIx64=\"I64x\""
        ]);
    } else {
        DPARAMS = DPARAMS.concat([
            "BX_CONFIG_DEBUG=0",
        ]);
    }

    var SOURCES = Directory.collectFilesWithExt(DIR + "/src", ".cpp", false, false);
    removeItemContainingString(SOURCES, "amalgamated.cpp");

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "bgfx");
}

// compile shaderc tool
function bgfx_shaderc()
{
    banner("Compile SHADERC");
    
    var DPARAMS = arrayToString([PLATFORM, "BX_CONFIG_DEBUG"]);
    var LDLIBS = arrayToString([
        "-L",TARGET_PATH_DIR,
        "-l","victrix",
        "-l","winmm",
        "-l","gdi32",
        "-l","opengl32",
        "-l","imm32",           // WINDOWS
        "-l","ole32",           // WINDOWS
        "-l","uuid",            // WINDOWS
        "-l","version",         // WINDOWS
        "-l","user32",          // WINDOWS
        "-l","setupapi",        // WINDOWS
        "-l","oleaut32",        // WINDOWS
        "-l","Xinput1_4"        // WINDOWS
    ]);

    var DIR = INSTALL_LIB_DIR + "/bgfx";
    var SOURCES = Directory.collectFilesWithExt(DIR + "/tools/shaderc", ".cpp", false, false);
    var INCLUDES = [
        "-I", DIR + "/tools/shaderc"
    ];
    AMALGAMATED_INCLUDES.push(INCLUDES);

    var OUTPUT = "./build/shaderc";
    var cmd = arrayToStringD([CXX, "-static", SOURCES, "-o", OUTPUT, CFLAGS, arrayToString(AMALGAMATED_INCLUDES), DPARAMS, LDLIBS]);
    Processor.run(cmd);
}