function test()
{
    banner ("TEST NATIVE");

    var TARGET_TEST = [
        native_hello,
    ];

    compile(TARGET_TEST);
}

function build_test(SOURCE, OUTPUT)
{
    var DPARAMS = [PLATFORM, "BX_CONFIG_DEBUG"];
    var LDLIBS = arrayToString([
        "-L",TARGET_PATH_DIR,
        "-l","victrix",
        "-l","winmm",
        "-l","gdi32",
        "-l","opengl32",
        "-l","psapi",           // WINDOWS
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

function native_hello()
{
    var SOURCE = "./examples/hello.cpp";
    var OUTPUT = "./build/hello";
    build_test(SOURCE, OUTPUT);
}