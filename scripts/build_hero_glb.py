"""Rebuild portfolio hero sculpture (matches live Blender MCP sculpt).

Usage:
  blender --background --python scripts/build_hero_glb.py
  # or with GUI Blender MCP connected — export from the live scene
"""
import bpy
import math
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "assets" / "models" / "hero-core.glb"

for obj in list(bpy.data.objects):
    if obj.type == "MESH":
        bpy.data.objects.remove(obj, do_unlink=True)


def metal(name, base, emit, strength=0.55, metallic=0.9, rough=0.16):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    n = m.node_tree.nodes.get("Principled BSDF")
    if n:
        n.inputs["Base Color"].default_value = (*base, 1)
        n.inputs["Metallic"].default_value = metallic
        n.inputs["Roughness"].default_value = rough
        if "Emission Color" in n.inputs:
            n.inputs["Emission Color"].default_value = (*emit, 1)
            n.inputs["Emission Strength"].default_value = strength
        if "Coat Weight" in n.inputs:
            n.inputs["Coat Weight"].default_value = 1.0
    return m


bpy.ops.object.empty_add(type="PLAIN_AXES", location=(0, 0, 0))
root = bpy.context.active_object
root.name = "HeroRoot"

bpy.ops.mesh.primitive_torus_add(major_radius=1.05, minor_radius=0.3, major_segments=48, minor_segments=14)
a = bpy.context.active_object
a.name = "CoreRingA"
a.data.materials.append(metal("TealMetal", (0.04, 0.45, 0.42), (0.05, 0.4, 0.35), 0.7))
a.rotation_euler = (math.radians(72), math.radians(18), 0)
a.parent = root

bpy.ops.mesh.primitive_torus_add(major_radius=1.05, minor_radius=0.2, major_segments=42, minor_segments=12)
b = bpy.context.active_object
b.name = "CoreRingB"
b.data.materials.append(metal("CyanMetal", (0.03, 0.28, 0.52), (0.04, 0.3, 0.55), 0.6, 0.85, 0.2))
b.rotation_euler = (math.radians(28), math.radians(-38), math.radians(40))
b.parent = root

bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.5)
gem = bpy.context.active_object
gem.name = "CoreGem"
gem.data.materials.append(metal("GemCore", (0.07, 0.58, 0.62), (0.12, 0.45, 0.55), 0.95, 0.72, 0.1))
gem.parent = root

bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=1.85)
shell = bpy.context.active_object
shell.name = "WireShell"
shell.data.materials.append(metal("WireGlow", (0.25, 0.9, 0.82), (0.15, 0.65, 0.6), 0.45, 0.25, 0.4))
mod = shell.modifiers.new("Wire", "WIREFRAME")
mod.thickness = 0.013
mod.use_replace = True
shell.parent = root
bpy.context.view_layer.objects.active = shell
bpy.ops.object.modifier_apply(modifier="Wire")

for i, (r, t, rot, col, em) in enumerate(
    [
        (2.25, 0.015, (90, 12, 0), (0.12, 0.82, 0.92), (0.1, 0.55, 0.65)),
        (2.7, 0.01, (62, -18, 22), (0.22, 0.7, 0.96), (0.1, 0.4, 0.7)),
        (3.05, 0.008, (105, 8, -15), (0.35, 0.9, 0.85), (0.08, 0.5, 0.45)),
    ]
):
    bpy.ops.mesh.primitive_torus_add(major_radius=r, minor_radius=t, major_segments=56, minor_segments=6)
    ring = bpy.context.active_object
    ring.name = f"Orbit{i}"
    ring.data.materials.append(metal(f"OrbitM{i}", col, em, 0.42, 0.55, 0.25))
    ring.rotation_euler = tuple(math.radians(x) for x in rot)
    ring.parent = root

for i in range(12):
    ang = (i / 12) * math.tau
    rad = 2.45 + (i % 4) * 0.2
    loc = (math.cos(ang) * rad, math.sin(ang) * rad * 0.85, math.sin(ang * 1.7) * 0.95)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=0, radius=0.075, location=loc)
    sh = bpy.context.active_object
    sh.name = f"Shard{i}"
    sh.data.materials.append(metal("ShardMat", (0.2, 0.85, 0.75), (0.08, 0.32, 0.28), 0.4, 0.82, 0.28))
    sh.scale = (1.0, 0.45, 1.5)
    sh.rotation_euler = (ang, ang * 0.4, i * 0.25)
    sh.parent = root

OUT.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action="DESELECT")
root.select_set(True)
for child in root.children_recursive:
    child.select_set(True)
bpy.context.view_layer.objects.active = root

kwargs = dict(
    filepath=str(OUT),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_animations=False,
)
try:
    bpy.ops.export_scene.gltf(
        **kwargs,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
    )
except TypeError:
    bpy.ops.export_scene.gltf(**kwargs)

print(f"Exported {OUT} bytes={OUT.stat().st_size}")
