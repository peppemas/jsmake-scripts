function test()
{
    banner ("TEST GLFW");

    var TARGET_TEST = [
        //window_glfw,
        //audio_info,
        //audio_test,
        //audio_mixer,
        //gui_glfw,
        //gui_timeline,
        //gui_gamepad,
        //gui_drag,
        //gui_tweener,
        //gui_native,
        //gui_stress,
        //gui_knob,
        //gui_layout
        vx3d_hello,
        vx3d_matcap
    ];

    compile(TARGET_TEST);
}

function build_test(SOURCE, OUTPUT)
{
    if (TARGET_WINDOW !== T_TARGET_WINDOW.GLFW) {
        return 0;	// skip
    }

    var DPARAMS = ["-D", PLATFORM, "-D", PLATFORM_STANDARD];
    var LDLIBS = [
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
        "-l","psapi",           // WINDOWS
        "-l","mfplat",          // WASAPI
        "-l","mfuuid",          // WASAPI
        "-l","wmcodecdspuuid",  // WASAPI
        "-l","ksuser"           // WASAPI
    ];

    if (TARGET_BUILD === T_TARGET_BUILD.DEBUG) {
        DPARAMS.concat(["-D", "VX_DEBUG"]);
    } else {
        DPARAMS.concat(["-D", "VX_RELEASE"]);
    }

    if (TARGET_GRAPHICS === T_TARGET_GRAPHICS.BGFX) {
        DPARAMS = DPARAMS.concat(["-D", "VX_BGFX"]);
    } else {
        DPARAMS = DPARAMS.concat(["-D", "VX_OPENGL"]);
    }

    if (TARGET_AUDIO === T_TARGET_AUDIO.MINIAUDIO) {
        DPARAMS = DPARAMS.concat("-D", "VX_AUDIO_MINIAUDIO");
    } else if (TARGET_AUDIO === T_TARGET_AUDIO.RTAUDIO) {
        DPARAMS = DPARAMS.concat("-D", "VX_AUDIO_RTAUDIO");
    }

    if (TARGET_BUILD === T_TARGET_BUILD.DEBUG) {
        LDLIBS = LDLIBS.concat([
           "-l", "DbgHelp",
           "-l", "ImageHlp"
        ]);
    }

    var SOURCES = arrayToString([
        SOURCE
    ]);

    var cmd = arrayToStringD([CXX, "-static", SOURCES,
        "-o", OUTPUT,
        CFLAGS,
        arrayToString(AMALGAMATED_INCLUDES),
        arrayToString(DPARAMS),
        arrayToString(LDLIBS)]);

    Processor.run(cmd);
}

function gui_glfw()
{
    var SOURCE = "./examples/gui_glfw.cpp";
    var OUTPUT = "./build/gui_glfw";
    build_test(SOURCE, OUTPUT);
}

function gui_drag()
{
    var SOURCE = "./examples/gui_drag.cpp";
    var OUTPUT = "./build/gui_drag";
    build_test(SOURCE, OUTPUT);
}

function gui_tweener()
{
    var SOURCE = "./examples/gui_tweener.cpp";
    var OUTPUT = "./build/gui_tweener";
    build_test(SOURCE, OUTPUT);
}

function  gui_native()
{
    var SOURCE = "./examples/gui_native.cpp";
    var OUTPUT = "./build/gui_native";
    build_test(SOURCE, OUTPUT);
}

function  gui_timeline()
{
    var SOURCE = "./examples/gui_timeline.cpp";
    var OUTPUT = "./build/gui_timeline";
    build_test(SOURCE, OUTPUT);
}

function gui_gamepad()
{
    var SOURCE = "./examples/gui_gamepad.cpp";
    var OUTPUT = "./build/gui_gamepad";
    build_test(SOURCE, OUTPUT);
}

function gui_stress()
{
    var SOURCE = "./examples/gui_stress.cpp";
    var OUTPUT = "./build/gui_stress";
    build_test(SOURCE, OUTPUT);
}

function gui_knob()
{
    var SOURCE = "./examples/gui_knob.cpp";
    var OUTPUT = "./build/gui_knob";
    build_test(SOURCE, OUTPUT);
}

function gui_layout()
{
    var SOURCE = "./examples/gui_layout.cpp";
    var OUTPUT = "./build/gui_layout";
    build_test(SOURCE, OUTPUT);
}

function audio_info()
{
    var SOURCE = "./examples/audio_info.cpp";
    var OUTPUT = "./build/audio_info";
    build_test(SOURCE, OUTPUT);
}

function audio_test()
{
    var SOURCE = "./examples/audio_test.cpp";
    var OUTPUT = "./build/audio_test";
    build_test(SOURCE, OUTPUT);
}

function audio_mixer()
{
    var SOURCE = "./examples/audio_mixer.cpp";
    var OUTPUT = "./build/audio_mixer";
    build_test(SOURCE, OUTPUT);
}

function window_glfw()
{
    var SOURCE = "./examples/window_glfw.cpp";
    var OUTPUT = "./build/window_glfw";
    build_test(SOURCE, OUTPUT);
}

function vx3d_hello() {
    var SOURCE = "./examples/3d_hello.cpp";
    var OUTPUT = "./build/3d_hello";
    build_test(SOURCE, OUTPUT);
}

function vx3d_matcap() {
    var SOURCE = "./examples/3d_matcap.cpp";
    var OUTPUT = "./build/3d_matcap";
    build_test(SOURCE, OUTPUT);
}
