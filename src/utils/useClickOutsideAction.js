import React, {useEffect} from 'react'
/**
 * Hook that toggles a function on clicks outside of the passed ref
 */
export default function useClickOutsideAction(ref, action) {
    useEffect(() => {
        /**
         * Toggle hide function if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                return action()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
