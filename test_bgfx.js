function test()
{
    banner ("TEST BGFX");

    var TARGET_TEST = [
        bgfx_hello,
    ];

    compile(TARGET_TEST);
}

function build_test(SOURCE, OUTPUT)
{
    // if (TARGET_WINDOW !== T_TARGET_WINDOW.GLFW) {
    //     return 0;	// skip
    // }

    var DPARAMS = [PLATFORM, "BX_CONFIG_DEBUG"];
    var LDLIBS = arrayToString([
        "-L",TARGET_PATH_DIR,
        "-l","victrix",
        "-l","winmm",
        "-l","gdi32",
        "-l","opengl32",
        "-l","imm32",			// WINDOWS
        "-l","ole32",			// WINDOWS
        "-l","uuid",			// WINDOWS
        "-l","version",			// WINDOWS
        "-l","user32",			// WINDOWS
        "-l","setupapi",		// WINDOWS
        "-l","oleaut32",		// WINDOWS
        "-l","Xinput1_4"        // WINDOWS
    ]);

    var SOURCES = arrayToString([
        SOURCE
    ]);

    var cmd = arrayToStringD([CXX, "-static", SOURCES, "-o", OUTPUT, CFLAGS, arrayToString(AMALGAMATED_INCLUDES), DPARAMS, LDLIBS]);
    Processor.run(cmd);
}

function bgfx_hello()
{
    var SOURCE = "./src/test/bgfx_hello.cpp";
    var OUTPUT = "./build/bgfx_hello";
    build_test(SOURCE, OUTPUT);
}