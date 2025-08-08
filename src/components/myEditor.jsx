import React, { useRef, useState, useEffect } from 'react';

export default function SimpleEditor({  handleGetContent }) {
  const editorRef = useRef(null);
  const youtubeUrlRef = useRef(null);
  //   const dataId=document.getElementById('data');
  const [data, setData] = useState("Start writing your article here...");
  const [link, setLink] = useState("");
  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
    list: false,

  });
  const [hasFocused, setHasFocused] = useState(false); // track first focus

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = data;
    }
    if (youtubeUrlRef.current) {
      youtubeUrlRef.current.innerHTML = link;
    }
  }, []);

  const formatText = (command) => {
    document.execCommand(command, false, null);
    updateActiveStates();
  };

  const insertImagePlaceholder = (n) => {
    const placeholder = `[image-${n}]`;
    document.execCommand("insertText", false, placeholder);
  };

  const handleInput = () => {
    setData(editorRef.current.innerHTML);
    
   
    
  };

  const handleSave = () => {
    console.log("Saved HTML:", data);
    const imagePattern = /\[image-(\d+)\]/g;
    const parsedData = data.split(imagePattern);
    // console.log(parsedData)

    

    //passing the editor content to parent component

    handleGetContent(parsedData);
  };

  const updateActiveStates = () => {
    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      list: document.queryCommandState("insertUnorderedList"),
    });
  };

  const handleFirstFocus = () => {
    if (!hasFocused) {
      editorRef.current.innerHTML = "";       // Clear initial content
      setData("");                            // Clear state
      setHasFocused(true);                    // Prevent it from running again
    }
  };
  const handleYoutubeUrl = () => {
    setLink(youtubeUrlRef.current.innerHTML)
  }
  //   const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault(); // stop default paragraph behavior
  //     if(active.list){
  //         document.execCommand('insertHTML',false,'<li></li>')
  //     }
  //     else{

  //         document.execCommand('insertHTML', false, '<br><br>');
  //     }
  //   }
  // };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      let node = range.startContainer;

      // Walk up the tree to check if inside a <li>
      while (node && node !== editorRef.current) {
        if (node.nodeName === "LI") {
          return; // let browser handle Enter inside <li>
        }
        node = node.parentNode;
      }

      // If not in a list item, override Enter behavior
      e.preventDefault();

      const br1 = document.createElement("br");
      const br2 = document.createElement("br");
      range.deleteContents();
      range.insertNode(br2);
      range.insertNode(br1);

      // Move cursor after <br><br>
      range.setStartAfter(br2);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const extractYouTubeID = (url) => {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };


  const insertYouTubeVideo = () => {
    const url = prompt("Enter YouTube video URL:");
    const videoId = extractYouTubeID(url);

    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }

    const html = `
    <div style="position:relative;padding-bottom:56.25%;height:0;margin:1em 0;">
      <iframe
        style="position:absolute;top:0;left:0;width:100%;height:100%;"
        src="https://www.youtube.com/embed/${videoId}"
        title="YouTube video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  `;

    //   document.execCommand("insertHTML", false, html);
    if (editorRef.current) {
      editorRef.current.focus(); // Important: set cursor inside editor
      document.execCommand("insertHTML", false, html); // Insert HTML
    }
  };




  return (
    <div className="form-group p-6 max-w-3xl mx-auto">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type='button'
          onClick={() => formatText("bold")}
          className={`px-3 py-1 rounded ${active.bold
              ? "bg-black text-white"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
        >
          Bold
        </button>
        <button
          type='button'
          onClick={() => formatText("italic")}
          className={`px-3 py-1 rounded ${active.italic
              ? "bg-black text-white"
              : "bg-green-100 text-green-800 hover:bg-green-200"
            }`}
        >
          Italic
        </button>
        <button
          type='button'
          onClick={() => formatText("underline")}
          className={`px-3 py-1 rounded ${active.underline
              ? "bg-black text-white"
              : "bg-purple-100 text-purple-800 hover:bg-purple-200"
            }`}
        >
          Underline
        </button>

        <button
          type='button'
          onClick={() => formatText("insertUnorderedList")}
          className={`px-3 py-1 rounded ${active.list
              ? "bg-black text-white"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            }`}
        >
          • Bullet List
        </button>


        <button
          type='button'
          onClick={() => insertImagePlaceholder(1)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Insert [image-1]
        </button>
        <button
          type='button'
          onClick={() => insertImagePlaceholder(2)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Insert [image-2]
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={handleFirstFocus}
        onMouseUp={updateActiveStates}
        onKeyUp={updateActiveStates}
        className="border border-gray-300 min-h-[250px] p-4 rounded bg-white shadow-sm focus:outline-none"
        style={{ whiteSpace: 'pre-wrap' }}
        onKeyDown={handleKeyDown}
      />

      <button
        type='button'
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Insert content
      </button>
      <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50">
        <h3 className="font-bold mb-2">Live Preview:</h3>
        <div id='live-preview'>
          <div
            className="pl-5"
            dangerouslySetInnerHTML={{ __html: data }}
          />
        </div>
      </div>
      {/* youtube video insertions field */}
      <div>

        <button
          onClick={insertYouTubeVideo}
          className="px-2 py-1 bg-red-300"
        >
          Insert YouTube Video
        </button>



      </div>







    </div>
  );
}
