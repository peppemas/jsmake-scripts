function sqlite3()
{
    Log.info("### Compile SQLITE3");
    var SOURCES = INSTALL_LIB_DIR + "/sqlite/sqlite3.c";
    var OUTPUT = TARGET_PATH_DIR + "/sqlite3.o";
    return Processor.run(arrayToString([CC, "-c", SOURCES, ,"-o", OUTPUT, CFLAGS]));
}
