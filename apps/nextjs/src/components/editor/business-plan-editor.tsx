"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { useBusinessPlanStore } from "~/stores/business-plan-store";

interface BusinessPlanEditorProps {
    sectionId: string;
    initialContent?: any;
}

export function BusinessPlanEditor({ sectionId, initialContent }: BusinessPlanEditorProps) {
    const { updateSection, getSectionContent } = useBusinessPlanStore();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Start writing your business plan here...",
            }),
        ],
        content: initialContent || getSectionContent(sectionId) || "",
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 border rounded-md bg-white dark:bg-black dark:text-gray-100",
            },
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            updateSection(sectionId, json);
        },
        immediatelyRender: false,
    });

    // Sync external content changes (if any)
    useEffect(() => {
        if (editor && initialContent) {
            // Optional: Only set if different to avoid cursor jumps
            // editor.commands.setContent(initialContent);
        }
    }, [initialContent, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`p-2 rounded ${editor.isActive("italic") ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                >
                    List
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
