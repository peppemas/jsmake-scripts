function quickjs()
{
    Log.info("### Compile QUICKJS");

    var GITHUB_URL = "https://github.com/bellard/quickjs.git";
    var VERSION = "master";

    var DIR = INSTALL_LIB_DIR + "/quickjs";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var INCLUDES = [
        DIR
    ];
    var DPARAMS = [
        PLATFORM,
        "_GNU_SOURCE",
        "CONFIG_VERSION=\"12345\"",
        "CONFIG_BIGNUM",
        "CONFIG_CHECK_JSVALUE"
    ];
    var CFLAGS = "-g -Wall -MMD -Wno-array-bounds -Wno-format-truncation";

    var SOURCES = [
        DIR + "/cutils.c",
        DIR + "/libbf.c",
        DIR + "/libregexp.c",
        DIR + "/libunicode.c",
        DIR + "/quickjs-libc.c",
        DIR + "/unicode_gen.c",
        DIR + "/quickjs.c",
    ];

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "quickjs");
    //OLD return compileLibraryGCC("libquickjs.a", SOURCES, CFLAGS, INCLUDES, DPARAMS);
}
