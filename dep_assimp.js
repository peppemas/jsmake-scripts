// [X] Windows [] Linux [] OSX [] Android [] UWP [] WEB
function assimp() {

    Log.info("### Compile ASSIMP");

    var GITHUB_URL = "https://github.com/assimp/assimp.git";
    var VERSION = "v5.4.3";

    var FORMATS = [
        "Common",
        "PostProcessing",
        "Material",
        "Geometry",
        "CApi",
        "AssetLib/Obj",
        "AssetLib/FBX",
        //"AssetLib/glTF",
        //"AssetLib/glTF2",
    ];

    var DIR = INSTALL_LIB_DIR + "/assimp";

    GitCloneIfNotExists(GITHUB_URL, VERSION, DIR);

    var DPARAMS = [
        "ASSIMP_BUILD_NO_USD_IMPORTER",
        "ASSIMP_BUILD_NO_M3D_IMPORTER",
        "ASSIMP_BUILD_NO_IQM_IMPORTER",
        "ASSIMP_BUILD_NO_X_IMPORTER",
        "ASSIMP_BUILD_NO_AMF_IMPORTER",
        "ASSIMP_BUILD_NO_3DS_IMPORTER",
        "ASSIMP_BUILD_NO_MD3_IMPORTER",
        "ASSIMP_BUILD_NO_MDL_IMPORTER",
        "ASSIMP_BUILD_NO_MD2_IMPORTER",
        "ASSIMP_BUILD_NO_PLY_IMPORTER",
        "ASSIMP_BUILD_NO_ASE_IMPORTER",
        //"ASSIMP_BUILD_NO_OBJ_IMPORTER",
        "ASSIMP_BUILD_NO_HMP_IMPORTER",
        "ASSIMP_BUILD_NO_SMD_IMPORTER",
        "ASSIMP_BUILD_NO_MDC_IMPORTER",
        "ASSIMP_BUILD_NO_MD5_IMPORTER",
        "ASSIMP_BUILD_NO_STL_IMPORTER",
        "ASSIMP_BUILD_NO_LWO_IMPORTER",
        "ASSIMP_BUILD_NO_DXF_IMPORTER",
        "ASSIMP_BUILD_NO_NFF_IMPORTER",
        "ASSIMP_BUILD_NO_RAW_IMPORTER",
        "ASSIMP_BUILD_NO_SIB_IMPORTER",
        "ASSIMP_BUILD_NO_OFF_IMPORTER",
        "ASSIMP_BUILD_NO_AC_IMPORTER",
        "ASSIMP_BUILD_NO_BVH_IMPORTER",
        "ASSIMP_BUILD_NO_IRRMESH_IMPORTER",
        "ASSIMP_BUILD_NO_IRR_IMPORTER",
        "ASSIMP_BUILD_NO_Q3D_IMPORTER",
        "ASSIMP_BUILD_NO_B3D_IMPORTER",
        "ASSIMP_BUILD_NO_COLLADA_IMPORTER",
        "ASSIMP_BUILD_NO_TERRAGEN_IMPORTER",
        "ASSIMP_BUILD_NO_CSM_IMPORTER",
        "ASSIMP_BUILD_NO_3D_IMPORTER",
        "ASSIMP_BUILD_NO_LWS_IMPORTER",
        "ASSIMP_BUILD_NO_OGRE_IMPORTER",
        "ASSIMP_BUILD_NO_OPENGEX_IMPORTER",
        "ASSIMP_BUILD_NO_MS3D_IMPORTER",
        "ASSIMP_BUILD_NO_COB_IMPORTER",
        "ASSIMP_BUILD_NO_BLEND_IMPORTER",
        "ASSIMP_BUILD_NO_Q3BSP_IMPORTER",
        "ASSIMP_BUILD_NO_NDO_IMPORTER",
        "ASSIMP_BUILD_NO_IFC_IMPORTER",
        "ASSIMP_BUILD_NO_XGL_IMPORTER",
        //"ASSIMP_BUILD_NO_FBX_IMPORTER",
        "ASSIMP_BUILD_NO_ASSBIN_IMPORTER",
        "ASSIMP_BUILD_NO_GLTF_IMPORTER",
        "ASSIMP_BUILD_NO_GLTF2_IMPORTER",
        "ASSIMP_BUILD_NO_C4D_IMPORTER",
        "ASSIMP_BUILD_NO_3MF_IMPORTER",
        "ASSIMP_BUILD_NO_X3D_IMPORTER",
        "ASSIMP_BUILD_NO_MMD_IMPORTER",
        "ASSIMP_BUILD_NO_STEP_IMPORTER",

        "ASSIMP_BUILD_NO_COLLADA_EXPORTER",
        "ASSIMP_BUILD_NO_3DS_EXPORTER",
        //"ASSIMP_BUILD_NO_OBJ_EXPORTER",
        "ASSIMP_BUILD_NO_STL_EXPORTER",
        "ASSIMP_BUILD_NO_PLY_EXPORTER",
        "ASSIMP_BUILD_NO_MS3D_EXPORTER",
        "ASSIMP_BUILD_NO_M3D_EXPORTER",
        "ASSIMP_BUILD_NO_X3D_EXPORTER",
        "ASSIMP_BUILD_NO_GLTF_EXPORTER",
        "ASSIMP_BUILD_NO_GLTF2_EXPORTER",
        "ASSIMP_BUILD_NO_ASSBIN_EXPORTER",
        "ASSIMP_BUILD_NO_ASSXML_EXPORTER",
        "ASSIMP_BUILD_NO_IFC_EXPORTER",
        "ASSIMP_BUILD_NO_XGL_EXPORTER",
        "ASSIMP_BUILD_NO_X_EXPORTER",
        //"ASSIMP_BUILD_NO_FBX_EXPORTER",
        "ASSIMP_BUILD_NO_STEP_EXPORTER",
        "ASSIMP_BUILD_NO_C4D_EXPORTER",
        "ASSIMP_BUILD_NO_3MF_EXPORTER",
        "ASSIMP_BUILD_NO_MMD_EXPORTER",
        "ASSIMP_BUILD_NO_ASSJSON_EXPORTER",
        "ASSIMP_BUILD_NO_PBRT_EXPORTER",
    ];
    var INCLUDES = [
        DIR + "/include",
        DIR + "/code",
        DIR + "/contrib/rapidjson/include",
        DIR + "/contrib/unzip",
        DIR + "/contrib/irrXML",
        DIR + "/contrib/zip/src",
        DIR + "/contrib/zlib",
        DIR + "/contrib/utf8cpp/source",
        DIR + "/contrib",
    ];

    var SOURCES = [];
    for (var i=0; i<FORMATS.length; i++) {
        SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/code/"+FORMATS[i], ".cpp", true, false));
    }
    SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/contrib/unzip", ".c", true, false));
    SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/contrib/pugixml", ".cpp", true, false));
    SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/contrib/zip", ".cpp", true, false));
    SOURCES = SOURCES.concat(Directory.collectFilesWithExt(DIR + "/contrib/zlib", ".c", false, false));

    build_assimp_revision_h(DIR+"/include/assimp", 5, 4, 3);

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