// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function sdl2()
{
    Log.warn("### Compile SDL2");

    var GITHUB_URL = "https://github.com/libsdl-org/SDL.git";
    var VERSION = "release-2.26.1";

    var DIR = INSTALL_LIB_DIR + "/sdl2";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS =
        [
            "-D",PLATFORM,
            "-D","NDEBUG",
            "-D","USING_GENERATED_CONFIG_H",
            "-D","_MBCS",
            "-D","ENABLE_OPENGL"
        ];

    // common for all platforms
    var SOURCES = Directory.collectFilesWithExt(DIR+"/src",".c",false,false);
    var SOURCES_ATOMIC = Directory.collectFilesWithExt(DIR+"/src/atomic",".c",false,false);
    var SOURCES_AUDIO = Directory.collectFilesWithExt(DIR+"/src/audio",".c",false,false);
    var SOURCES_CPU = Directory.collectFilesWithExt(DIR+"/src/cpuinfo",".c",false,false);
    var SOURCES_DYNAPI = Directory.collectFilesWithExt(DIR+"/src/dynapi",".c",false,false);
    var SOURCES_EVENTS = Directory.collectFilesWithExt(DIR+"/src/events",".c",false,false);
    var SOURCES_FILE = Directory.collectFilesWithExt(DIR+"/src/file",".c",false,false);
    var SOURCES_HAPTIC = Directory.collectFilesWithExt(DIR+"/src/haptic",".c",false,false);
    var SOURCES_HIDAPI = Directory.collectFilesWithExt(DIR+"/src/hidapi",".c",false,false);
    var SOURCES_JOYSTICK = Directory.collectFilesWithExt(DIR+"/src/joystick",".c",false,false);
    var SOURCES_LIBM = Directory.collectFilesWithExt(DIR+"/src/libm",".c",false,false);
    var SOURCES_POWER = Directory.collectFilesWithExt(DIR+"/src/power",".c",false,false);
    var SOURCES_RENDER = Directory.collectFilesWithExt(DIR+"/src/render",".c",false,false);
    var SOURCES_SENSOR = Directory.collectFilesWithExt(DIR+"/src/sensor",".c",false,false);
    var SOURCES_STDLIB = Directory.collectFilesWithExt(DIR+"/src/stdlib",".c",false,false);
    var SOURCES_THREAD = Directory.collectFilesWithExt(DIR+"/src/thread",".c",false,false);
    var SOURCES_TIMER = Directory.collectFilesWithExt(DIR+"/src/timer",".c",false,false);
    var SOURCES_VIDEO = Directory.collectFilesWithExt(DIR+"/src/video",".c",false,false);
    var SOURCES_YUV2RGB = Directory.collectFilesWithExt(DIR+"/src/video/yuv2rgb",".c",false,false);

    switch (PLATFORM) {
        case "WINDOWS":
            // TODO: Use Template engine to build the correct path
            var SOURCES_AUDIO_DRV = Directory.collectFilesWithExt(DIR+"/src/audio/winmm",".c",false,false);
            SOURCES_AUDIO_DRV = SOURCES_AUDIO_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/audio/wasapi",".c",false,false));
            SOURCES_AUDIO_DRV = SOURCES_AUDIO_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/audio/directsound",".c",false,false));
            SOURCES_AUDIO_DRV = SOURCES_AUDIO_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/audio/dummy",".c",false,false));
            SOURCES_AUDIO_DRV = SOURCES_AUDIO_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/audio/disk",".c",false,false));
            var SOURCES_CORE_DRV = Directory.collectFilesWithExt(DIR+"/src/core/windows",".c",false,false);
            var SOURCES_FILESYSTEM_DRV = Directory.collectFilesWithExt(DIR+"/src/filesystem/windows",".c",false,false);
            var SOURCES_HAPTIC_DRV = Directory.collectFilesWithExt(DIR+"/src/haptic/windows",".c",false,false);
            var SOURCES_HIDAPI_DRV = Directory.collectFilesWithExt(DIR+"/src/hidapi/windows",".c",false,false);
            var SOURCES_JOYSTICK_DRV = Directory.collectFilesWithExt(DIR+"/src/joystick/windows",".c",false,false);
            SOURCES_JOYSTICK_DRV = SOURCES_JOYSTICK_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/joystick/hidapi",".c",false,false));
            var SOURCES_POWER_DRV = Directory.collectFilesWithExt(DIR+"/src/power/windows",".c",false,false);
            var SOURCES_RENDER_DRV = Directory.collectFilesWithExt(DIR+"/src/render/direct3d",".c",false,false);
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/direct3d11",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/opengl",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/opengles",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/opengles2",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/psp",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/software",".c",false,false));
            var SOURCES_SENSOR_DRV = Directory.collectFilesWithExt(DIR+"/src/sensor/dummy",".c",false,false);
            var SOURCES_THREAD_DRV = Directory.collectFilesWithExt(DIR+"/src/thread/windows",".c",false,false);
            SOURCES_THREAD_DRV.push(DIR+"/src/thread/generic/SDL_syscond.c");
            var SOURCES_TIMER_DRV = Directory.collectFilesWithExt(DIR+"/src/timer/windows",".c",false,false);
            var SOURCES_VIDEO_DRV = Directory.collectFilesWithExt(DIR+"/src/video/dummy",".c",false,false);
            SOURCES_VIDEO_DRV = SOURCES_VIDEO_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/video/windows",".c",false,false));
            var SOURCE_LOADSO_DRV = Directory.collectFilesWithExt(DIR+"/src/loadso/windows",".c",false,false);

            DPARAMS.push("-D");
            DPARAMS.push("WIN32");
            DPARAMS.push("-D");
            DPARAMS.push("_WINDOWS");
            break;
    }
    var INCLUDES = arrayToString([
        "-I",LIBS_PLATFORM_PATH+"/sdl_include/windows",
        "-I",DIR+"/include",
        "-I",DIR+"/src/hidapi/hidapi",
        "-I",DIR+"/src/video/khronos",
        "-I",DIR+"/include/",
        "-I",VX_SOURCE_CORE_PATH,
        "-I",VX_SOURCE_CORE_PATH + "/native/window",
        "-I",LIBS_PLATFORM_PATH + "/glad/include"
    ]);

    SOURCES = SOURCES.concat(
        SOURCES_ATOMIC,
        SOURCES_AUDIO,
        SOURCES_CPU,
        SOURCES_DYNAPI,
        SOURCES_EVENTS,
        SOURCES_FILE,
        SOURCES_LIBM,
        SOURCES_RENDER,
        SOURCES_RENDER_DRV,
        SOURCES_STDLIB,
        SOURCES_THREAD,
        SOURCES_TIMER,
        SOURCES_VIDEO,
        SOURCES_YUV2RGB,
        SOURCES_JOYSTICK,
        SOURCES_HAPTIC,
        SOURCES_SENSOR,
        SOURCES_POWER,
        SOURCES_AUDIO_DRV,
        SOURCES_VIDEO_DRV,
        SOURCES_CORE_DRV,
        SOURCES_THREAD_DRV,
        SOURCES_HIDAPI,
        SOURCES_FILESYSTEM_DRV,
        SOURCES_HAPTIC_DRV,
        SOURCES_HIDAPI_DRV,
        SOURCES_JOYSTICK_DRV,
        SOURCES_POWER_DRV,
        SOURCES_SENSOR_DRV,
        SOURCES_TIMER_DRV,
        SOURCE_LOADSO_DRV
    );

/*
    var GLAD_SOURCES = Directory.collectFilesWithExt(LIBS_PLATFORM_PATH + "/glad/src", ".c", false, false);
    var VICTRIX_WINDOWIMPL = Directory.collectFilesContainingString(VX_SOURCE_CORE_PATH, "SDL", ".cpp", true, false);
    SOURCES = SOURCES.concat(GLAD_SOURCES, VICTRIX_WINDOWIMPL);
*/

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);

    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, INCLUDES, arrayToString(DPARAMS));
}
