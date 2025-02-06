function microssdp()
{
    Log.info("### Compile MICROSSDP");
    var SOURCES = INSTALL_LIB_DIR + "/microssdp/ssdp.c";
    var OUTPUT = TARGET_PATH_DIR + "/microssdp.o";
    return Processor.run(arrayToString([CC, "-c", SOURCES, ,"-o", OUTPUT, CFLAGS, PLATFORM]));
}
