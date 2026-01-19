"use client";

import { useEditorStore } from "@/store/editorStore";

export default function PropertiesPanel() {
  const selected = useEditorStore((s) => s.selectedObject);
  const update = useEditorStore((s) => s.updateSelectedObject);

  if (!selected) {
    return (
      <aside className="w-64 border-l bg-gray-50 p-4 text-sm text-gray-500">
        No selection
      </aside>
    );
  }

  const width = Math.round(selected.getScaledWidth());
  const height = Math.round(selected.getScaledHeight());

  return (
    <aside className="w-64 border-l bg-white p-4 space-y-4">
      <h3 className="font-semibold">Properties</h3>

      {/* Position */}
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="X"
          value={Math.round(selected.left ?? 0)}
          onChange={(v) => update({ left: v })}
        />
        <Input
          label="Y"
          value={Math.round(selected.top ?? 0)}
          onChange={(v) => update({ top: v })}
        />
      </div>

      {/* Size */}
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="W"
          value={width}
          onChange={(v) =>
            update({ scaleX: v / (selected.width || 1) })
          }
        />
        <Input
          label="H"
          value={height}
          onChange={(v) =>
            update({ scaleY: v / (selected.height || 1) })
          }
        />
      </div>

      {/* Rotation */}
      <Input
        label="Rotation"
        value={Math.round(selected.angle ?? 0)}
        onChange={(v) => update({ angle: v })}
      />

      {/* Opacity */}
      <Input
        label="Opacity"
        value={Math.round((selected.opacity ?? 1) * 100)}
        onChange={(v) => update({ opacity: v / 100 })}
      />

      {/* Fill */}
      {"fill" in selected && (
        <div>
          <label className="text-xs">Fill</label>
          <input
            type="color"
            value={(selected.fill as string) || "#000000"}
            onChange={(e) => update({ fill: e.target.value })}
            className="w-full h-8"
          />
        </div>
      )}
    </aside>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-xs">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border px-2 py-1 text-sm"
      />
    </div>
  );
}
