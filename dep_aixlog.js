// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function aixlog() {
    Log.info("### Compile AIXLOG (Header Only)");

    var GITHUB_URL = "https://github.com/badaix/aixlog.git";
    var VERSION = "v1.5.0";

    var DIR = INSTALL_LIB_DIR + "/aixlog";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var INCLUDES = [
        "-I", DIR + "/include",
    ];

    AMALGAMATED_INCLUDES.push(INCLUDES);

    return true; 
}