function imgui()
{
    Log.warn("### Compile IMGUI");

    var GITHUB_URL = "https://github.com/ocornut/imgui.git";
    var VERSION = "v1.91.6";

    var DIR = INSTALL_LIB_DIR + "/imgui";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var SOURCES = [
        DIR + "/imgui.cpp",
        DIR + "/imgui_draw.cpp",
        DIR + "/imgui_widgets.cpp",
        DIR + "/imgui_tables.cpp",
    ];
    var INCLUDES = [
        DIR,
    ];
    var DPARAMS = [
        PLATFORM,
    ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);

    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "IMGUI");
}
