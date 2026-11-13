import * as THREE from "three";

/** Recursively dispose geometries/materials/textures under an object. */
export function disposeObject(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material;
    if (Array.isArray(mat)) mat.forEach(disposeMaterial);
    else if (mat) disposeMaterial(mat);
  });
}

function disposeMaterial(mat: THREE.Material): void {
  for (const key of Object.keys(mat)) {
    const value = (mat as unknown as Record<string, unknown>)[key];
    if (value && value instanceof THREE.Texture) value.dispose();
  }
  mat.dispose();
}
