"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, LogOut, ListTodo, X, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TodosPage() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [dragOver, setDragOver] = useState(false);



  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setForm({ ...form, image: "" });
  }

  function resetForm() {
    setForm({ title: "", description: "", image: "" });
    setEditingId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editingId) {
      setCards(
        cards.map((c) =>
          c.id === editingId
            ? {
                ...c,
                title: form.title,
                description: form.description,
                image: form.image,
              }
            : c,
        ),
      );
    } else {
      setCards([
        {
          id: Date.now(),
          title: form.title,
          description: form.description,
          image: form.image,
        },
        ...cards,
      ]);
    }

    resetForm();
  }

  function editCard(card) {
    setForm({
      title: card.title,
      description: card.description,
      image: card.image,
    });
    setEditingId(card.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removeCard(id) {
    setCards(cards.filter((c) => c.id !== id));
    if (editingId === id) resetForm();
  }

  function cancelEdit() {
    resetForm();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ListTodo size={20} className="text-slate-900" />
            <span className="font-semibold text-slate-900 tracking-tight">
              TaskFlow
            </span>
          </div>
          <button
            onClick={() => router.push("/signup")}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-10 pb-24">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            My Tasks
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {cards.length} task{cards.length !== 1 ? "s" : ""} created
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-10"
        >
          {/* Editing banner */}
          {editingId && (
            <div className="flex items-center justify-between mb-6 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm font-medium text-amber-700">
                Editing task — update or cancel below
              </p>
              <button
                type="button"
                onClick={cancelEdit}
                className="text-amber-600 hover:text-amber-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Title */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-150"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Add some details…"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-150 resize-none"
            />
          </div>

          {/* Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Image
            </label>

            {form.image ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 h-48">
                <Image
                  src={form.image}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-lg flex items-center justify-center transition-colors z-10"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed transition-all duration-150 cursor-pointer ${
                  dragOver
                    ? "border-slate-900 bg-slate-50"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors ${dragOver ? "bg-slate-200" : "bg-slate-100"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <p className="text-sm text-slate-500">
                  <span className="font-medium text-slate-700">
                    Click to upload
                  </span>{" "}
                  or drag & drop
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-medium text-sm py-3.5 px-6 rounded-xl transition-all duration-150"
            >
              {editingId ? (
                <>
                  <Pencil size={16} />
                  Update Task
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add Task
                </>
              )}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-600 font-medium text-sm py-3.5 px-6 rounded-xl border border-slate-200 transition-all duration-150"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Cards Grid */}
        {cards.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ListTodo size={24} className="text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm">
              No tasks yet. Create one above!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-4 lg:grid-cols-6 gap-5">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`group bg-white rounded-2xl border overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 ${
                  editingId === card.id
                    ? "border-amber-300 ring-2 ring-amber-100"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Image */}
                {card.image && (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 text-base leading-snug mb-1.5 line-clamp-2">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {card.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => editCard(card)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>
                    <button
                      onClick={() => removeCard(card.id)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
