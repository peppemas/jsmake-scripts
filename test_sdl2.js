/***************************************************
 *
 * SDL2 Test Compilation Script
 *
 * Copyright (C) 2020 Victrix Games
 *
 ***************************************************/

function test()
{
    banner ("TEST SDL2");

    var TARGET_TEST = [
        window_sdl2,
        theora_sdl2
    ];

    compile(TARGET_TEST);
}

function compile_test(name)
{
    // build/rebuild the AMALGAMATED INCLUDES
    AMALGAMATED_INCLUDES = [];
    AMALGAMATED_INCLUDES_ONLY = true;
    libvictrix();

    Log.info("### Compile " + name);

    var SOURCE = "./src/test/"+name+".cpp";
    var OUTPUT = "./build/"+name;
    var DPARAMS = arrayToString(["-D", PLATFORM]);
    var LDLIBS = arrayToString([
        "-L",TARGET_PATH_DIR,
        "-l","victrix",
        "-l","winmm",
        "-l","gdi32",
        "-l","imm32",			// WINDOWS
        "-l","ole32",			// WINDOWS
        "-l","uuid",			// WINDOWS
        "-l","version",			// WINDOWS
        "-l","user32",			// WINDOWS
        "-l","setupapi",		// WINDOWS
        "-l","oleaut32",		// WINDOWS
    ]);

    var SOURCES = arrayToString([
        SOURCE,
        LIBS_PLATFORM_PATH + "/SDL2-2.0.12/src/main/windows/SDL_windows_main.c"
    ]);

    var cmd = arrayToStringD([CXX, "-static", SOURCES, "-o", OUTPUT, CFLAGS, arrayToString(AMALGAMATED_INCLUDES), DPARAMS, LDLIBS]);
    Processor.run(cmd);
}

function window_sdl2()
{
    compile_test("window_sdl2");
}

function theora_sdl2()
{
    compile_test("theora_sdl2");
}
