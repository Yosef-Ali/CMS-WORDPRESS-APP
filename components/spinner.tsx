import React from "react";

// export default function Spinner() {
//   return (
//     <div
//       class="inline-block h-4 w-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
//       role="status"
//     >
//       <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
//         Loading...
//       </span>
//     </div>
//   );
// }
export default function Spinner() {
  // animation effect while waiting for rendering
  return (
    <span className="flex h-screen w-full items-center justify-center">
      <span className="relative flex h-10 w-10 animate-ping  rounded-full bg-purple-400 opacity-75"></span>
    </span>
  );
}
