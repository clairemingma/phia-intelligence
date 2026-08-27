"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";

/** Vertical travel that turns a press into a drag. Small enough to feel
 *  immediate, large enough that a click is never mistaken for one. */
const DRAG_START_PX = 5;

/**
 * Drag-to-reorder for a list of rows.
 *
 * Built on pointer events rather than HTML5 drag-and-drop, which never fires on
 * touch — these forms stack onto phones, so a drag that only worked with a
 * mouse would leave no way to reorder there at all.
 */
export function useReorder<T extends { key: string }>({
  items,
  onMove,
}: {
  items: T[];
  /** Take the row at `from` out and put it back at `to`. */
  onMove: (from: number, to: number) => void;
}) {
  const rows = useRef(new Map<string, HTMLElement>());
  /** A press that has not yet travelled far enough to count as a drag. */
  const pending = useRef<{
    key: string;
    x: number;
    y: number;
    pointerId: number;
    el: HTMLElement;
  } | null>(null);
  const [dragKey, setDragKey] = useState<string | null>(null);
  /** The gap the row would drop into: 0 is above the first row, `length` is
   *  below the last. Slots, not row indices — there is one more of them. */
  const [slot, setSlot] = useState<number | null>(null);

  /** Hands each row a ref so the pointer can be matched against its box. */
  const register = useCallback(
    (key: string) => (el: HTMLElement | null) => {
      if (el) rows.current.set(key, el);
      else rows.current.delete(key);
    },
    [],
  );

  /** Which gap the pointer sits in, by comparing it against row midpoints. */
  const slotAt = (y: number) => {
    for (let i = 0; i < items.length; i++) {
      const el = rows.current.get(items[i].key);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (y < r.top + r.height / 2) return i;
    }
    // Past the last midpoint, so it belongs at the end.
    return items.length;
  };

  /** A row dropped just above or just below itself has not moved. */
  const isNoop = (from: number, to: number) => to === from || to === from + 1;

  const finish = (key: string) => {
    const from = items.findIndex((i) => i.key === key);
    if (dragKey === key && slot !== null && from !== -1 && !isNoop(from, slot)) {
      // Lifting the row out shifts everything after it up one, so a slot below
      // the row's old place has to come back by one to land where the line was.
      onMove(from, slot > from ? slot - 1 : slot);
    }
    setDragKey(null);
    setSlot(null);
  };

  /**
   * Spread onto the whole row, so it can be dragged from anywhere on the cell
   * rather than only by its handle.
   *
   * A press has to travel a few pixels before it counts as a drag, so a plain
   * click still reaches whatever is under it — including a text field, which
   * focuses and types as normal.
   *
   * Rows only ever move vertically, so vertical travel alone starts the drag —
   * a few pixels up or down, however much the hand wanders sideways on the way.
   * A gesture that stays level never becomes a drag, which is what leaves text
   * selection inside a field intact. Buttons and the dropdown keep their own
   * clicks outright.
   */
  const rowDragProps = (key: string) => ({
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      const el = e.target as HTMLElement;
      if (el.closest("button, a, ul, [role='listbox']")) return;
      pending.current = {
        key,
        x: e.clientX,
        y: e.clientY,
        pointerId: e.pointerId,
        el: e.currentTarget,
      };
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const held = pending.current;
      if (held && dragKey === null) {
        // Judged on vertical travel only, and never given up on — a sideways
        // wobble early in the gesture must not cancel the drag outright.
        if (Math.abs(e.clientY - held.y) < DRAG_START_PX) return;
        held.el.setPointerCapture(held.pointerId);
        // A press on the cell's chrome may have begun a selection; drop it.
        window.getSelection()?.removeAllRanges();
        setDragKey(held.key);
        setSlot(items.findIndex((i) => i.key === held.key));
        return;
      }
      if (dragKey === key) setSlot(slotAt(e.clientY));
    },
    onPointerUp: () => {
      pending.current = null;
      finish(key);
    },
    onPointerCancel: () => {
      pending.current = null;
      setDragKey(null);
      setSlot(null);
    },
  });

  /** Spread onto the row's grip, which drags without waiting for travel. */
  const gripProps = (key: string) => ({
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      // Stops the press turning into a text selection or a page scroll.
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragKey(key);
      setSlot(items.findIndex((i) => i.key === key));
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (dragKey !== key) return;
      setSlot(slotAt(e.clientY));
    },
    onPointerUp: () => finish(key),
    onPointerCancel: () => {
      setDragKey(null);
      setSlot(null);
    },
    // Dragging is not reachable by keyboard, so the grip also takes the arrows.
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      const from = items.findIndex((i) => i.key === key);
      const to = from + (e.key === "ArrowUp" ? -1 : 1);
      if (from !== -1 && to >= 0 && to < items.length) onMove(from, to);
    },
  });

  /**
   * Spread onto each row. Carries the ref the pointer is measured against, and
   * marks the edge the carried row would settle on — a single-pixel rule in the
   * form's own separator tone, enough to place the row and no more.
   */
  const rowProps = (key: string, index: number) => {
    const from = items.findIndex((i) => i.key === dragKey);
    const live = dragKey !== null && slot !== null && !isNoop(from, slot);
    // The gap above this row, or below it where the gap is the very last one.
    const edge = !live
      ? null
      : slot === index
        ? "top"
        : slot === items.length && index === items.length - 1
          ? "bottom"
          : null;
    return {
      ref: register(key),
      className: [
        "relative w-full",
        dragKey !== null ? "select-none" : "",
        dragKey === key ? "opacity-40" : "",
        edge
          ? "before:absolute before:inset-x-0 before:h-px before:bg-[#e3e3e3]"
          : "",
        edge === "top" ? "before:-top-[8px]" : "",
        edge === "bottom" ? "before:-bottom-[8px]" : "",
      ]
        .filter(Boolean)
        .join(" "),
    };
  };

  return { register, gripProps, rowDragProps, rowProps, dragKey };
}
