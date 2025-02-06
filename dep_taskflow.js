// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function taskflow() {
    Log.info("### Compile TASKFLOW (Header Only)");

    var GITHUB_URL = "https://github.com/taskflow/taskflow.git";
    var VERSION = "v3.6.0";

    var DIR = INSTALL_LIB_DIR + "/taskflow";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [];
    var INCLUDES = [
        DIR
    ];

    AMALGAMATED_INCLUDES.push(INCLUDES);

    return true;
}
