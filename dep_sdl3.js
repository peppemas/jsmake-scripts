// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function sdl3()
{
    Log.warn("### Compile SDL3");

    var GITHUB_URL = "https://github.com/libsdl-org/SDL.git";
    var VERSION = "release-3.2.0";

    var DIR = INSTALL_LIB_DIR + "/sdl3";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS =
        [
            "-D",PLATFORM,
            "-D","SDL_MAIN_HANDLED",    // we manage ourself window handle
            "-D","NDEBUG",
            "-D","_MBCS",
            "-D","HAVE_SHELLSCALINGAPI_H"
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
    var SOURCES_TIME = Directory.collectFilesWithExt(DIR+"/src/time",".c",false,false);
    var SOURCES_GPU = Directory.collectFilesWithExt(DIR+"/src/gpu",".c",false,false);
    var SOURCES_CAMERA = Directory.collectFilesWithExt(DIR+"/src/camera",".c",false,false);
    var SOURCES_STORAGE = Directory.collectFilesWithExt(DIR+"/src/storage",".c",false,false);
    var SOURCES_PROCESS = Directory.collectFilesWithExt(DIR+"/src/process",".c",false,false);
    var SOURCES_DIALOG = Directory.collectFilesWithExt(DIR+"/src/dialog",".c",false,false);
    var SOURCES_MAIN_CALLBACKS = [DIR+"/src/main/SDL_main_callbacks.c"];

    switch (TARGET_PLATFORM) {
        case T_TARGET_PLATFORM.WINDOWS:
            // TODO: Use Template engine to build the correct path
            var SOURCES_AUDIO_DRV = [];
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

            var SOURCES_RENDER_DRV = [];
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/direct3d",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/direct3d11",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/direct3d12",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/software",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/opengl",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/opengles2",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/vulkan",".c",false,false));
            SOURCES_RENDER_DRV = SOURCES_RENDER_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/render/gpu",".c",false,false));

            var SOURCES_GPU_DRV = [];
            SOURCES_GPU_DRV = SOURCES_GPU_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/gpu/d3d11",".c",false,false));
            SOURCES_GPU_DRV = SOURCES_GPU_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/gpu/d3d12",".c",false,false));
            SOURCES_GPU_DRV = SOURCES_GPU_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/gpu/vulkan",".c",false,false));

            var SOURCES_CAMERA_DRV = [];
            SOURCES_CAMERA_DRV = SOURCES_CAMERA_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/camera/mediafoundation",".c",false,false));
            SOURCES_CAMERA_DRV = SOURCES_CAMERA_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/camera/dummy",".c",false,false));

            var SOURCES_VIDEO_DRV = [];
            SOURCES_VIDEO_DRV = SOURCES_VIDEO_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/video/dummy",".c",false,false));
            SOURCES_VIDEO_DRV = SOURCES_VIDEO_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/video/offscreen",".c",false,false));
            SOURCES_VIDEO_DRV = SOURCES_VIDEO_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/video/windows",".c",false,false));

            var SOURCES_SENSOR_DRV = [];
            SOURCES_SENSOR_DRV = SOURCES_SENSOR_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/sensor/windows",".c",false,false));

            var SOURCES_THREAD_DRV = [];
            SOURCES_THREAD_DRV = SOURCES_THREAD_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/thread/windows",".c",false,false));
            SOURCES_THREAD_DRV = SOURCES_THREAD_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/thread/generic",".c",false,false));

            var SOURCES_STORAGE_DRV = [];
            SOURCES_STORAGE_DRV = SOURCES_STORAGE_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/storage/generic",".c",false,false));

            var SOURCES_PROCESS_DRV = [];
            SOURCES_PROCESS_DRV = SOURCES_PROCESS_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/process/windows",".c",false,false));

            var SOURCES_DIALOG_DRV = [];
            SOURCES_DIALOG_DRV = SOURCES_DIALOG_DRV.concat(Directory.collectFilesWithExt(DIR+"/src/dialog/windows",".c",false,false));

            var SOURCES_TIMER_DRV = Directory.collectFilesWithExt(DIR+"/src/timer/windows",".c",false,false);
            var SOURCES_LOADSO_DRV = Directory.collectFilesWithExt(DIR+"/src/loadso/windows",".c",false,false);
            var SOURCES_MISC_DRV = Directory.collectFilesWithExt(DIR+"/src/misc/windows",".c",false,false);
            var SOURCES_LOCALE_DRV = Directory.collectFilesWithExt(DIR+"/src/locale/windows",".c",false,false);
            var SOURCES_MAIN_DRV = Directory.collectFilesWithExt(DIR+"/src/main/windows",".c",false,false);
            var SOURCES_TIME_DRV = Directory.collectFilesWithExt(DIR+"/src/time/windows",".c",false,false);

            DPARAMS.push("-D");
            DPARAMS.push("__WIN32__");
            DPARAMS.push("-D");
            DPARAMS.push("SDL_DISABLE_OLD_NAMES");
            DPARAMS.push("-D");
            DPARAMS.push("SDL_CAMERA_DRIVER_MEDIAFOUNDATION");
            DPARAMS.push("-D");
            if (TARGET_RENDERER === T_TARGET_RENDERER.OPENGL) {
                DPARAMS.push("SDL_VIDEO_RENDER_OGL");
            } else if (TARGET_RENDERER === T_TARGET_RENDERER.DIRECTX) {
                DPARAMS.push("SDL_VIDEO_RENDER_D3D11");
            }
            break;
        case T_TARGET_PLATFORM.ANDROID:
            DPARAMS.push("-D");
            DPARAMS.push("__ANDROID__");
            break;
    }
    var INCLUDES = [
        "-I",LIBS_PLATFORM_PATH+"/sdl_include/windows",
        "-I",DIR+"/include",
        "-I",DIR+"/src/hidapi/hidapi",
        "-I",DIR+"/src/video/khronos",
        "-I",DIR+"/include/",
        "-I",DIR+"/include/SDL3",
        "-I",DIR+"/include/build_config",
        "-I",DIR+"/src"
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
        SOURCES_TIME,
        SOURCES_GPU,
        SOURCES_CAMERA,
        SOURCES_STORAGE,
        SOURCES_PROCESS,
        SOURCES_DIALOG,
        SOURCES_MAIN_CALLBACKS,
        // ========== DRIVERS ==========
        SOURCES_RENDER_DRV,
        SOURCES_AUDIO_DRV,
        SOURCES_VIDEO_DRV,
        SOURCES_CAMERA_DRV,
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
        SOURCES_TIME_DRV,
        SOURCES_GPU_DRV,
        SOURCES_STORAGE_DRV,
        SOURCES_PROCESS_DRV,
        SOURCES_DIALOG_DRV,
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

