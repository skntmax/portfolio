import bpy
import math
import os
from mathutils import Vector

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

curve_data = bpy.data.curves.new("RibbonPath", type="CURVE")
curve_data.dimensions = "3D"
curve_data.resolution_u = 64
curve_data.bevel_depth = 0.42
curve_data.bevel_resolution = 8
curve_data.fill_mode = "FULL"
spline = curve_data.splines.new("NURBS")
pts = []
for i in range(28):
    t = i / 27
    x = math.sin(t * math.pi * 2.2) * 3.4 + math.sin(t * 7.5) * 0.55
    y = (t - 0.5) * 5.2 + math.cos(t * 5.0) * 0.65
    z = math.cos(t * math.pi * 2.0) * 2.2 + math.sin(t * 4.2) * 0.5
    pts.append((x, y, z))
spline.points.add(len(pts) - 1)
for p, co in zip(spline.points, pts):
    p.co = (co[0], co[1], co[2], 1.0)
spline.use_endpoint_u = True
spline.order_u = 4

obj = bpy.data.objects.new("StudioSculpture", curve_data)
scene.collection.objects.link(obj)
bpy.context.view_layer.objects.active = obj
obj.select_set(True)

bpy.ops.object.convert(target="MESH")
mesh_obj = bpy.context.view_layer.objects.active
bpy.ops.object.shade_smooth()

# Simple PBR that glTF exports reliably (procedural nodes often bake poorly).
mat = bpy.data.materials.new("MintMarble")
mat.use_nodes = True
nt = mat.node_tree
nodes = nt.nodes
princ = nodes.get("Principled BSDF")
if princ is None:
    princ = nodes.new("ShaderNodeBsdfPrincipled")
princ.inputs["Base Color"].default_value = (0.04, 0.07, 0.08, 1)
princ.inputs["Metallic"].default_value = 0.42
princ.inputs["Roughness"].default_value = 0.28
# Blender 4+/5 Principled has Emission Color + Strength
if "Emission Color" in princ.inputs:
    princ.inputs["Emission Color"].default_value = (0.22, 0.95, 0.82, 1)
    princ.inputs["Emission Strength"].default_value = 1.35
elif "Emission" in princ.inputs:
    princ.inputs["Emission"].default_value = (0.22, 0.95, 0.82, 1)
mesh_obj.data.materials.append(mat)

bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
mesh_obj.location = (0, 0, 0)
mesh_obj.rotation_euler = (math.radians(90), 0, math.radians(25))
bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)

bbox = [mesh_obj.matrix_world @ Vector(c) for c in mesh_obj.bound_box]
dims = Vector(max(v[i] for v in bbox) - min(v[i] for v in bbox) for i in range(3))
scale = 5.5 / max(dims)
mesh_obj.scale = (scale, scale, scale)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
center = sum((mesh_obj.matrix_world @ Vector(c) for c in mesh_obj.bound_box), Vector()) / 8
mesh_obj.location -= center
bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)

out_path = os.path.join(
    os.path.dirname(__file__), "..", "public", "models", "studio-ribbon.glb"
)
out_path = os.path.abspath(out_path)
bpy.ops.export_scene.gltf(
    filepath=out_path,
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_draco_mesh_compression_enable=False,
    export_yup=True,
)
print("EXPORTED", out_path, "verts", len(mesh_obj.data.vertices), "bytes", os.path.getsize(out_path))
