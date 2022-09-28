function imgui()
{
    Log.info("### Compile IMGUI");

    var GITHUB_URL = "https://github.com/ocornut/imgui.git";
    var VERSION = "v1.87";

    var DIR = INSTALL_LIB_DIR + "/imgui";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var SOURCES = [
        DIR + "/imgui.cpp",
        DIR + "/imgui_draw.cpp",
        DIR + "/imgui_widgets.cpp",
    ];
    var INCLUDES = arrayToString([
        "-I",DIR,
    ]);
    var DPARAMS = arrayToString([
        "-D",PLATFORM,
    ]);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);

    return compileLibrary("libimgui.a", SOURCES, CFLAGS, INCLUDES, DPARAMS);
}
