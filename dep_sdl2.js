// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function sdl2()
{
    Log.warn("### Compile SDL2");

    var GITHUB_URL = "https://github.com/libsdl-org/SDL.git";
    var VERSION = "release-2.30.9";

    var DIR = INSTALL_LIB_DIR + "/sdl2";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS =
        [
            PLATFORM,
            "SDL_MAIN_HANDLED",    // we manage ourself window handle
            "NDEBUG",
            "_MBCS",
            "HAVE_SHELLSCALINGAPI_H"
        ];

    // common for all platforms
    var SOURCES = Directory.collectFilesWithExt(DIR+"/src",".c",false,false);

    var SOURCES_ATOMIC = Directory.collectFilesWithExt(DIR+"/src/atomic",".c",false,false);
    var SOURCES_AUDIO = Directory.collectFilesWithExt(DIR+"/src/audio",".c",false,false);
    var SOURCES_CPU = Directory.collectFilesWithExt(DIR+"/src/cpuinfo",".c",false,false);
    var SOURCES_DYNAPI = Directory.collectFilesWithExt(DIR+"/src/dynapi",".c",false,false);
    var SOURCES_EVENTS = Directory.collectFilesWithExt(DIR+"/src/events",".c",false,false);
    var SOURCES_FILE = Directory.collectFilesWithExt(DIR+"/src/file",".c",false,false);
    var SOURCES_FILESYSTEM = Directory.collectFilesWithExt(DIR+"/src/filesystem",".c",false,false);
    var SOURCES_HAPTIC = Directory.collectFilesWithExt(DIR+"/src/haptic",".c",false,false);
    var SOURCES_HIDAPI = Directory.collectFilesWithExt(DIR+"/src/hidapi",".c",false,false);
    var SOURCES_JOYSTICK = Directory.collectFilesWithExt(DIR+"/src/joystick",".c",false,false);
    var SOURCES_JOYSTICK_VIRTUAL = Directory.collectFilesWithExt(DIR+"/src/joystick/virtual",".c",false,false);
    var SOURCES_LIBM = Directory.collectFilesWithExt(DIR+"/src/libm",".c",false,false);
    var SOURCES_POWER = Directory.collectFilesWithExt(DIR+"/src/power",".c",false,false);
    var SOURCES_RENDER = Directory.collectFilesWithExt(DIR+"/src/render",".c",false,false);
    var SOURCES_SENSOR = Directory.collectFilesWithExt(DIR+"/src/sensor",".c",false,false);
    var SOURCES_STDLIB = Directory.collectFilesWithExt(DIR+"/src/stdlib",".c",false,false);
    var SOURCES_THREAD = Directory.collectFilesWithExt(DIR+"/src/thread",".c",false,false);
    var SOURCES_TIMER = Directory.collectFilesWithExt(DIR+"/src/timer",".c",false,false);
    var SOURCES_VIDEO = Directory.collectFilesWithExt(DIR+"/src/video",".c",false,false);
    var SOURCES_VIDEO_YUV2RGB = Directory.collectFilesWithExt(DIR+"/src/video/yuv2rgb",".c",false,false);
    var SOURCES_MISC = Directory.collectFilesWithExt(DIR+"/src/misc",".c",false,false);
    var SOURCES_LOCALE = Directory.collectFilesWithExt(DIR+"/src/locale",".c",false,false);

    switch (TARGET_PLATFORM) {
        case T_TARGET_PLATFORM.WINDOWS:
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
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/direct3d12",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/opengl",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/software",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/opengles2",".c",false,false));
            var SOURCES_SENSOR_DRV = Directory.collectFilesWithExt(DIR+"/src/sensor/windows",".c",false,false);
            var SOURCES_THREAD_DRV = Directory.collectFilesWithExt(DIR+"/src/thread/windows",".c",false,false);
            SOURCES_THREAD_DRV.push(DIR+"/src/thread/generic/SDL_syscond.c");
            var SOURCES_TIMER_DRV = Directory.collectFilesWithExt(DIR+"/src/timer/windows",".c",false,false);
            var SOURCES_VIDEO_DRV = Directory.collectFilesWithExt(DIR+"/src/video/dummy",".c",false,false);
            SOURCES_VIDEO_DRV = SOURCES_VIDEO_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/video/windows",".c",false,false));
            var SOURCES_LOADSO_DRV = Directory.collectFilesWithExt(DIR+"/src/loadso/windows",".c",false,false);
            var SOURCES_MISC_DRV = Directory.collectFilesWithExt(DIR+"/src/misc/windows",".c",false,false);
            var SOURCES_LOCALE_DRV = Directory.collectFilesWithExt(DIR+"/src/locale/windows",".c",false,false);
            var SOURCES_MAIN_DRV = Directory.collectFilesWithExt(DIR+"/src/main/windows",".c",false,false);

            DPARAMS.push("__WIN32__");
            if (TARGET_RENDERER === T_TARGET_RENDERER.OPENGL) {
                DPARAMS.push("SDL_VIDEO_RENDER_OGL");
            } else if (TARGET_RENDERER === T_TARGET_RENDERER.DIRECTX) {
                DPARAMS.push("SDL_VIDEO_RENDER_D3D11");
            }
            break;
        case T_TARGET_PLATFORM.ANDROID:
            DPARAMS.push("__ANDROID__");
            break;
    }
    var INCLUDES = [
        LIBS_PLATFORM_PATH+"/sdl_include/windows",
        DIR+"/include",
        DIR+"/src/hidapi/hidapi",
        DIR+"/src/video/khronos",
        DIR+"/include/"
    ];

    SOURCES = SOURCES.concat(
        SOURCES_ATOMIC,
        SOURCES_AUDIO,
        SOURCES_CPU,
        SOURCES_DYNAPI,
        SOURCES_EVENTS,
        SOURCES_FILE,
        SOURCES_FILESYSTEM,
        SOURCES_LIBM,
        SOURCES_RENDER,
        SOURCES_STDLIB,
        SOURCES_THREAD,
        SOURCES_TIMER,
        SOURCES_VIDEO,
        SOURCES_VIDEO_YUV2RGB,
        SOURCES_JOYSTICK,
        SOURCES_JOYSTICK_VIRTUAL,
        SOURCES_HAPTIC,
        SOURCES_SENSOR,
        SOURCES_POWER,
        SOURCES_HIDAPI,
        SOURCES_MISC,
        SOURCES_LOCALE,
        // ========== DRIVERS ==========
        SOURCES_RENDER_DRV,
        SOURCES_AUDIO_DRV,
        SOURCES_VIDEO_DRV,
        SOURCES_CORE_DRV,
        SOURCES_THREAD_DRV,
        SOURCES_FILESYSTEM_DRV,
        SOURCES_HAPTIC_DRV,
        SOURCES_HIDAPI_DRV,
        SOURCES_JOYSTICK_DRV,
        SOURCES_POWER_DRV,
        SOURCES_SENSOR_DRV,
        SOURCES_TIMER_DRV,
        SOURCES_LOADSO_DRV,
        SOURCES_MISC_DRV,
        SOURCES_LOCALE_DRV,
        SOURCES_MAIN_DRV
    );

    //var GLAD_SOURCES = Directory.collectFilesWithExt("src/glad/src", ".c", false, false);
    //SOURCES = SOURCES.concat(GLAD_SOURCES);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);

    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "SDL");
}
