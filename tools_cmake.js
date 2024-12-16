/***************************************************
 *
 * CMAKE TOOLS for jsmake
 *
 * Copyright (C) 2020-2024 Victrix Games
 *
 ***************************************************/

function generateCMakeLists(
    filename,
    projectName,
    isStaticLibrary,
    arrSubdirs,
    arrHeaders,
    arrSources,
    cflags,
    arrDparams
    ) {

    var TEMPLATE_DIR = "./jsmake-scripts/cmake_templates";

    var template_vars = {
        "project_name": projectName,
        "creation_date": Date(),
        "release": TARGET_BUILD === T_TARGET_BUILD.RELEASE,
        "static_library": isStaticLibrary,
        "array_subdirs": arrSubdirs,
        "array_headers": arrHeaders,
        "array_sources": arrSources,
        "cflags": cflags,
        "dparams": arrayToString(arrDparams)
    };

    if (Directory.exists(TEMPLATE_DIR + "/static_library.template")) {
        var template_content = Directory.readTextFile(TEMPLATE_DIR + "/static_library.template");
        var template_result = Template.render(template_content, JSON.stringify(template_vars));
        //Log.info(template_result);
        Directory.writeTextFile(filename,template_result);
    } else {
        Log.error("Cannot find CMakeLists.template");
    }
}

