// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function assimp() {

    Log.info("### Compile ASSIMP");

    var GITHUB_URL = "https://github.com/assimp/assimp.git";
    var VERSION = "v5.0.1";

    var FORMATS = ["Common","PostProcessing","Material","FBX","glTF","glTF2","X","Collada"];

    var DIR = INSTALL_LIB_DIR + "/assimp";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        //"-D", "ASSIMP_BUILD_NO_X_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_AMF_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_3DS_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_MD3_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_MDL_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_MD2_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_PLY_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_ASE_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_OBJ_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_HMP_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_SMD_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_MDC_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_MD5_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_STL_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_LWO_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_DXF_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_NFF_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_RAW_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_SIB_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_OFF_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_AC_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_BVH_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_IRRMESH_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_IRR_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_Q3D_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_B3D_IMPORTER",
        //"-D", "ASSIMP_BUILD_NO_COLLADA_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_TERRAGEN_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_CSM_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_3D_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_LWS_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_OGRE_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_OPENGEX_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_MS3D_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_COB_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_BLEND_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_Q3BSP_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_NDO_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_IFC_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_XGL_IMPORTER",
        //"-D", "ASSIMP_BUILD_NO_FBX_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_ASSBIN_IMPORTER",
        //"-D", "ASSIMP_BUILD_NO_GLTF_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_C4D_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_3MF_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_X3D_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_MMD_IMPORTER",
        "-D", "ASSIMP_BUILD_NO_STEP_IMPORTER"
    ];
    var INCLUDES = [
        "-I", DIR + "/include",
        "-I", DIR + "/code",
        "-I", DIR + "/contrib/rapidjson/include",
        "-I", DIR + "/contrib/unzip",
        "-I", DIR + "/contrib/irrXML",
        "-I", DIR + "/contrib/zip/src",
        "-I", DIR + "/contrib/zlib",
        "-I", DIR
    ];

    var SOURCES = [];
    for (var i=0; i<FORMATS.length; i++) {
        SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/code/"+FORMATS[i], ".cpp", true, false));
    }
    SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/contrib/unzip", ".c", true, false));
    SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/contrib/irrXML", ".cpp", true, false));
    SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/contrib/zip", ".cpp", true, false));
    SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/contrib/zlib", ".c", false, false));

    build_assimp_revision_h(DIR+"/include", 5, 0, 1);

    AMALGAMATED_SOURCES.push(SOURCES);
    AMALGAMATED_DPARAMS.push(DPARAMS);
    AMALGAMATED_INCLUDES.push(INCLUDES);
    if (AMALGAMATED_INCLUDES_ONLY) return 0;

    return compileGCC(SOURCES, CFLAGS, arrayToString(INCLUDES), arrayToString(DPARAMS), "assimp");
}

function build_assimp_revision_h(include_path, major, minor, patch) {
    var template_content = "#ifndef ASSIMP_REVISION_H_INC\n"
    +"#define ASSIMP_REVISION_H_INC\n"
    +"#define GitVersion 0x{{ GIT_COMMIT_HASH }}\n"
    +"#define GitBranch \"{{ GIT_BRANCH }}\"\n"
    +"#define VER_MAJOR {{ ASSIMP_VERSION_MAJOR }}\n"
    +"#define VER_MINOR {{ ASSIMP_VERSION_MINOR }}\n"
    +"#define VER_PATCH {{ ASSIMP_VERSION_PATCH }}\n"
    +"#define VER_BUILD {{ ASSIMP_PACKAGE_VERSION }}\n"
    +"#define STR_HELP(x) #x\n"
    +"#define STR(x) STR_HELP(x)\n"
    +"#define VER_FILEVERSION             VER_MAJOR,VER_MINOR,VER_PATCH,VER_BUILD\n"
    +"#if (GitVersion == 0)\n"
    +"#define VER_FILEVERSION_STR         STR(VER_MAJOR) \".\" STR(VER_MINOR) \".\" STR(VER_PATCH) \".\" STR(VER_BUILD)\n"
    +"#else\n"
    +"#define VER_FILEVERSION_STR         STR(VER_MAJOR) \".\" STR(VER_MINOR) \".\" STR(VER_PATCH) \".\" STR(VER_BUILD) \" (Commit {{ GIT_COMMIT_HASH }})\"\n"
    +"#endif\n"
    +"#ifdef  NDEBUG\n"
    +"#define VER_ORIGINAL_FILENAME_STR   \"assimp@LIBRARY_SUFFIX@.dll\"\n"
    +"#else\n"
    +"#define VER_ORIGINAL_FILENAME_STR   \"assimp@LIBRARY_SUFFIX@@CMAKE_DEBUG_POSTFIX@.dll\"\n"
    +"#endif //  NDEBUG\n"
    +"#endif // ASSIMP_REVISION_H_INC\n";

    var template_vars = {
        "GIT_COMMIT_HASH": 0,
        "GIT_BRANCH": "master",
        "ASSIMP_VERSION_MAJOR": major,
        "ASSIMP_VERSION_MINOR": minor,
        "ASSIMP_VERSION_PATCH": patch,
        "ASSIMP_PACKAGE_VERSION": 0
    };

    var template_result = Template.render(template_content, JSON.stringify(template_vars));

    Directory.writeTextFile(include_path+"/revision.h",template_result);
}