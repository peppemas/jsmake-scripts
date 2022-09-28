
var SHADER_DIR = T_TARGET_BUILD + "/shaders";

var DX9_PROFILE_VS = "vs_3_0"
var DX9_PROFILE_FS = "ps_3_0"
var DX9_PROFILE_CS = "cs_3_0"

var DX11_PROFILE_VS = "vs_5_0"
var DX11_PROFILE_FS = "ps_5_0"
var DX11_PROFILE_CS = "cs_5_0"

var GLSL_PROFILE_VS = "120"
var GLSL_PROFILE_FS = "120"
var GLSL_PROFILE_CS = "120"
//var GLSL_PROFILE_VS = "430"
//var GLSL_PROFILE_FS = "430"
//var GLSL_PROFILE_CS = "430"

var SHADERC_VERBOSE = false

function compile_shaders() {

    banner("Compile SHADERS");

    var MODELS = [
        "glsl",
        "dx11",
        //"dx9"
    ];

    var SHADERS = [
        { name:"texture2d", compute:false },
        // { name:"basic", compute:false },
        // { name:"blinnphong", compute:false },
        // { name:"matcap", compute:false },
        // { name:"wireframe", compute:false },
        // //{ name:"nanovg_fill", compute:false },
        // { name:"texture", compute:false },
        // { name:"texture_alpha", compute:false },
        // { name:"nuklear_texture", compute:false },
        // { name:"tonemap", compute:false },
        // { name:"voxel", compute:false },
        // { name:"linear_gradient", compute:false },
        // { name:"atmosphere", compute:false },
        // { name:"skybox", compute:false },
        // { name:"skybox_hdr", compute:false },
        // { name:"skybox_preetham", compute:false },
        // { name:"skybox_ibl", compute:false },
        // { name:"sprite", compute:false },
        // { name:"debug_draw", compute:false },
        // { name:"2d_starfield", compute:false },
        // { name:"gentle_gradient", compute:false },
        // { name:"bloom_spinner", compute:false },
        // { name:"yuv2rgb", compute:false },
        // { name:"spritebatch", compute:false },
        // { name:"light_ambient", compute:false },
        // { name:"light_directional", compute:false },
        // { name:"light_point", compute:false },
        // { name:"light_spot", compute:false },
        // { name:"bump_mapping", compute:false },
        // { name:"renderer_deferred_geo", compute:false },
        // { name:"renderer_deferred_blit", compute:false },
        // { name:"renderer_forward", compute:false },
        // { name:"debug_uniforms", compute:false },
        // { name:"cubemap_irradiance", compute:false },
        // { name:"cubemap_prefilter_hdr", compute:false },
        // { name:"pbr_ibl", compute:false },
        // { name:"multiple_scattering_lut", compute:true },
    ];

    for (var x=0; x<MODELS.length; x++) {
        for (var i=0; i<SHADERS.length; i++) {
            if (compileShader(SHADERS[i].name, MODELS[x], SHADERC_VERBOSE, SHADERS[i].compute) < 0) {
                Log.error("Compilation Stopped due to errors.");
                return -1;
            }
        }
    }

    return 0;
}

function compileShader(name, model, verbose, isCompute) {
    var inVs = "./libs_shader/" + name + "/vs_" + name + ".sc";
    var inFs = "./libs_shader/" + name + "/fs_" + name + ".sc";
    var inCs = "./libs_shader/" + name + "/cs_" + name + ".sc";

    var TARGET_SHADERS_DIR = TARGET_PATH_DIR + "/shaders";
    var platform = "";

    buildDirectory( TARGET_SHADERS_DIR );
    buildDirectory( TARGET_SHADERS_DIR + "/" + name);

    var PROFILE_VS;
    var PROFILE_FS;
    var PROFILE_CS;
    if (model === "glsl") {
        PROFILE_VS = GLSL_PROFILE_VS;
        PROFILE_FS = GLSL_PROFILE_FS;
        PROFILE_CS = GLSL_PROFILE_CS;
        platform = "linux";
    } else if (model === "dx11") {
        PROFILE_VS = DX11_PROFILE_VS;
        PROFILE_FS = DX11_PROFILE_FS;
        PROFILE_CS = DX11_PROFILE_CS;
        platform = "windows";
    } else if (model === "dx9") {
        PROFILE_VS = DX9_PROFILE_VS;
        PROFILE_FS = DX9_PROFILE_FS;
        PROFILE_CS = DX9_PROFILE_CS;
        platform = "windows";
    }

    var outFile;

    if (!isCompute) {
        outFile = TARGET_SHADERS_DIR + "/" + name + "/vs_" + model + ".bin";
        shadercTool(TARGET_SHADERS_DIR, name, inVs, outFile, "vertex", platform, PROFILE_VS, verbose);

        outFile = TARGET_SHADERS_DIR + "/" + name + "/fs_" + model + ".bin";
        shadercTool(TARGET_SHADERS_DIR, name, inFs, outFile, "fragment", platform, PROFILE_FS, verbose);
    } else {
        outFile = TARGET_SHADERS_DIR + "/" + name + "/cs_" + model + ".bin";
        shadercTool(TARGET_SHADERS_DIR, name, inCs, outFile, "compute", platform, PROFILE_CS, verbose);
    }

    return 0;
}

function shadercTool(path, name, inFile, outFile, type, platform, profile, verbose) {

    Log.info("["+name+"]: "+ outFile +" platform:"+platform+" profile:"+profile);

    var cmd = [
        "./tools/shaderc",
        "-f", inFile,
        "-o", outFile,
        "--type", type,
        "--platform", platform,
        "--profile", profile,
        "-i", LIBS_TIER1_PATH + "/bgfx/src/",
        "-i", "./libs_shader/common/",
        "-i", "./libs_shader/" + name + "/"
    ];

    /*
    if (TARGET_BUILD === T_TARGET_BUILD.DEBUG) {
        cmd = cmd.concat(["--debug","-O0","--Werror"]);
    } else {
        cmd = cmd.concat(["-O3"]);
    }
     */
    //cmd = cmd.concat(["--debug","-O0","--Werror"]);
    cmd = cmd.concat(["-O3"]);

    if (verbose) {
        cmd = cmd.concat(["--verbose"]);
    }

    var result = Processor.run(arrayToString(cmd));
    if (result !== 0) return result;
}

function buildDirectory(path) {

    if (!Directory.exists(path)) {
        Directory.make(path);
    }

}
