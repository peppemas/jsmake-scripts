function jsoncpp()
{
    Log.info("### Compile JSONCPP");

    var GITHUB_URL = "https://github.com/open-source-parsers/jsoncpp.git";
    var VERSION = "1.9.4";

    var DIR = INSTALL_LIB_DIR + "/jsoncpp";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [PLATFORM];
    var SOURCES = Directory.collectFilesWithExt(DIR + "/src/lib_json", ".cpp", true, false);
    var INCLUDES = [
        "-I", DIR + "/include",
        "-I", DIR + "/src/lib_json/"
    ];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "jsoncpp");
}

