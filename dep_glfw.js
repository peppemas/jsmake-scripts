// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function glfw()
{
    Log.warn("### Compile GLFW");

    var GITHUB_URL = "https://github.com/glfw/glfw.git";
    var VERSION = "3.3.7";

    var DIR = INSTALL_LIB_DIR + "/glfw";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var USE_VULKAN = false;
    var DEPS = DIR + "/deps";
    var INCLUDES = [
        DIR + "/include",
        DEPS
    ];
    var DPARAMS = [
        PLATFORM,
        "SUPPORT_GESTURES_SYSTEM",
        "SUPPORT_MOUSE_GESTURES",
        "ENABLE_OPENGL"
    ];

    var SOURCES = [
        DIR + "/src/vulkan.c",
        DIR + "/src/context.c",
        DIR + "/src/egl_context.c",
        DIR + "/src/osmesa_context.c",
        DIR + "/src/wgl_context.c",
        DIR + "/src/init.c",
        DIR + "/src/input.c",
        DIR + "/src/monitor.c",
        DIR + "/src/window.c",
    ];
    if (TARGET_PLATFORM === T_TARGET_PLATFORM.LINUX) {
        SOURCES = SOURCES.concat(DIR + "/src/xkb_unicode.c");
    }
    if (USE_VULKAN) {
        //"_GLFW_VULKAN_STATIC"
        SOURCES = SOURCES.concat(DIR + "/deps/glad_vulkan.c");
    } else {
        SOURCES = SOURCES.concat(DIR + "/deps/glad_gl.c");
    }

    if (Platform.isWindows()) {
        var SOURCES_WIN = Directory.collectFilesContainingString(DIR + "/src", "win32_", ".c", true, false);
        DPARAMS.push("_GLFW_WIN32");
        SOURCES = SOURCES.concat(SOURCES_WIN);
    } else if (Platform.isLinux()) {
        var SOURCES_POSIX = Directory.collectFilesContainingString(DIR + "/src", "posix_", ".c", true, false);
        var SOURCES_X11 = Directory.collectFilesContainingString(DIR + "/src", "x11_", ".c", true, false);
        DPARAMS.push("_GLFW_X11");
        SOURCES = SOURCES.concat(SOURCES_POSIX).concat(SOURCES_X11);
    } else if (Platform.isMacOS()) {
        var SOURCES_OSX = Directory.collectFilesContainingString(DIR + "/src", "cocoa_", ".c", true, false);
        DPARAMS.push("_GLFW_COCOA");
        SOURCES = SOURCES.concat(SOURCES_OSX);
    }

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "glfw");
}
