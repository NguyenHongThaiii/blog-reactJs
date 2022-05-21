import React, { useEffect, useRef, useState } from "react";

function useMenuDrawer({ type = "button" }) {
  const [state, setState] = useState();
  const nodeRef = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      setState((prev) => !prev);
    };
    const dom = nodeRef.current;

    if (nodeRef && dom && dom.tagName === type) {
      nodeRef.current.addEventListener("click", handleClick);
    }

    return () => dom.removeEventListener("click", handleClick);
  }, []);
  return { state, nodeRef };
}

export default useMenuDrawer;
