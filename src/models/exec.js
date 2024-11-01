async function runCode(code) {
    const data = { code: btoa(code) }; // Encode to base64

    const res = await fetch("https://execjs.emilfolino.se/code", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    return atob(result.data);
}

export default runCode;
