function imguizmo()
{
    Log.warn("### Compile IMGUIZMO");

    var GITHUB_URL = "https://github.com/CedricGuillemet/ImGuizmo.git";
    var VERSION = "1.83";

    var DIR = INSTALL_LIB_DIR + "/imguizmo";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var SOURCES = [
        DIR + "/GraphEditor.cpp",
        DIR + "/ImCurveEdit.cpp",
        DIR + "/ImGradient.cpp",
        DIR + "/ImGuizmo.cpp",
        DIR + "/ImSequencer.cpp"
    ];
    var INCLUDES = [
        "-I",DIR,
    ];
    var DPARAMS = [
        PLATFORM,
    ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);

    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "IMGUIZMO");
}
