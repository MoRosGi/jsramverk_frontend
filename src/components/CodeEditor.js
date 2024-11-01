import React, { useEffect, useState, useRef } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubLight } from '@ddietr/codemirror-themes/github-light';
import runCode from '../models/exec.js';
import { toast } from 'react-toastify';
import styles from './CodeEditor.module.css';

const CodeEditor = ({
        content,
        setContent
    }) => {
    const [codeOutput, setCodeOutput] = useState("");
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getEditor().setValue(content);
        }
    }, [content]);

    const handleRunCode = async () => {
        try {
            const output = await runCode(content);
            setCodeOutput(output);
        } catch (error) {
            toast("Error running code:", error);
            setCodeOutput("Error running code.");
        }
    };

    return (
        <div className={styles.CodeEditorWrapper}>
            <button onClick={handleRunCode}
                className={styles.button}
                type="button"
                >
                    Run Code
                </button>
            <div className={styles.codeEditor}>
                <CodeMirror
                    value={content}
                    extensions={[javascript(), githubLight, EditorView.lineWrapping]}
                    onChange={setContent}
                />
                <div className={styles.outputWrapper}>
                    <pre className={styles.codeOutput}>
                        {codeOutput}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
