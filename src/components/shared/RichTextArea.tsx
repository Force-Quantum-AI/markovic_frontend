"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
// import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";

import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextArea({
  label,
  placeholder = "Write here...",
  value,
  onChange,
}: Props) {

  const editor = useEditor({

    extensions: [

      StarterKit,

      Underline,

    //   TextStyle,

      Color,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

    ],

    content: value,

    editorProps: {

      attributes: {

        class:
          "min-h-[180px] p-4 outline-none text-sm",

      },

    },

    onUpdate: ({ editor }) => {

      onChange(editor.getHTML());

    },

    immediatelyRender: false,
  });

  if (!editor) return null;

  return (

    <div className="space-y-2">

      {label && (

        <label className="text-sm font-medium">

          {label}

        </label>

      )}

      <div className="border rounded-2xl overflow-hidden bg-white">

        {/* Toolbar */}

        <div className="flex flex-wrap gap-2 items-center px-4 py-3 border-b bg-gray-50">

          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2 size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo2 size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300" />

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleBold().run()
            }
            className={editor.isActive("bold") ? "text-blue-600" : ""}
          >
            <Bold size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleItalic().run()
            }
            className={editor.isActive("italic") ? "text-blue-600" : ""}
          >
            <Italic size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleUnderline().run()
            }
            className={editor.isActive("underline") ? "text-blue-600" : ""}
          >
            <UnderlineIcon size={18} />
          </button>

          <input
            type="color"
            onChange={(e) =>

              editor
                .chain()
                .focus()
                .setColor(e.target.value)
                .run()
            }
            className="w-8 h-8 p-0 border-none"
          />

          <div className="w-px h-6 bg-gray-300" />

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleBulletList().run()
            }
          >
            <List size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
          >
            <ListOrdered size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300" />

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().setTextAlign("left").run()
            }
          >
            <AlignLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().setTextAlign("center").run()
            }
          >
            <AlignCenter size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().setTextAlign("right").run()
            }
          >
            <AlignRight size={18} />
          </button>

        </div>

        {/* Editor */}

        <EditorContent editor={editor} />

      </div>

    </div>

  );
}