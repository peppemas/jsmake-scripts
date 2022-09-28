function monocypher()
{
    Log.info("### Compile MONOCYPHER");
    var SOURCES = INSTALL_LIB_DIR + "/monocypher/monocypher.c";
    var OUTPUT = TARGET_PATH_DIR + "/monocypher.o";
    return Processor.run(arrayToString([CC, "-c", SOURCES, ,"-o", OUTPUT, CFLAGS]));
}
