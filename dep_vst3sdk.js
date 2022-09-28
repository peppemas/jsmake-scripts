function vst3sdk() 
{
    Log.info("### Compile VST3SDK");

    var GITHUB_URL = "https://github.com/steinbergmedia/vst3sdk.git";
    var VERSION = "v3.7.5_build_44";

    var DIR = INSTALL_LIB_DIR + "/vst3sdk";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);
	
}
