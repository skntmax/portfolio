"""Lightweight Blender hero sculpture → GLB (~100–150KB target)."""
import bpy
import math
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "assets" / "models" / "hero-core.glb"
bpy.ops.wm.read_factory_settings(use_empty=True)


def mat_metal(name, base, emit, emit_str=0.45, metal=0.88, rough=0.2):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    if not bsdf:
        return m
    bsdf.inputs["Base Color"].default_value = (*base, 1)
    bsdf.inputs["Metallic"].default_value = metal
    bsdf.inputs["Roughness"].default_value = rough
    if "Emission Color" in bsdf.inputs:
        bsdf.inputs["Emission Color"].default_value = (*emit, 1)
        bsdf.inputs["Emission Strength"].default_value = emit_str
    if "Coat Weight" in bsdf.inputs:
        bsdf.inputs["Coat Weight"].default_value = 0.85
    return m


bpy.ops.object.empty_add(type="PLAIN_AXES", location=(0, 0, 0))
root = bpy.context.active_object
root.name = "HeroRoot"

# Core interlocking rings
bpy.ops.mesh.primitive_torus_add(major_radius=1.0, minor_radius=0.28, major_segments=40, minor_segments=12)
a = bpy.context.active_object
a.name = "CoreRingA"
a.data.materials.append(mat_metal("TealMetal", (0.05, 0.42, 0.4), (0.05, 0.32, 0.3), 0.55))
a.rotation_euler = (math.radians(70), math.radians(15), 0)
a.parent = root

bpy.ops.mesh.primitive_torus_add(major_radius=1.0, minor_radius=0.18, major_segments=36, minor_segments=10)
b = bpy.context.active_object
b.name = "CoreRingB"
b.data.materials.append(mat_metal("CyanMetal", (0.04, 0.3, 0.5), (0.03, 0.28, 0.48), 0.5, 0.82, 0.22))
b.rotation_euler = (math.radians(25), math.radians(-40), math.radians(35))
b.parent = root

bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=0.48)
gem = bpy.context.active_object
gem.name = "CoreGem"
gem.data.materials.append(mat_metal("Gem", (0.08, 0.55, 0.6), (0.1, 0.4, 0.5), 0.75, 0.7, 0.14))
gem.parent = root

# Wire shell
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=1.75)
shell = bpy.context.active_object
shell.name = "WireShell"
wm = bpy.data.materials.new("Wire")
wm.use_nodes = True
bsdf = wm.node_tree.nodes.get("Principled BSDF")
if bsdf:
    bsdf.inputs["Base Color"].default_value = (0.3, 0.9, 0.82, 1)
    bsdf.inputs["Emission Color"].default_value = (0.2, 0.7, 0.65, 1)
    bsdf.inputs["Emission Strength"].default_value = 0.35
    bsdf.inputs["Roughness"].default_value = 0.45
shell.data.materials.append(wm)
mod = shell.modifiers.new("Wire", "WIREFRAME")
mod.thickness = 0.014
mod.use_replace = True
shell.parent = root

# Orbit rings
for i, (r, t, rot, col, em) in enumerate([
    (2.2, 0.016, (90, 10, 0), (0.15, 0.8, 0.9), (0.1, 0.55, 0.65)),
    (2.65, 0.01, (62, -18, 20), (0.25, 0.7, 0.95), (0.12, 0.45, 0.7)),
]):
    bpy.ops.mesh.primitive_torus_add(major_radius=r, minor_radius=t, major_segments=48, minor_segments=6)
    ring = bpy.context.active_object
    ring.name = f"Orbit{i}"
    ring.data.materials.append(mat_metal(f"OrbitM{i}", col, em, 0.4, 0.55, 0.28))
    ring.rotation_euler = tuple(math.radians(x) for x in rot)
    ring.parent = root

# Few shards
for i in range(10):
    ang = (i / 10) * math.tau
    rad = 2.4 + (i % 3) * 0.25
    loc = (math.cos(ang) * rad, math.sin(ang) * rad * 0.85, math.sin(ang * 1.6) * 0.85)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=0, radius=0.08, location=loc)
    sh = bpy.context.active_object
    sh.name = f"Shard{i}"
    sh.data.materials.append(mat_metal("Shard", (0.2, 0.82, 0.75), (0.06, 0.28, 0.26), 0.35, 0.8, 0.3))
    sh.scale = (1.0, 0.5, 1.4)
    sh.rotation_euler = (ang, ang * 0.4, i * 0.2)
    sh.parent = root

bpy.context.view_layer.objects.active = shell
bpy.ops.object.modifier_apply(modifier="Wire")

# Decimate rings slightly if needed
for obj in (a, b):
    d = obj.modifiers.new("Dec", "DECIMATE")
    d.ratio = 0.85
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier="Dec")

OUT.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.export_scene.gltf(
    filepath=str(OUT),
    export_format="GLB",
    use_selection=False,
    export_apply=True,
    export_animations=False,
)
print(f"Exported {OUT} bytes={OUT.stat().st_size}")
