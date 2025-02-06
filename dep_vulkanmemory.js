// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function vulkanmemory()
{
    Log.info("### Compile Vulkan Memory Allocator (Header Only)");

    var GITHUB_URL = "https://github.com/GPUOpen-LibrariesAndSDKs/VulkanMemoryAllocator.git";
    var VERSION = "v3.0.1";

    var DIR = INSTALL_LIB_DIR + "/vulkanmemory";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        PLATFORM
    ];
    var INCLUDES = [
        DIR + "/src"
    ];
    var SOURCES = [];

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return 0;
}
